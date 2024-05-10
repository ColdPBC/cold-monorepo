import { BaseWorker, MqttAPIComplianceSectionPayload, MqttSocketAPIPayload, PrismaService } from '@coldpbc/nest';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { set } from 'lodash';

@Injectable()
export class ComplianceRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceRepository.name);
  }

  async complianceSectionGroupListByOrgIdCompNameKey({ org_id, compliance_set_name }: MqttSocketAPIPayload) {
    const sectionGroups = await this.prisma.$queryRaw(Prisma.sql`SELECT csg.id,
                                                                        csg.title,
                                                                        csg.metadata,
                                                                        csg.compliance_definition_name,
                                                                        CAST(COUNT(cq.id) as INT)                                                             AS question_count,
                                                                        CAST(SUM(CASE WHEN ocair.answer IS NOT NULL AND ocr.value IS NULL THEN 1 END) as INT) AS ai_answered_count,
                                                                        CAST(SUM(CASE WHEN ocr.value IS NOT NULL AND ocair.answer IS NULL THEN 1 END) as INT) AS user_answered_count,
                                                                        CAST(SUM(CASE WHEN ocqb.id IS NOT NULL THEN 1 END) as INT)                            AS bookmarked_count,
                                                                        CAST(SUM(CASE WHEN ocair.answer IS NULL AND ocr.value IS NULL THEN 1 END) as INT)     AS not_started_count
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
                                                                 ORDER BY csg.order`);
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
    // @ts-expect-error - compliance_data is not null
    set(compliance_data.compliance_definition, 'compliance_section_groups', sectionGroups);
    return compliance_data;
  }

  async complianceSectionListSectionGroupId({ compliance_section_group_id }: MqttAPIComplianceSectionPayload) {
    const response = await this.prisma.compliance_sections.findMany({
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
        _count: {
          select: {
            compliance_questions: true,
          },
        },
      },
    });
    return response;
  }

  async complianceQuestionListByOrgIdCompNameKey({ org_id, compliance_set_name, compliance_section_group_id, compliance_section_id }: MqttAPIComplianceSectionPayload) {
    const response = (await this.prisma.$queryRaw(Prisma.sql`SELECT cq.id,
                                                                    cq.prompt,
                                                                    cq.order,
                                                                    cq.key,
                                                                    oc.organization_id,
                                                                    CASE
                                                                      WHEN ocair.answer IS NULL AND ocr.value IS NULL
                                                                        THEN TRUE
                                                                      ELSE FALSE END                                                   AS not_started,
                                                                    CASE
                                                                      WHEN ocair.answer IS NOT NULL AND ocr.value IS NULL
                                                                        THEN TRUE
                                                                      ELSE FALSE END                                                   AS ai_answered,
                                                                    CASE
                                                                      WHEN ocr.value IS NOT NULL AND ocair.answer IS NULL
                                                                        THEN TRUE
                                                                      ELSE FALSE END                                                   AS user_answered,
                                                                    CASE WHEN CAST(COUNT(ocqb.id) as INT) > 1 THEN TRUE ELSE FALSE END AS bookmarked
                                                             FROM compliance_questions cq
                                                                    LEFT JOIN
                                                                  organization_compliance_ai_responses ocair
                                                                  ON cq.id = ocair.compliance_question_id
                                                                    LEFT JOIN
                                                                  organization_compliance_responses ocr
                                                                  ON cq.id = ocr.compliance_question_id
                                                                    LEFT JOIN
                                                                  compliance_responses cr ON cq.id = cr.compliance_question_id
                                                                    LEFT JOIN
                                                                  organization_compliance_question_bookmarks ocqb
                                                                  ON cq.id = ocqb.compliance_question_id
                                                                    LEFT JOIN compliance_sections cs
                                                                              ON cq.compliance_section_id = cs.id
                                                                    LEFT JOIN compliance_section_groups csg ON cs.compliance_section_group_id = csg.id
                                                                    LEFT JOIN organization_compliance oc
                                                                              ON csg.compliance_definition_name = oc.compliance_definition_name
                                                             WHERE oc.organization_id = ${org_id}
                                                               AND oc.compliance_definition_name = ${compliance_set_name}
                                                               AND csg.id = ${compliance_section_group_id}
                                                               AND cs.id = ${compliance_section_id}

                                                             GROUP BY cq.id, ocair.answer, ocr.value,
                                                                      oc.id`)) as any;

    return response;
  }
}
