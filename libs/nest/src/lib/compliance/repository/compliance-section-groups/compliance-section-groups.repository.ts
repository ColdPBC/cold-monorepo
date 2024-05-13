import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { set } from 'lodash';
import { Prisma } from '@prisma/client';

/**
 * Represents a repository for accessing compliance section groups data.
 * @constructor
 * @param {PrismaService} prisma - The Prisma service instance.
 */
@Injectable()
export class ComplianceSectionGroupsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceSectionGroupsRepository.name);
  }

  /**
   * Retrieves a list of section groups for a given organization and compliance set.
   *
   * @param {object} payload - The payload object containing org_id and compliance_set_name.
   * @param {string} payload.org_id - The ID of the organization.
   * @param {string} payload.compliance_set_name - The name of the compliance set.
   *
   * @returns {Promise<object>} - A Promise that resolves to an object containing compliance section group data.
   * @throws {Error} - Throws an error if the compliance definition is not found.
   */
  async getSectionGroupList({ org_id, compliance_set_name }: { org_id: string; compliance_set_name: string }): Promise<object> {
    const compliance_data = await this.prisma.organization_compliance.findUnique({
      where: {
        orgIdCompNameKey: {
          organization_id: org_id,
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
          },
        },
      },
    });
    if (!compliance_data) {
      throw new Error(`Compliance definition ${compliance_set_name} not found`);
    }

    return set(
      compliance_data.compliance_definition,
      'compliance_section_groups',
      await this.prisma.$queryRaw(Prisma.sql`SELECT csg.id,
                                                    csg.title,
                                                    csg.metadata,
                                                    csg.order,
                                                    csg.compliance_definition_name,
                                                    CAST(COUNT(cq.id) as INT)                                                                    AS question_count,
                                                    CAST(SUM(CASE WHEN ocair.answer IS NOT NULL AND ocr.value IS NULL THEN 1 ELSE 0 END) as INT) AS ai_answered_count,
                                                    CAST(SUM(CASE WHEN ocr.value IS NOT NULL AND ocair.answer IS NULL THEN 1 ELSE 0 END) as INT) AS user_answered_count,
                                                    CAST(SUM(CASE WHEN ocqb.id IS NOT NULL THEN 1 ELSE 0 END) as INT)                            AS bookmarked_count,
                                                    CAST(SUM(CASE WHEN ocair.answer IS NULL AND ocr.value IS NULL THEN 1 ELSE 0 END) as INT)     AS not_started_count
                                             FROM compliance_sections cs
                                                    JOIN
                                                  compliance_section_groups csg ON
                                                    cs.compliance_section_group_id = csg.id
                                                    JOIN
                                                  compliance_definitions cd ON
                                                    csg.compliance_definition_name = cd.name
                                                    JOIN
                                                  organization_compliance oc ON
                                                    cd.name = oc.compliance_definition_name
                                                    LEFT JOIN
                                                  compliance_questions cq ON
                                                    cs.id = cq.compliance_section_id
                                                    LEFT JOIN
                                                  organization_compliance_ai_responses ocair
                                                  ON cq.id = ocair.compliance_question_id
                                                    LEFT JOIN
                                                  organization_compliance_responses ocr
                                                  ON cq.id = ocr.compliance_question_id
                                                    LEFT JOIN
                                                  organization_compliance_question_bookmarks ocqb
                                                  ON cq.id = ocqb.compliance_question_id
                                             WHERE oc.compliance_definition_name =
                                                   ${compliance_set_name}
                                               AND oc.organization_id = ${org_id}
                                             GROUP BY csg.id, csg.order
                                             ORDER BY csg.order`),
    );
  }
}
