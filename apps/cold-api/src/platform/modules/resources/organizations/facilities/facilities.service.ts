import { BaseWorker, Cuid2Generator, GuidPrefixes, MqttService, organization_facilities, PrismaService } from '@coldpbc/nest';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class FacilitiesService extends BaseWorker {
  cuid2 = new Cuid2Generator(GuidPrefixes.OrganizationFacility);

  constructor(readonly prisma: PrismaService, readonly mqtt: MqttService) {
    super(FacilitiesService.name);
  }

  async getOrganizationFacilities(req: any, orgId: string): Promise<organization_facilities[]> {
    const { user } = req;
    try {
      if (!user.isColdAdmin && user.coldclimate_claims.org_id !== orgId)
        throw new UnprocessableEntityException(`${user.coldclimate_claims.email} is ${user.isColdAdmin ? 'Cold:Admin' : 'not Cold:Admin'} bug is attempting to access ${orgId}.`);

      const facilities = (await this.prisma.organization_facilities.findMany({
        where: {
          organization_id: orgId,
        },
        include: {
          organization: true,
        },
      })) as unknown as organization_facilities[];

      if (!facilities) throw new NotFoundException(`Facilities not found for ${orgId}`);

      return facilities;
    } catch (e) {
      this.logger.error(e.message, { organization_id: orgId, user });
      throw new UnprocessableEntityException(e);
    }
  }

  async createOrganizationFacility(
    req: any,
    orgId: string,
    body: {
      city: string;
      state_province: string;
      postal_code: string;
      address_line_1: string;
      address_line_2: string;
      country: string;
      name: string;
      supplier: boolean;
    },
  ): Promise<organization_facilities> {
    const { user, url } = req;
    try {
      const created = (await this.prisma.organization_facilities.create({
        data: {
          id: this.cuid2.generate().scopedId,
          name: body.name || body.address_line_1,
          address_line_1: body.address_line_1,
          address_line_2: body.address_line_2,
          city: body.city,
          state_province: body.state_province,
          postal_code: body.postal_code,
          organization_id: orgId,
          country: body.country,
          supplier: body.supplier === true,
        },
        include: {
          organization: true,
        },
      })) as unknown as organization_facilities;

      this.mqtt.publishMQTT('ui', {
        org_id: orgId,
        user,
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          ...created,
        },
      });

      return created;
    } catch (e: any) {
      this.logger.error(e.message, { body });

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'failed',
        data: {
          error: e.message,
          body,
        },
      });

      throw new UnprocessableEntityException(e);
    }
  }

  async update(req: any, facilityId: string, data: any) {
    data.organization_id = req.organization.id;
    data.id = facilityId;
    data.deleted = false;

    delete data.created_at;
    delete data.updated_at;

    return this.prisma.organization_facilities.update({
      where: {
        id: facilityId,
        organization_id: req.organization.id,
      },
      data,
    });
  }

  async deleteOrganizationFacility(req: any, facilityId: string) {
    return this.prisma.organization_facilities.delete({
      where: {
        id: facilityId,
        organization_id: req.organization.id,
      },
    });
  }
}
