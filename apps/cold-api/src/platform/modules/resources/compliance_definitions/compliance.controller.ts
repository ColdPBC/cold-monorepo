import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { survey_types } from '@prisma/client';
import { Span } from 'nestjs-ddtrace';
import { ResourceValidationPipe } from '../../../pipes/resource.pipe';
import {
  AuthenticatedUser,
  BaseWorker,
  HttpExceptionFilter,
  JwtAuthGuard,
  Role,
  Roles,
  RolesGuard,
  SurveyDefinitionsEntity,
  SurveyResponseSchema,
  UpdateSurveyDefinitionsDto,
  ZodCategoryResponseDto,
} from '@coldpbc/nest';
import { allRoles, bpcDecoratorOptions, coldAdminOnly, impersonateOrgDecoratorOptions, orgIdDecoratorOptions } from '../_global/global.params';
import { ComplianceService } from './compliance.service';

//import { UpdateSurveyDefinitionDto } from './dto/update-survey-definition.dto';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(ComplianceController.name))
@ApiOAuth2(['openid'])
@Controller()
export class ComplianceController extends BaseWorker {
  constructor(private readonly surveyService: ComplianceService) {
    super(ComplianceController.name);
  }

  @Post('')
  @ApiTags('Surveys')
  @ApiResponse({
    status: 201,
    description: 'Creates a new survey',
  })
  @HttpCode(201)
  @Roles(...coldAdminOnly)
  create(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Body(new ResourceValidationPipe(SurveyResponseSchema, 'POST')) createSurvey: SurveyDefinitionsEntity,
  ) {
    return this.surveyService.create(createSurvey, req.user);
  }

