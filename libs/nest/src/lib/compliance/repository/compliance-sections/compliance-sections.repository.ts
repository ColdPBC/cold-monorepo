import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { MqttAPIComplianceSectionPayload } from '@coldpbc/nest';

/**
 * ComplianceSectionsRepository class is responsible for managing the compliance sections data.
 *
 * @class ComplianceSectionsRepository
 * @extends BaseWorker
 */
@Injectable()
export class ComplianceSectionsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceSectionsRepository.name);
  }

  /**
   * Get the list of sections for a compliance section group.
   *
   * @param {Object} payload - The payload object.
   * @param {string} payload.compliance_section_group_id - The ID of the compliance section group.
   * @returns {Promise<Array<Object>>} - A Promise that resolves to an array of section objects.
   */
  async getSectionList({ compliance_section_group_id }: MqttAPIComplianceSectionPayload) {
    return this.prisma.compliance_sections.findMany({
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
  }
}
