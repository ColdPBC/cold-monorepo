import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { CacheService } from '../../../cache';
import { MqttAPIComplianceSectionPayload, MqttService } from '../../../mqtt';
import { filter, get } from 'lodash';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisCache } from 'cache-manager-redis-yet';
import { ConfigService } from '@nestjs/config';
import { compliance_questions, compliance_sections, organizations } from '@prisma/client';

export type cacheItem = { section: string; questions: string[] };

type Section = {
  id: string;
  key: string;
  title: string;
  metadata: any;
  order: number;
  compliance_section_group_id: string;
  compliance_definition_name: string;
  compliance_section_dependency_chains: { dependency_chain: Dependency[] } | null;
  _count: {
    compliance_questions: number;
  };
};

interface Dependency {
  dependency_expression: string | null;
  dependent_question_id: string;
  dependent_section_key: string;
  dependent_question_key: string;
  dependent_definition_name: string;
  dependent_question_values: any[] | null;
  dependent_section_group_id: string;
}

/**
 * ComplianceSectionsRepository class is responsible for managing the compliance sections data.
 *
 * @class ComplianceSectionsRepository
 * @extends BaseWorker
 */
@Injectable()
export class ComplianceSectionsRepository extends CacheService implements OnModuleInit {
  constructor(
    @Inject(CACHE_MANAGER) override readonly cacheManager: RedisCache,
    override readonly config: ConfigService,
    readonly prisma: PrismaService,
    readonly mqtt: MqttService,
  ) {
    super(cacheManager, config);
  }

  override async onModuleInit(): Promise<void> {
    await super.onModuleInit();
    await super.init();
  }

  /**
   * Get the list of sections for a compliance section group.
   *
   * @param {Object} payload - The payload object.
   * @param {string} payload.compliance_section_group_id - The ID of the compliance section group.
   * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of section objects.
   */
  async getSectionList({ compliance_section_group_id }: MqttAPIComplianceSectionPayload) {
    const sections = (await this.prisma.compliance_sections.findMany({
      where: {
        compliance_section_group_id: compliance_section_group_id,
      },
      select: {
        id: true,
        key: true,
        title: true,
        metadata: true,
        order: true,
        compliance_section_group_id: true,
        compliance_definition_name: true,
        compliance_section_dependency_chains: true,
        _count: {
          select: {
            compliance_questions: true,
          },
        },
      },
    })) as unknown as Section[];

    const filtered = await this.filterSections(sections);
    return filtered;
  }

  /**
   * Filter questions based on their dependencies.
   *
   * @param {Section[]} sections - An array of questions to filter.
   * @return {Promise<Question[]>} The filtered array of questions.
   */
  async filterSections(sections: Section[]) {
    const [response] = await Promise.all([
      filter(sections, (section: Section) => {
        const dependencies = get(section, 'compliance_section_dependency_chains.dependency_chain', []) as Dependency[];
        if (dependencies.length < 1) {
          return true;
        }

        for (const dependency of dependencies) {
          const dependentQuestion = this.prisma.organization_compliance_responses.findUnique({
            where: {
              id: dependency.dependent_question_id,
            },
            select: {
              value: true,
            },
          }) as any;
          if (!dependentQuestion) {
            return false;
          }

          const dependentAnswer = dependentQuestion.value;
          return !!(dependency.dependent_question_values && dependency.dependent_question_values.includes(dependentAnswer));
        }

        return true;
      }),
    ]);

    return response;
  }

  /**
   * Get the organization ID from the organization or job.
   * @param organization
   * @param job
   * @private
   */
  private getOrgId(organization?: organizations, job?: any) {
    if (!organization?.id && !job.organization?.id) throw new Error('Organization or job.organization are required');

    return job.data.organization ? job.data.organization.id : organization?.id;
  }

  /**
   * Get the compliance definition name from a section or job.
   * @param section
   * @param job
   * @private
   */
  private getComplianceName(section?: compliance_sections, job?: any) {
    if (!section?.compliance_definition_name && !job?.data?.payload?.compliance?.compliance_definition_name)
      throw new Error('compliance_definition_name or job.data.payload.compliance.compliance_definition_name are required');
    return section?.compliance_definition_name || job.data.payload.compliance.compliance_definition_name;
  }

  /**
   * Get the base key for a compliance section.
   * @param section
   * @param organization
   * @param job
   * @private
   */
  private getBaseKey(section?: compliance_sections, organization?: organizations, job?: any) {
    const orgId = this.getOrgId(organization, job);
    const complianceName = this.getComplianceName(section, job);

    return `compliance_processing_status:${orgId}:${complianceName}`;
  }

  /**
   * Get the sections and questions actively being processed for an org and compliance definition.
   * @param section
   * @param organization
   * @param job
   */
  async getCachedActiveSections(section: compliance_sections, organization?: organizations, job?: any) {
    const baseKey = this.getBaseKey(section, organization, job);
    const sectionKeys = await this.getKeys(`${baseKey}:*`);

    const data: Array<cacheItem> = [];

    for (const sectionKey of sectionKeys) {
      const sect = sectionKey.replace(`${baseKey}:`, '').split(':');
      const cacheItem: cacheItem = {
        section: sect[0],
        questions: [sect[1]],
      };

      data.push(cacheItem);
    }

    this.mqtt.replyTo(`ui/${process.env['NODE_ENV']}/${this.getOrgId(organization, job)}/${section}/currentAiStatus`, data);
  }

  /**
   * Get all keys matching a pattern.
   * @param pattern
   */
  async getKeys(pattern: string): Promise<string[]> {
    return this.cacheManager.store.keys(pattern);
  }

  /**
   * Cache a question as actively being processed.
   * @param question
   * @param section
   * @param organization
   * @param job
   */
  async setCachedActiveQuestion(question: compliance_questions, section: compliance_sections, organization?: organizations, job?: any) {
    await this.set(`${this.getBaseKey(section, organization, job)}:${section.key}:${question.key}`, '', { ttl: 1000 * 60 * 5 });

    await this.getCachedActiveSections(section, organization, job);
  }

  /**
   * Delete a section that is no longer being processed from the cache.
   * @param section
   * @param organization
   * @param job
   */
  async deleteCachedActiveSection(section: compliance_sections, organization: any, job: any) {
    await this.delete(`${this.getBaseKey(section, organization, job)}:${section.key}`);

    await this.getCachedActiveSections(section, organization, job);
  }

  /**
   * Delete a question that is no longer being processed from the cache.
   * @param question
   * @param section
   * @param organization
   * @param job
   */
  async deleteCachedActiveQuestion(question: compliance_questions, section: compliance_sections, organization: any, job: any) {
    await this.delete(`${this.getBaseKey(section, organization, job)}:${section.key}:${question.key}`);

    await this.getCachedActiveSections(section, organization, job);
  }

  /**
   * Clear all sections from the cache.
   * @param organization
   * @param job
   */
  async clearCachedActiveSections(organization: any, job: any) {
    const orgId = this.getOrgId(organization, job);

    await this.delete(`compliance_processing_status:${orgId}:${job.data.payload.compliance.compliance_definition_name}`);

    this.mqtt.replyTo(`ui/${process.env['NODE_ENV']}/${orgId}/${job.data.payload.compliance.compliance_definition_name}/currentAiStatus`, []);
  }
}
