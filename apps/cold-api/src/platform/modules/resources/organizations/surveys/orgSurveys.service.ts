import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AuthenticatedUser, BaseWorker, Cuid2Generator, PrismaService } from '@coldpbc/nest';
import { survey_status_types } from '@prisma/client';
import { pick } from 'lodash';

@Injectable()
export class OrgSurveysService extends BaseWorker {
  constructor(private readonly prisma: PrismaService) {
    super(OrgSurveysService.name);
  }

  async createSurveyStatus(surveyName: string, orgId: string, status: survey_status_types, user: AuthenticatedUser) {
    const latest = await this.prisma.survey_status.findFirst({
      where: {
        survey_name: surveyName,
        organization_id: orgId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (latest?.status === survey_status_types.cold_submitted) {
      this.logger.error(`Survey ${surveyName} for ${orgId} already submitted`, { user, surveyName, orgId });
      throw new UnprocessableEntityException(`Survey ${surveyName} for ${orgId} already submitted`);
    }

    if (latest?.status === survey_status_types.user_submitted && !user.isColdAdmin) {
      this.logger.error(`Survey ${surveyName} for ${orgId} already submitted by user`, { user, surveyName, orgId });
      throw new UnprocessableEntityException(`Survey ${surveyName} for ${orgId} already submitted by user`);
    }

    if (latest?.status === status) {
      return this.prisma.survey_status.findMany({
        where: {
          survey_name: surveyName,
          organization_id: orgId,
        },
        orderBy: {
          created_at: 'desc',
        },
      });
    }

    const organization = await this.prisma.organizations.findUnique({
      where: {
        id: orgId,
      },
    });

    if (!organization) {
      this.logger.error(`Organization with id ${orgId} not found`, { orgId, user });
      throw new NotFoundException(`Organization with id ${orgId} not found`);
    }

    const surveyDef = await this.prisma.survey_definitions.findUnique({
      where: {
        name: surveyName,
      },
      select: {
        id: true,
      },
    });

    if (!surveyDef) {
      this.logger.error(`Survey with name ${surveyName} not found`, { organization, user, surveyName });
      throw new NotFoundException(`Survey ${surveyName} not found`);
    }

    const surveyId = surveyDef.id;

    const surveyData = await this.prisma.survey_data.findFirst({
      where: {
        survey_definition_id: surveyDef.id,
        organization_id: orgId,
      },
      select: {
        id: true,
      },
    });

    if (!surveyData) {
      this.logger.error(`${surveyName} data for ${organization.name} not found`, {
        organization,
        user,
        survey: pick(surveyDef, ['id', 'name']),
      });

      throw new NotFoundException(`${surveyName} data for ${organization.name} not found`);
    }

    try {
      await this.prisma.survey_status.create({
        data: {
          id: new Cuid2Generator('sustat').scopedId,
          survey_id: surveyId,
          survey_name: surveyName,
          survey_data_id: surveyData.id,
          organization_id: orgId,
          status,
          email: user.coldclimate_claims.email,
        },
      });

      return await this.prisma.survey_status.findMany({
        where: {
          survey_name: surveyName,
          organization_id: orgId,
        },
        orderBy: {
          created_at: 'desc',
        },
      });
    } catch (e) {
      this.logger.error(e.message, { organization, user, surveyName, status, ...e });
      throw new UnprocessableEntityException(e.message, e);
    }
  }
}
