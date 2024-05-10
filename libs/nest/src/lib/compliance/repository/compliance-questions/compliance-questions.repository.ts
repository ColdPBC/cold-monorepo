import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { MqttAPIComplianceSectionPayload } from '@coldpbc/nest';
import { Prisma } from '@prisma/client';

/**
 * Represents a repository for managing compliance questions.
 * @implements {BaseWorker}
 */
@Injectable()
export class ComplianceQuestionsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceQuestionsRepository.name);
  }

  /**
   * Retrieves a list of questions for a given compliance section.
   *
   * @param {MqttAPIComplianceSectionPayload} payload - The payload containing the compliance section ID.
   * @return {Promise<any>} - A promise that resolves to the list of questions.
   */
  async getQuestionList({ compliance_section_id }: MqttAPIComplianceSectionPayload) {
    return (await this.prisma.$queryRaw(
      Prisma.sql`SELECT cq.id,
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
                        LEFT JOIN organization_compliance_ai_responses ocair
                                  ON cq.id = ocair.compliance_question_id
                        LEFT JOIN organization_compliance_responses ocr
                                  ON cq.id = ocr.compliance_question_id
                        LEFT JOIN compliance_responses cr ON cq.id = cr.compliance_question_id
                        LEFT JOIN organization_compliance_question_bookmarks ocqb
                                  ON cq.id = ocqb.compliance_question_id
                        LEFT JOIN compliance_sections cs
                                  ON cq.compliance_section_id = cs.id
                        LEFT JOIN compliance_section_groups csg ON cs.compliance_section_group_id = csg.id
                        LEFT JOIN organization_compliance oc
                                  ON csg.compliance_definition_name = oc.compliance_definition_name
                 WHERE cs.id = ${compliance_section_id}

                 GROUP BY cq.id, ocair.answer, ocr.value,
                          oc.id`,
    )) as any;
  }
}
