import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { CacheService } from '../../../cache';
import { compliance_definitions } from '@prisma/client';
import { set } from 'lodash';
import { ComplianceResponsesRepository } from '../compliance-responses';
import { DarklyService } from '../../../darkly';

@Injectable()
export class ComplianceDefinitionsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly cache: CacheService, readonly responses: ComplianceResponsesRepository, readonly darkly: DarklyService) {
    super(ComplianceDefinitionsRepository.name);
  }

  async getComplianceDefinitions() {
    const definitions = (await this.prisma.extended.compliance_definitions.findMany({
      orderBy: {
        order: 'asc',
      },
      select: {
        id: true,
        name: true,
        logo_url: true,
        title: true,
        visible: true,
        image_url: true,
        metadata: true,
        order: true,
        version: true,
      },
    })) as compliance_definitions[];

    return definitions;
  }

  async getComplianceDefinitionsByOrgId(req: any) {
    const definitions = (await this.prisma.extended.compliance_definitions.findMany({
      orderBy: {
        order: 'asc',
      },
      select: {
        id: true,
        name: true,
        logo_url: true,
        title: true,
        visible: true,
        image_url: true,
        metadata: true,
        order: true,
        version: true,
      },
    })) as compliance_definitions[];

    if (Array.isArray(definitions) && definitions.length > 0) {
      for (const def of definitions) {
        let metrics;
        if (await this.darkly.getBooleanFlag('dynamic-disable-compliance-count-cache', false, { kind: 'organization', key: req.organization.id, name: req.organization.name })) {
          metrics = (await this.cache.get(`organization:${req.organization.id}:compliance:${def.name}:counts`)) as { counts: { progress: number } };
        }

        if (metrics) {
          set(def, 'progress', metrics.counts.progress);
        } else {
          let raw;
          try {
            raw = await this.responses.getScoredComplianceQuestionsByName(req.organization, def.name, req.user);
          } catch (e) {
            if (!(e instanceof NotFoundException)) {
              this.logger.error(e);
            }

            continue;
          }
          // show hidden definitions if their org_compliance is visible
          if (!def.visible && raw.visible == true) {
            def.visible = true;
          }

          if (raw.counts) {
            set(def, 'progress', raw.counts.progress);
          }
        }
      }
    } else {
      throw new NotFoundException('No compliance definitions found');
    }

    return definitions.filter(def => def.visible);
  }

  async getComplianceSectionsByComplianceName(name: string) {
    return this.prisma.extended.compliance_definitions.findUnique({
      where: {
        name,
      },
      include: {
        compliance_section_groups: {
          include: {
            compliance_sections: true,
          },
        },
      },
    });
  }

  async deleteComplianceDefinition(name: string, orgId: string) {
    return this.prisma.extended.compliance_definitions.delete({
      where: { name },
    });
  }
}
