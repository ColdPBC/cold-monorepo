import { ConflictException, Injectable, NotFoundException, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { MqttService } from '../../../mqtt';
import { BaseWorker } from '../../../worker';
import { IAuthenticatedUser } from '../../../primitives';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { ComplianceSectionsExtendedDto } from './dto';
import compliance_sectionsSchema from '../../../../validation/generated/modelSchema/compliance_sectionsSchema';
import { FilteringService } from '../../filtering';
import { dependency_chain_data } from '../compliance-questions';
import { get } from 'lodash';

/**
 * ComplianceSectionsRepository class is responsible for managing the compliance sections data.
 *
 * @class ComplianceSectionsRepository
 * @extends BaseWorker
 */
@Injectable()
export class ComplianceSectionsRepository extends BaseWorker implements OnModuleInit {
  constructor(private readonly prisma: PrismaService, readonly mqtt: MqttService, readonly filterService: FilteringService) {
    super(ComplianceSectionsRepository.name);
  }

  /**
   * Retrieves a compliance section based on the provided compliance definition name and section key.
   *
   * @param groupId
   * @param {string} compliance_definition_name - The name of the compliance definition used to filter the sections.
   *
   * @param key
   * @param user
   * @param filter
   * @param questions
   * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of compliance section objects.
   */
  async getSectionByComplianceAndKey(
    compliance_definition_name: string,
    groupId: string,
    key: string,
    user: IAuthenticatedUser,
    filter?: boolean,
    questions?: boolean,
  ): Promise<ComplianceSectionsExtendedDto> {
    try {
      const section = (await this.prisma.compliance_sections.findUnique({
        where: {
          compliance_section_group_id: groupId,
          compDefNameSectionKey: {
            compliance_definition_name: compliance_definition_name,
            key: key,
          },
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
          compliance_questions: questions
            ? {
                select: {
                  id: true,
                  key: true,
                  order: true,
                  prompt: true,
                  component: true,
                  tooltip: true,
                  placeholder: true,
                  rubric: true,
                  options: true,
                  question_summary: true,
                  coresponding_question: true,
                  compliance_question_dependency_chain: true,
                },
              }
            : false,
          _count: {
            select: {
              compliance_questions: true,
            },
          },
        },
      })) as ComplianceSectionsExtendedDto;

      if (filter) {
        const filtered = await this.filterService.filterSections([section]);
        this.logger.log(`filtered sections for ${compliance_definition_name}`, { compliance_definition_name, section: filtered[0], filter, questions, user });
        return filtered[0];
      }

      this.logger.log(`retrieved sections for ${compliance_definition_name}`, { compliance_definition_name, section, filter, questions, user });

      return section;
    } catch (error) {
      this.logger.error(`Error retrieving section for ${compliance_definition_name}`, { compliance_definition_name, error, user });
      throw error;
    }
  }

  async getSectionByComplianceAndId(
    compliance_definition_name: string,
    groupId: string,
    id: string,
    user: IAuthenticatedUser,
    filter?: boolean,
    questions?: boolean,
  ): Promise<ComplianceSectionsExtendedDto> {
    try {
      const section = (await this.prisma.compliance_sections.findUnique({
        where: {
          compliance_section_group_id: groupId,
          compliance_definition_name: compliance_definition_name,
          id: id,
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
          compliance_questions: questions
            ? {
                select: {
                  id: true,
                  key: true,
                  order: true,
                  prompt: true,
                  component: true,
                  tooltip: true,
                  placeholder: true,
                  rubric: true,
                  options: true,
                  question_summary: true,
                  coresponding_question: true,
                  compliance_question_dependency_chain: true,
                },
              }
            : false,
          _count: {
            select: {
              compliance_questions: true,
            },
          },
        },
      })) as ComplianceSectionsExtendedDto;

      if (filter) {
        const filtered = await this.filterService.filterSections([section]);
        return filtered[0];
      }

      this.logger.log(`retrieved sections for ${compliance_definition_name}`, {
        compliance_definition_name,
        compliance_section_group_id: groupId,
        section,
        filter,
        questions,
        user,
      });

      return section;
    } catch (error) {
      this.logger.error(`Error retrieving section for ${compliance_definition_name}`, { compliance_definition_name, error, user });
      throw error;
    }
  }

  /**
   * Retrieves a list of compliance sections based on the provided compliance definition name.
   *
   *
   * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of compliance section objects.
   * @param name
   * @param user
   * @param filter
   * @param questions
   */
  async getSectionListByCompliance(name: string, user: IAuthenticatedUser, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    try {
      const sections = this.getSectionList({ compliance_definition_name: name }, user, filter, questions);
      this.logger.info(`retrieved sections for ${name}`, { name, sections, filter, questions, user });
      return sections;
    } catch (error) {
      this.logger.error(`Error retrieving sections for ${name}`, { name, error });
      throw error;
    }
  }

  /**
   * Retrieves an unfiltered list of sections based on the provided compliance_section_group_id.
   *
   * @param compliance_definition_name
   * @param compliance_section_group_id - The ID of the compliance section group.
   * @param user
   * @param filter
   * @param questions
   * @returns Promise{Array} - An array of section objects that match the provided compliance_section_group_id.
   */
  async getSectionListByGroup({ compliance_definition_name, compliance_section_group_id }, user: IAuthenticatedUser, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    try {
      const sections = this.getSectionList({ compliance_definition_name, compliance_section_group_id }, user, filter, questions);
      this.logger.info(`retrieved sections for ${compliance_section_group_id}`, { compliance_section_group_id, sections });
      return sections;
    } catch (error) {
      this.logger.error(`Error retrieving sections for ${compliance_section_group_id}`, { compliance_section_group_id, error });
      throw error;
    }
  }

  async getSectionListByComplianceAndGroup(name: string, groupId: string, user: IAuthenticatedUser, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    try {
      const sections = await this.getSectionList({ compliance_definition_name: name, compliance_section_group_id: groupId }, user, filter, questions);
      this.logger.info(`retrieved sections for ${name}`, { user, compliance_definition_name: name, sections });
      return sections;
    } catch (error) {
      this.logger.error(`Error retrieving sections for ${name}`, { name, error });
      throw error;
    }
  }

  /**
   * Retrieves a list of sections based on the provided compliance_section_group_id.
   *
   * @param compliance_section_group_id - The ID of the compliance section group.
   *
   * @param user
   * @param filter
   * @param questions
   * @returns Promise{Array} - An array of section objects that match the provided compliance_section_group_id.
   */
  async getFilteredSectionList({ compliance_section_group_id }, user: IAuthenticatedUser, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    try {
      const sections = this.getSectionList({ compliance_section_group_id }, user, filter, questions);
      this.logger.info(`retrieved sections for ${compliance_section_group_id}`, { compliance_section_group_id, sections });
      return sections;
    } catch (error) {
      this.logger.error(`Error retrieving sections for ${compliance_section_group_id}`, { compliance_section_group_id, error });
      throw error;
    }
  }

  async createSection(data: any, user: IAuthenticatedUser) {
    try {
      //compliance_sectionsSchema.parse(data);

      if (data.compliance_definition_name && !data.compliance_definition_id) {
        const definition = await this.prisma.compliance_definitions.findUnique({
          where: {
            name: data.compliance_definition_name,
          },
        });

        if (!definition) {
          throw new NotFoundException(`Compliance Definition not found: ${data.compliance_definition_name}`);
        }

        data.compliance_definition_id = definition.id;
      }

      const section = await this.prisma.compliance_sections.create({
        data: {
          id: new Cuid2Generator(GuidPrefixes.ComplianceSection).scopedId,
          ...data,
        },
      });

      if (!section) {
        throw new UnprocessableEntityException({ data, user }, 'Error creating compliance section');
      }

      // update and return the section with the dependency chain
      return await this.updateSection(data.compliance_definition_name, data.compliance_section_group_id, section.id, data, user);
    } catch (error) {
      if (error.code === 'P2002') throw new ConflictException('Section with the same key already exists');
      this.logger.error(`Error creating compliance section`, { data, error, user });
      throw error;
    }
  }

  async updateSection(name: string, sgId: string, id: string, data: any, user: IAuthenticatedUser) {
    try {
      //compliance_sectionsSchema.parse(data);

      if (data.dependency_expression) {
        const chains = await this.buildDependencyChain(data, [], []);

        if (!chains || chains.length < 1) {
          console.log(`No chains found for section: ${data.key}`, { data });
        } else {
          await this.persistDependencyChain(sgId, data, name, chains, id);
        }
      }

      return await this.prisma.compliance_sections.update({
        where: {
          id,
          compliance_definition_name: name,
        },
        data: {
          key: data.key,
          title: data.title,
          metadata: data.metadata,
          order: data.order,
          compliance_section_dependency_chain_id: data.compliance_section_depedency_chain_id,
          dependency_expression: data.dependency_expression ? data.dependency_expression : '',
          //compliance_section_group_id: sgId,
          //compliance_definition_name: name,
        },
      });
    } catch (error: any) {
      this.logger.error(`Error updating compliance section`, { id, data, error });
      throw new UnprocessableEntityException(error.message, { id, data, ...error });
    }
  }

  private async persistDependencyChain(sgId: string, data: any, name: string, chains: Array<any>, sectionId: string) {
    const sectionDep = await this.prisma.compliance_section_dependency_chains.upsert({
      where: {
        defNameSecKeyGrpId: {
          compliance_section_group_id: sgId,
          compliance_section_key: data.key,
          compliance_definition_name: name,
        },
      },
      create: {
        id: new Cuid2Generator(GuidPrefixes.ComplianceDependencyChain).scopedId,
        dependency_chain: chains,
        compliance_section_id: sectionId,
        compliance_section_key: data.key,
        compliance_section_group_id: sgId,
        compliance_definition_name: name,
        dependency_expression: data.dependency_expression ? data.dependency_expression : '',
      },
      update: {
        dependency_chain: chains,
        compliance_section_id: sectionId,
        compliance_section_key: data.key,
        compliance_section_group_id: sgId,
        compliance_definition_name: name,
        dependency_expression: data.dependency_expression ? data.dependency_expression : '',
      },
    });

    data.compliance_section_depedency_chain_id = sectionDep.id;
    delete data.compliance_section_group_id;
    delete data.compliance_definition_name;
  }

  async deleteSection(name: string, sgId: string, id: string, user: IAuthenticatedUser) {
    try {
      return this.prisma.compliance_sections.delete({
        where: {
          id,
          compliance_definition_name: name,
          compliance_section_group_id: sgId,
        },
      });
    } catch (error) {
      this.logger.error(`Error deleting compliance section`, { id, section_group_id: sgId, error, user });
      throw error;
    }
  }

  // PRIVATE METHODS //

  /**
   * Retrieves a list of sections based on the specified condition.
   *
   * @param {object} where - The condition to filter sections.
   * @param user
   * @param filter
   * @param questions
   * @returns {Promise<Array<object>>} - An array of section objects.
   *
   * @private
   */
  private async getSectionList(where: any, user: IAuthenticatedUser, filter?: boolean, questions?: boolean): Promise<Array<any>> {
    const sections = (await this.prisma.compliance_sections.findMany({
      where: { ...where },
      select: {
        id: true,
        key: true,
        title: true,
        metadata: true,
        order: true,
        compliance_section_group_id: true,
        compliance_definition_name: true,
        compliance_section_dependency_chains: true,
        compliance_questions: questions
          ? {
              select: {
                id: true,
                key: true,
                order: true,
                prompt: true,
                component: true,
                tooltip: true,
                placeholder: true,
                rubric: true,
                options: true,
                question_summary: true,
                coresponding_question: true,
                compliance_question_dependency_chain: true,
              },
            }
          : false,
        _count: {
          select: {
            compliance_questions: true,
          },
        },
      },
    })) as ComplianceSectionsExtendedDto[];

    this.logger.log(`retrieved sections for ${where.compliance_definition_name}`, { where, sections, filter, questions, user });
    if (filter) {
      return await this.filterService.filterSections(sections);
    }

    return sections;
  }

  // @ts-expect-error - This method is not used, but is required by the OnModuleInit interface.
  async buildDependencyChain(section: any, seen: any[], chains: dependency_chain_data[]): Promise<dependency_chain_data[]> {
    if (section.dependency_expression) {
      const split_expression = section.dependency_expression.split('and $');
      for (const part of split_expression) {
        const expression = part.startsWith('lookup') ? `$${part}` : part;
        const regex =
          /(?:(?<booleanValue>true|false) in \$map\(\$lookup\(definition\.sections\.\*\.follow_up, '(?<questionKeyMap>.+?)'\)\.value, function\(\$v\) { \$v in (?<valuesMap>.+?)(?= \}\) and|\}\)\$|$)|\$lookup\(definition\.sections\.\*\.follow_up, '(?<questionKey>.+?)'\)\.value = (?<values>true|false))/g;

        const matches = [...expression.matchAll(regex)];
        if (!matches || matches.length === 0) {
          continue;
        }
        for (const match of matches) {
          const dependent_question = await this.prisma.compliance_questions.findUnique({
            where: {
              compDefNameKey: {
                compliance_definition_name: section.compliance_definition_name,
                key: get(match, 'groups.questionKey', get(match, 'groups.questionKeyMap', '')),
              },
            },
            select: {
              id: true,
              key: true,
              dependency_expression: true,
              compliance_definition_name: true,
              compliance_section: {
                select: {
                  id: true,
                  key: true,
                  compliance_section_group_id: true,
                },
              },
            },
          });

          if (!dependent_question) {
            throw new NotFoundException(dependent_question, `🚨 Missing Question: ${get(match, 'groups.questionKey', get(match, 'groups.questionKeyMap', ''))} 🚨`);
          }

          const chainData: dependency_chain_data = {
            dependency_expression: dependent_question.dependency_expression,
            dependent_question_id: dependent_question.id,
            dependent_question_key: dependent_question.key,
            dependent_section_key: dependent_question.compliance_section.key,
            dependent_section_group_id: dependent_question.compliance_section.compliance_section_group_id,
            dependent_definition_name: dependent_question.compliance_definition_name,
            dependent_question_values: JSON.parse(
              get(match, 'groups.valuesMap', `[${get(match, 'groups.values', '')}]`)
                .replace(' })', '')
                .replaceAll("'", '"'),
            ),
          } as dependency_chain_data;

          chains.push(chainData);

          if (seen.includes(section)) {
            console.warn(`🚨 Circular Dependency Detected: ${section.key} 🚨`, { section, seen });
            return chains;
          }

          seen.push(section);
          if (dependent_question.dependency_expression) {
            return await this.buildDependencyChain(dependent_question, seen, chains);
          } else {
            return chains;
          }
        }
      }
    }
  }
}
