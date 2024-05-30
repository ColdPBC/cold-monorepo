import { Injectable } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { Cuid2Generator } from '../../../utility';
import { PrismaService } from '../../../prisma';

@Injectable()
export class ComplianceDefinitionsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ComplianceDefinitionsRepository.name);
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
