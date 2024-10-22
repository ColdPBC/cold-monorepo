import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { ComplianceSectionsRepository } from '../compliance-sections';
import { Cuid2Generator, GuidPrefixes } from '../../../utility';
import { compliance_section_groups, compliance_section_groupsSchema } from '../../../../validation/generated/modelSchema/compliance_section_groupsSchema';
import { ComplianceSectionGroupsExtendedDto } from './dto';
import { FilteringService } from '../../filtering';
import { ScoringService } from '../../scoring';

/**
 * Represents a repository for accessing compliance section groups data.
 * @constructor
 * @param {PrismaService} prisma - The Prisma service instance.
 */
@Injectable()
export class ComplianceSectionGroupsRepository extends BaseWorker {
	constructor(
		readonly prisma: PrismaService,
		readonly scoringService: ScoringService,
		readonly filterService: FilteringService,
		readonly complianceSectionsRepository: ComplianceSectionsRepository,
	) {
		super(ComplianceSectionGroupsRepository.name);
	}

	validateSectionGroup(sectionGroup: compliance_section_groups) {
		try {
			compliance_section_groupsSchema.parse(sectionGroup);
		} catch (error) {
			this.logger.error(`Error validating section group`, { sectionGroup, error });
			throw error;
		}
	}

	/**
	 * Creates a new section group.
	 *
	 * @param {string} compliance_name - The name of the compliance set.
	 * @param {Partial<compliance_section_groups>} sectionGroup - The section group to create.
	 *
	 * @throws {Error} - Throws an error if the compliance definition name is not provided.
	 */
	async createSectionGroup(sectionGroup: ComplianceSectionGroupsExtendedDto) {
		try {
			sectionGroup.id = new Cuid2Generator(GuidPrefixes.SectionGroup).scopedId;

			const data: any = compliance_section_groupsSchema
				.partial({
					deleted: true,
					compliance_definition_id: true,
				})
				.parse(sectionGroup);

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

			return this.prisma.compliance_section_groups.create({
				data: data,
			});
		} catch (error: any) {
			this.logger.error(`Error creating section group`, { sectionGroup, error });
			throw new UnprocessableEntityException(JSON.parse(error.message), { sectionGroup, ...error });
		}
	}
	/**
	 * Retrieves a list of section groups for a given organization and compliance set.
	 * @throws {Error} - Throws an error if the compliance definition is not found.
	 */
	async getSectionGroupList(where: { compliance_definition_name?: string; title?: string }, filter?: boolean, questions?: boolean) {
		try {
			const groupList = (await this.prisma.compliance_section_groups.findMany({
				where: where,
				select: {
					id: true,
					title: true,
					metadata: true,
					order: true,
					compliance_definition_name: true,
					compliance_sections: {
						select: {
							id: true,
							key: true,
							title: true,
							metadata: true,
							order: true,
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
						},
					},
				},
			})) as ComplianceSectionGroupsExtendedDto[];

			if (filter) {
				if (groupList.length < 1) {
					return [];
				}
				return await this.filterService.filterSectionGroups(groupList);
			}

			return groupList;
		} catch (error) {
			this.logger.error(`Error getting section group list`, { where, error });
			throw error;
		}
	}

	async getSectionGroup(
		where: { compDefNameTitle: { compliance_definition_name: string; title: string } } | { compliance_definition_name: string; id: string },
		filter?: boolean,
		questions?: boolean,
	) {
		try {
			const sectionGroup = this.prisma.compliance_section_groups.findUnique({
				where: {
					...where,
				},
				select: {
					id: true,
					title: true,
					metadata: true,
					order: true,
					compliance_definition_name: true,
					compliance_sections: {
						select: {
							id: true,
							key: true,
							title: true,
							metadata: true,
							order: true,
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
						},
					},
				},
			}) as unknown as ComplianceSectionGroupsExtendedDto;

			if (filter) {
				sectionGroup.compliance_sections = await this.filterService.filterSectionGroupSections(sectionGroup);
				return sectionGroup;
			}

			return sectionGroup;
		} catch (error) {
			this.logger.error(`Error getting section group`, { where, error });
			throw error;
		}
	}

	/**
	 * Retrieves a list of section groups for a given organization and compliance set.
	 *
	 * @param {string} payload.org_id - The ID of the organization.
	 * @param {string} payload.compliance_set_name - The name of the compliance set.
	 *
	 * @param org
	 * @param compliance_set_name
	 * @param user
	 * @param filter
	 * @param questions
	 * @throws {Error} - Throws an error if the compliance definition is not found.
	 */
	async getSectionGroupListByOrgCompliance(org, compliance_set_name, user, filter?: boolean, questions?: boolean) {
		try {
			const orgCompliance = (await this.prisma.organization_compliance.findUnique({
				where: {
					orgIdCompNameKey: {
						organization_id: org.id,
						compliance_definition_name: compliance_set_name,
					},
				},
				select: {
					statuses: {
						take: 1,
						select: {
							id: true,
							type: true,
							updated_at: true,
							created_at: true,
						},
						orderBy: {
							created_at: 'desc',
						},
					},
					compliance_definition: {
						select: {
							name: true,
							title: true,
							version: true,
							logo_url: true,
							metadata: true,
							image_url: true,
							compliance_section_groups: {
								select: {
									id: true,
									title: true,
									metadata: true,
									order: true,
									compliance_definition_name: true,
									compliance_sections: {
										select: {
											id: true,
											key: true,
											title: true,
											metadata: true,
											order: true,
											compliance_section_dependency_chains: true,
											compliance_questions: {
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
													compliance_responses: {
														select: {
															ai_response: true,
															org_response: true,
														},
													},
													compliance_question_dependency_chain: true,
												},
											},
										},
									},
								},
							},
						},
					},
				},
			})) as any;

			// If the organization compliance is not found, create it since they are trying to access the compliance set for the first time
			if (!orgCompliance) {
				await this.prisma.organization_compliance.create({
					data: {
						id: new Cuid2Generator(GuidPrefixes.OrganizationCompliance).scopedId,
						organization_id: org.id,
						compliance_definition_name: compliance_set_name,
						description: '',
					},
				});

				return await this.getSectionGroupListByOrgCompliance(org, compliance_set_name, user, filter, questions);
			}

			if (filter) {
				await this.scoringService.scoreComplianceResponse(orgCompliance.compliance_definition, org, user);
			}

			return orgCompliance;
		} catch (error) {
			this.logger.error(`Error getting section group list by org and compliance`, { org, compliance_set_name, error });
			throw error;
		}
	}

	/**
	 * Deletes a section group.
	 *
	 * @param {object} where - The where clause to use to find the section group to delete.
	 *
	 * @throws {Error} - Throws an error if the section group is not found.
	 */
	async deleteSectionGroup(where: { compliance_definition_name: string; id: string }) {
		try {
			const deleted = this.prisma.compliance_section_groups.delete({
				where: where,
			});

			return deleted;
		} catch (error) {
			this.logger.error(`Error deleting section group`, { where, error });
			throw error;
		}
	}

	/**
	 * Updates a section group.
	 */
	async updateSectionGroup(where: { compliance_definition_name: string; id: string }, data: any) {
		try {
			data = compliance_section_groupsSchema.partial().strip();

			const updated = this.prisma.compliance_section_groups.update({
				where: where,
				data: data,
			});

			return updated;
		} catch (error) {
			this.logger.error(`Error updating section group`, { where, error });
			throw error;
		}
	}
}
