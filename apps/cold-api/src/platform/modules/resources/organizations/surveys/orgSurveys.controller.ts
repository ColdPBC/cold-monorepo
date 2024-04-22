import { Body, Controller, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { BaseWorker, HttpExceptionFilter, IAuthenticatedUser, JwtAuthGuard, Roles, RolesGuard } from '@coldpbc/nest';
import { OrgSurveysService } from './orgSurveys.service';
import { Span } from 'nestjs-ddtrace';
import { ApiBody, ApiOAuth2, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { survey_status_types } from '@prisma/client';
import { bpcDecoratorOptions, coldAdminOnly } from '../../_global/global.params';
import { CreateOrganizationDto } from '../dto/organization.dto';

@Controller()
@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOAuth2(['openid', 'email', 'profile'])
@ApiTags('Organizations')
@UseFilters(new HttpExceptionFilter(OrgSurveysController.name))
export class OrgSurveysController extends BaseWorker {
  constructor(private readonly orgSurveys: OrgSurveysService) {
    super(OrgSurveysController.name);
  }

  @Post('/organizations/:orgId/surveys/:surveyName/status')
  @ApiOperation({
    summary: 'Create Survey Status',
    operationId: 'CreateSurveyStatus',
  })
  @Roles(...coldAdminOnly)
  @ApiQuery(bpcDecoratorOptions)
  @ApiBody({
    type: CreateOrganizationDto,
    schema: {
      example: { status: 'draft' },
    },
  })
  async createSurveyStatus(
    @Param('orgId') orgId: string,
    @Param('surveyName') surveyName: string,
    @Body() body: { status: survey_status_types },
    @Req() req: { user: IAuthenticatedUser },
  ) {
    return this.orgSurveys.createSurveyStatus(surveyName, orgId, body.status, req.user);
  }
}
