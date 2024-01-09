import { AuthenticatedUser, BaseWorker, Cuid2Generator, organization_locations, PrismaService } from '@coldpbc/nest';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class OrganizationLocationsService extends BaseWorker {
  cuid2 = new Cuid2Generator().setPrefix('oloc');

  constructor(private readonly prisma: PrismaService) {
    super(OrganizationLocationsService.name);

    if (!this.cuid2.prefix) {
      this.logger.warn('Cuid2 prefix not set, setting to "loc"');
      this.cuid2 = this.cuid2.setPrefix('oloc');
    }
  }

  async getOrganizationLocations(user: AuthenticatedUser, orgId: string): Promise<Partial<organization_locations>[]> {
    try {
      if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId) throw new UnprocessableEntityException(`Organization ${orgId} is invalid.`);

      const locations = await this.prisma.organization_locations.findMany({
        where: {
          organization_id: orgId,
        },
        include: {
          organizations: true,
        },
      });

      if (!locations) throw new NotFoundException(`Locations not found for ${orgId}`);

      return locations;
    } catch (e) {
      this.logger.error(e.message, { organization_id: orgId, user });
      throw new UnprocessableEntityException(e);
    }
  }

  async createOrganizationLocation(
    user: AuthenticatedUser,
    orgId: string,
    body: {
      city: string;
      state: string;
      postal_code: string;
      address: string;
      address_line_2: string;
      country: string;
      name: string;
    },
  ): Promise<organization_locations> {
    try {
      if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId) throw new UnprocessableEntityException(`Organization ${orgId} is invalid.`);

      if (!body.address && !body.city && !body.state && !body.postal_code)
        throw new UnprocessableEntityException(`Location not found for ${orgId} and address, city, state, zip not provided in metadata.`);

      const created = (await this.prisma.organization_locations.create({
        data: {
          id: this.cuid2.setId().scopedId,
          name: body.name || body.address,
          address: body.address,
          address_line_2: body.address_line_2,
          city: body.city,
          state: body.state,
          postal_code: body.postal_code,
          organization_id: orgId,
          country: body.country || 'US',
        },
        include: {
          organizations: true,
        },
      })) as unknown as organization_locations;

      return created;
    } catch (e: any) {
      this.logger.error(e.message, { body });
      throw new UnprocessableEntityException(e);
    }
  }
}