  @Get('surveys')
  @ApiTags('Surveys')
  @Roles(...coldAdminOnly)
  @ApiQuery({
    name: 'type',
    example: 'TEST',
    required: false,
    description: 'The type of surveys to return',
  })
  @ApiQuery({
    name: 'name',
    example: '{{test_survey_name}}',
    required: false,
    description: 'The type of surveys to return',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiQuery(impersonateOrgDecoratorOptions)
  @ApiResponse({
    status: 200,
    description: 'Returns all survey definitions by type',
  })
  async findAll(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Query('type') type: survey_types,
    @Query('name') name: string,
    @Query('impersonateOrg') orgId?: string,
    @Query('bpc') bpc?: boolean,
  ) {
    const response = await this.surveyService.findAll(req.user, { name: name, type: type }, bpc, orgId);

    return response;

    //return this.surveyService.findAll(req.user, bpc, orgId);
  }

  /**
   * Get all surveys for an org
   */
  @Get('organizations/:orgId/surveys')
  @Roles(...allRoles)
  @ApiTags('Organizations : Surveys')
  @ApiParam(orgIdDecoratorOptions)
  @ApiQuery({
    name: 'type',
    example: 'TEST',
    required: false,
    description: 'The type of surveys to return',
  })
  @ApiQuery({
    name: 'name',
    example: '{{test_survey_name}}',
    required: false,
    description: 'The name of survey to return',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiResponse({
    status: 200,
    description: 'Returns all survey definitions by type',
  })
  async findAllByOrg(
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Query('type') type: survey_types,
    @Query('name') name: string,
    @Query('bpc') bpc?: boolean,
  ) {
    if (!name && !type) {
      // return new HttpException('Must provide either name or type query parameters', 400);
    }
    const response = await this.surveyService.findAll(req.user, { name, type }, bpc, orgId);

    return response;

    //return this.surveyService.findAll(req.user, bpc, orgId);
  }

  @ApiTags('Surveys')
  @Get('surveys/types/:type')
  @Roles(...coldAdminOnly)
  @ApiParam({
    name: 'type',
    enum: survey_types,
    example: `${survey_types.TEST}`,
    required: true,
    description: 'The type of surveys to return',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiResponse({
    status: 200,
    description: 'Returns all survey definitions by type',
  })
  async getAllByType(
    @Param('type') type: survey_types,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
  ) {
    const response = await this.surveyService.findByType(req.user, type);
    return response;
  }

  @ApiTags('Surveys')
  @Get('surveys/:name')
  @ApiParam({
    name: 'name',
    required: true,
    example: '{{test_survey_name}}',
    description: 'The name of the survey to return',
  })
  @ApiQuery({
    name: 'type',
    enum: survey_types,
    example: `${survey_types.TEST}`,
    required: false,
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiQuery(impersonateOrgDecoratorOptions)
  @ApiResponse({
    status: 200,
    description: 'Returns a survey definition by name',
  })
  @Roles(...allRoles)
  async findOne(
    @Query('type') type: survey_types,
    @Param('name') name: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Query('impersonateOrg') orgId?: string,
    @Query('bpc') bpc?: boolean,
  ) {
    const response = await this.surveyService.findOne(name, req.user, bpc, orgId);

    return response;
  }

  @Get('organizations/:orgId/surveys/:name')
  @ApiTags('Organizations : Surveys')
  @Roles(...allRoles)
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiParam({
    name: 'name',
    required: true,
    example: '{{test_survey_name}}',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a survey definition by name',
  })
  async findOneByOrg(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Query('bpc') bpc?: boolean,
  ) {
    const response = await this.surveyService.findOne(name, req.user, bpc, orgId);
    return response;
  }

  @ApiOperation({
    summary: 'Update survey by name',
    operationId: 'UpdateSurveyByName',
  })
  @ApiTags('Surveys')
  @Patch('surveys/:name')
  @Roles(...coldAdminOnly)
  @HttpCode(200)
  @ApiParam({
    name: 'name',
    required: true,
    example: '{{test_survey_name}}',
  })
  update(
    @Param('name') name: string,
    @Body(new ResourceValidationPipe(SurveyResponseSchema, 'PATCH')) updateSurvey: Partial<ZodCategoryResponseDto>,
    @Req()
    req: {
      user: AuthenticatedUser;
    },
  ) {
    return this.surveyService.update(name, updateSurvey as UpdateSurveyDefinitionsDto, req.user);
  }

  @ApiOperation({
    summary: 'Submit survey results',
  })
  @ApiTags('Surveys')
  @Put('surveys/:name')
  @ApiQuery(impersonateOrgDecoratorOptions)
  @ApiQuery(bpcDecoratorOptions)
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  @HttpCode(201)
  @ApiParam({
    name: 'name',
    example: '{{test_survey_name}}',
  })
  submit(
    @Param('name') name: string,
    @Body() updateComponentDefinitionDto: any,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
    @Query('impersonateOrg') orgId?: string,
  ) {
    return this.surveyService.submitResults(name, updateComponentDefinitionDto, req.user, orgId);
  }

  @Put('organizations/:orgId/surveys/:name')
  @Roles(...allRoles)
  @ApiTags('Organizations : Surveys')
  @ApiParam({
    name: 'orgId',
    required: true,
    example: '{{test_organization_name}}',
    description: 'The id of the organization',
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: '{{test_survey_name}}',
  })
  @ApiQuery({
    name: 'bpc',
    required: false,
    description: 'Bypass Cache',
  })
  @HttpCode(201)
  @Roles(Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember)
  submitOrgSurvey(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Body(new ResourceValidationPipe(SurveyResponseSchema, 'PUT')) updateComponentDefinitionDto: any, //UpdateSurveyDefinitionDto,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
  ) {
    return this.surveyService.submitResults(name, updateComponentDefinitionDto, req.user, orgId);
  }

  @ApiTags('Surveys')
  @Delete('surveys/:name')
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: '{{test_survey_name}}',
  })
  @HttpCode(204)
  @Roles(Role.ColdAdmin)
  remove(
    @Param('name') name: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: AuthenticatedUser;
    },
  ) {
    return this.surveyService.remove(name, req.user);
  }
}
