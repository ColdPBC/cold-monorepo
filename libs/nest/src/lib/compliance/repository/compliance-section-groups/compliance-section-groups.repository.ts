import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';

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
   * @throws {Error} - Throws an error if the compliance definition is not found.
   */
  getSectionGroupList({ org_id, compliance_set_name }: { org_id: string; compliance_set_name: string }) {
    return this.prisma.organization_compliance.findUnique({
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
            compliance_section_groups: {
              select: {
                id: true,
                title: true,
                metadata: true,
                order: true,
                compliance_definition_name: true,
              },
            },
          },
        },
      },
    });
  }
}
