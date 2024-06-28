import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker } from '../../../worker';
import { PrismaService } from '../../../prisma';
import { CacheService } from '../../../cache';
import { compliance_definitions } from '@prisma/client';
import { set } from 'lodash';

@Injectable()
export class ComplianceDefinitionsRepository extends BaseWorker {
  constructor(readonly prisma: PrismaService, readonly cache: CacheService) {
    super(ComplianceDefinitionsRepository.name);
  }

  async getComplianceDefinitionsByOrgId(orgId: string) {
    const definitions = (await this.prisma.extended.compliance_definitions.findMany({
      where: {
        visible: true,
      },
      orderBy: {
        order: 'asc',
      },
      select: {
        id: true,
        name: true,
        logo_url: true,
        title: true,
        image_url: true,
        metadata: true,
        order: true,
        version: true,
      },
    })) as compliance_definitions[];

    if (Array.isArray(definitions) && definitions.length > 0) {
      for (const def of definitions) {
        const metrics = (await this.cache.get(`organization:${orgId}:compliance:${def.name}:counts`)) as { counts: { progress: number } };
        if (metrics) {
          set(def, 'progress', metrics.counts.progress);
        }
      }
    } else {
      throw new NotFoundException('No compliance definitions found');
    }

    return definitions;
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
