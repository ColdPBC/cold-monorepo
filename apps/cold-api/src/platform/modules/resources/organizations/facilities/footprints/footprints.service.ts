import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker, Cuid2Generator, GuidPrefixes, PrismaService } from '@coldpbc/nest';
import { FacilityFootprint } from './entities/footprint.entity';
import { groupBy, map } from 'lodash';

@Injectable()
export class FootprintsService extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(FootprintsService.name);
  }

  async create(
    orgId: string,
    createFootprintDto: Array<{
      facility_id: string;
      facility_name: string;
      periods: Array<FacilityFootprint>;
    }>,
  ) {
    const existing = await this.prisma.organizations.findUnique({
      where: {
        id: orgId,
      },
      include: {
        facilities: true,
      },
    });

    if (!existing) {
      throw new NotFoundException(`Organization ${orgId} not found.`);
    }

    for (const facility of createFootprintDto) {
      const exfac = existing.facilities.find(fac => fac.id === facility.facility_id || fac.name === facility.facility_name);

      if (!exfac) {
        throw new NotFoundException(`Facility ${facility.facility_name} (${facility.facility_id}) not found for ${existing.name}`);
      }

      this.logger.debug(`Updating or creating footprint for ${existing.name} facility: ${facility.facility_name}`);

      for (const period of facility.periods) {
        period.facility_id = exfac.id;

        for (const emission of period.emissions) {
          if (emission.scope?.ghg_subcategory && emission.scope?.ghg_subcategory > 0) {
            const emission_scope = await this.prisma.emission_scopes.findFirst({
              where: {
                ghg_subcategory: period.emissions[0].scope.ghg_subcategory,
              },
            });
            if (emission_scope) {
              emission.scope.subcategory_label = emission_scope.subcategory_label || '';
            }
          }
        }
        const footprint = await this.prisma.facility_footprints.upsert({
          where: {
            facilityFootprintKey: {
              facility_id: exfac.id,
              type: period.type,
              value: period.value,
            },
          },
          update: FacilityFootprint.fromJSON(orgId, period),
          create: {
            id: new Cuid2Generator(GuidPrefixes.OrganizationFootprint).scopedId,
            facility_id: period.facility_id,
            organization_id: orgId,
            updated_at: new Date().toISOString(),
            emissions: period.emissions,
            value: period.value,
            type: period.type,
          },
        });

        console.log(`added facility footprint for ${period.type} period: ${period.value}`, {
          facility_id: footprint.facility_id,
          organization_id: footprint.organization_id,
          emissions: typeof footprint.emissions === 'string' ? JSON.parse(footprint.emissions) : footprint.emissions,
          period: footprint.value,
          period_type: footprint.type,
        });
      }

      // Update the facility name in the database
      await this.prisma.organization_facilities.update({
        where: { id: exfac.id },
        data: {
          name: facility.facility_name,
        },
      });
    }

    return await this.getAllFacilityFootprintsByPeriod(orgId);
  }

  async getAllFacilityFootprintsByPeriod(orgId: string) {
    const footprints = await this.prisma.facility_footprints.findMany({
      where: {
        organization_id: orgId,
      },
    });

    const groupedByFacility = groupBy(footprints, 'facility_id');
    const facMap = map(groupedByFacility, async (facilityFootprints, facilityId) => {
      const current = await this.prisma.organization_facilities.findUnique({
        where: {
          id: facilityId,
        },
      });

      return {
        facility_id: facilityId,
        facility_name: current?.name,
        periods: facilityFootprints,
      };
    });

    return await Promise.all(facMap);
  }

  async findAll() {
    return this.prisma.facility_footprints.findMany();
  }

  async findAllByOrg(orgId: string) {
    return await this.getAllFacilityFootprintsByPeriod(orgId);
  }

  async findAllByOrgFacility(orgId: string, facId: string) {
    return {
      periods: await this.prisma.facility_footprints.findMany({
        where: {
          organization_id: orgId,
          facility_id: facId,
        },
      }),
    };
  }

  findOne(orgId: string, facId: string, id: string) {
    return this.prisma.facility_footprints.findMany({
      where: {
        organization_id: orgId,
        facility_id: facId,
        id: id,
      },
    });
  }

  remove(orgId: string, facId: string, id: string) {
    return this.prisma.facility_footprints.delete({
      where: {
        organization_id: orgId,
        facility_id: facId,
        id: id,
      },
    });
  }
}
