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

  private getCacheKey(orgId: string) {
    return `organizations:${orgId}:compliance:list`;
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

  async getComplianceDefinitionsByOrgId(req: any, bpc: boolean) {
    const start = new Date();
    const list = await this.cache.get(this.getCacheKey(req.organization.id));

    if (list) {
      if (!bpc) {
        return list;
      }
    }
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
        let raw;
        try {
          raw = await this.responses.getScoredComplianceQuestionsByName(req.organization, def.name, req.user, { bpc });
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

    const end = new Date();
    this.logger.info(`getComplianceDefinitionsByOrgId completed for ${req.organization.name} in ${end.getTime() - start.getTime()}ms`);

    const filtered = definitions.filter(def => def.visible);
    await this.cache.set(this.getCacheKey(req.organization.id), filtered, { ttl: 60 * 60 * 24 * 7 });

    return filtered;
  }
}
