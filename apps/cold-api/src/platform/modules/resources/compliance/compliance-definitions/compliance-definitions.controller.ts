import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { ResourceValidationPipe } from '../../../../pipes/resource.pipe';
import { BaseWorker, HttpExceptionFilter, IAuthenticatedUser, JwtAuthGuard, Role, Roles, RolesGuard, SurveyResponseSchema, GeneratorService } from '@coldpbc/nest';
import { allRoles, bpcDecoratorOptions, coldAdminOnly } from '../../_global/global.params';
import { ComplianceDefinitionService } from './compliance-definitions.service';
import { ComplianceDefinition, ComplianceDefinitionSchema } from './compliance-definitions.schema';

const genService = new GeneratorService();

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(ComplianceDefinitionsController.name))
@ApiOAuth2(['openid'])
@ApiTags('Compliance')
@Controller()
export class ComplianceDefinitionsController extends BaseWorker {
  constructor(private readonly complianceService: ComplianceDefinitionService) {
    super(ComplianceDefinitionsController.name);
  }

  /**
   * COMPLIANCE DEFINITIONS
   */

  @Post('compliance')
  @HttpCode(201)
  @Roles(...coldAdminOnly)
  createDefinition(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Body(new ResourceValidationPipe(ComplianceDefinitionSchema, 'POST')) definition: ComplianceDefinition,
  ) {
    return this.complianceService.create(req, definition);
  }

  //DEPRECATED Replaced By createDefinition
  @Post('compliance_definitions')
  @ApiOperation({
    deprecated: true,
  })
  @HttpCode(201)
  @Roles(...coldAdminOnly)
  @ApiTags('Deprecated')
  create(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Body(new ResourceValidationPipe(ComplianceDefinitionSchema, 'POST')) definition: ComplianceDefinition,
  ) {
    return this.complianceService.create(req, definition);
  }

  // TODO: Deprecate once new compliance flow is fully in place
  @Post('compliance/:name/survey')
  @ApiOperation({
    summary: 'Inject a survey into a compliance framework by name',
    operationId: 'InjectComplianceSurvey',
  })
  @HttpCode(201)
  @Roles(...coldAdminOnly)
  @ApiParam({
    name: 'name',
    example: '{{test_compliance_definition_name}}',
    required: true,
    description: 'The name of compliance definition to injest',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sections: {
          type: 'object',
          additionalProperties: {
            type: 'object',
            properties: {
              follow_up: {
                type: 'object',
              },
            },
          },
        },
      },
    },
    examples: {
      sample: {
        summary: 'Sample Survey',
        description: 'string',
        value: genService.generateSurveyMock(),
      },
    },
  })
  injectComplianceSurvey(
    @Param('name') name: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Body()
    definition: {
      sections: { [key: string]: { follow_up: any } };
    },
  ) {
    return this.complianceService.injectSurvey(req, name, definition);
  }

  @Post('compliance_definitions/:id/survey')
  @ApiOperation({
    deprecated: true,
    summary: 'Use POST: compliance/frameworks/:name/survey instead',
    operationId: 'InjectComplianceSurvey',
  })
  @HttpCode(201)
  @Roles(...coldAdminOnly)
  @ApiTags('Deprecated')
  injectSurvey(
    @Param('id') id: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Body()
    definition: {
      sections: { [key: string]: { follow_up: any } };
    },
  ) {
    return this.complianceService.injectSurvey(req, id, definition);
  }

  @Get('compliance/all/organizations/:orgId')
  @ApiOperation({
    deprecated: true,
    summary: 'Get list of all compliance frameworks',
    operationId: 'findAllComplianceFrameworks',
  })
  @Roles(...allRoles)
  @ApiQuery(bpcDecoratorOptions)
  @ApiResponse({
    status: 200,
    description: 'Returns all compliance frameworks',
  })
  async getAllComplianceFrameworks(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    return await this.complianceService.findAll(req);
  }

  @Get('compliance_definitions')
  @ApiOperation({
    deprecated: true,
    summary: 'Replaced by findAllComplianceDefinitions',
    operationId: 'getAllComplianceDefinitions',
  })
  @Roles(...allRoles)
  @ApiQuery(bpcDecoratorOptions)
  @ApiResponse({
    status: 200,
    description: 'Returns all compliance definitions',
  })
  async getAllComplianceDefinitions(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    return await this.complianceService.findAll(req);
  }

  @Get('compliance/:name')
  @ApiOperation({
    summary: 'Get by name',
    operationId: 'GetComplianceDefinitionByName',
  })
  @Roles(...allRoles)
  @ApiParam({
    name: 'name',
    example: '{{test_compliance_definition_name}}',
    required: true,
    description: 'The name of compliance definition to return',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiResponse({
    status: 200,
    description: 'Returns all compliance definitions by name',
  })
  async getComplianceByName(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Param('name') name: string,
    @Query('bpc') bpc?: boolean,
  ) {
    return await this.complianceService.findOne(name, req, bpc);
  }

  @Get('compliance_definitions/:name')
  @ApiOperation({
    deprecated: true,
    summary: 'Replaced by getComplianceByName',
    operationId: 'GetComplianceDefinitionByName',
  })
  @Roles(...allRoles)
  @ApiParam({
    name: 'name',
    example: '{{test_compliance_definition_name}}',
    required: true,
    description: 'The name of compliance definition to return',
  })
  @ApiQuery(bpcDecoratorOptions)
  @ApiTags('Deprecated')
  @ApiResponse({
    status: 200,
    description: 'Returns all compliance definitions by name',
  })
  async findByName(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Param('name') name: string,
    @Query('bpc') bpc?: boolean,
  ) {
    return await this.complianceService.findOne(name, req, bpc);
  }

  @Patch('compliance/:name')
  @ApiOperation({
    summary: 'Update by name',
    operationId: 'UpdateComplianceDefinitionByName',
  })
  @Roles(...coldAdminOnly)
  @HttpCode(200)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: '{{test_compliance_definition_name}}',
  })
  updateComplianceByName(
    @Param('name') name: string,
    @Body(new ResourceValidationPipe(SurveyResponseSchema, 'PATCH')) compliance: Partial<ComplianceDefinition>,
    @Req()
    req: {
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.update(name, compliance as ComplianceDefinition, req);
  }

  @Patch('compliance_definitions/:name')
  @ApiTags('Deprecated')
  @ApiOperation({
    summary: 'Use compliance/frameworks/:name instead',
    operationId: 'UpdateComplianceDefinitionByName',
  })
  @Roles(...coldAdminOnly)
  @HttpCode(200)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: '{{test_compliance_definition_name}}',
  })
  update(
    @Param('name') name: string,
    @Body(new ResourceValidationPipe(SurveyResponseSchema, 'PATCH')) compliance: Partial<ComplianceDefinition>,
    @Req()
    req: {
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.update(name, compliance as ComplianceDefinition, req);
  }

  @Delete('compliance/:name')
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @HttpCode(204)
  @Roles(Role.ColdAdmin)
  deleteComplianceByName(
    @Param('name') name: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.remove(name, req);
  }

  @Delete('compliance_definitions/:name')
  @ApiOperation({
    summary: 'Use compliance/frameworks/:name instead',
    deprecated: true,
  })
  @ApiTags('Deprecated')
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @HttpCode(204)
  @Roles(Role.ColdAdmin)
  removeComplianceByName(
    @Param('name') name: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.remove(name, req);
  }

  /**
   * ORG SCOPED COMPLIANCE DEFINITION OPERATIONS
   */

  @Post('compliance_definitions/:name/organizations/:orgId')
  @ApiTags('Compliance')
  @ApiOperation({
    deprecated: true,
  })
  @HttpCode(201)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: `{{test_organization_id}}`,
  })
  @ApiBody({
    description: 'overrides the survey array in the compliance definition',
    required: true,
    type: 'object',
    examples: {
      'Surveys Override': {
        value: {
          surveys_override: ['survey_name_1', 'survey_name_2'],
        },
      },
    },
    schema: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  })
  @Roles(...allRoles)
  createOrganizationCompliance(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Req()
    req: {
      body: { surveys_override?: string[] };
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.createOrgCompliance(req, name, orgId);
  }

  @Put('compliance/:name/organizations/:orgId/activate')
  @ApiOperation({
    summary: 'Activate Ai Automation For Compliance Set',
    operationId: 'ActivateOrganziationComplianceAutomation',
  })
  @Roles(...allRoles)
  @HttpCode(200)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: '{{test_compliance_definition_name}}',
  })
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  activateComplianceForOrgByName(
    @Param('name') name: string,
    @Param('orgId') orgId: string,
    @Req()
    req: {
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.activate(orgId, req, name);
  }

  @Delete('compliance_definitions/:name/organizations/:orgId')
  @ApiOperation({
    deprecated: true,
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: `{{test_organization_id}}`,
  })
  @HttpCode(204)
  @Roles(Role.ColdAdmin)
  @ApiTags('Organizations')
  deleteOrgComplianceByName(
    @Param('name') name: string,
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.deactivate(name, orgId, req);
  }

  @Patch('compliance_definitions/:name/organizations/:orgId')
  @ApiTags('Organizations')
  @ApiOperation({
    deprecated: true,
  })
  @HttpCode(201)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiBody({
    description: 'overrides the survey array in the compliance definition',
    required: true,
    type: 'object',
    examples: {
      'Surveys Override': {
        value: {
          surveys_override: ['survey_name_1', 'survey_name_2'],
        },
      },
    },
    isArray: true,
  })
  @Roles(...allRoles)
  upsertCompliance(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Req()
    req: {
      body: { surveys_override?: string[] };
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.createOrgCompliance(req, name, orgId);
  }

  @Get('compliance_definitions/organizations/:orgId')
  @ApiTags('Organizations')
  @ApiOperation({
    deprecated: true,
  })
  @Roles(...allRoles)
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all activated compliances for an organization',
  })
  async getComp(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Query('bpc') bpc?: boolean,
  ) {
    return await this.complianceService.findOrgCompliances(req, bpc);
  }

  @Delete('compliance_definitions/:name/organizations/:orgId')
  @ApiTags('Organizations')
  @ApiOperation({
    deprecated: true,
  })
  @HttpCode(204)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiQuery(bpcDecoratorOptions)
  @Roles(...allRoles)
  deactivate(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Query('bpc') bpc?: boolean,
  ) {
    return this.complianceService.deactivate(name, orgId, req, bpc);
  }

  // TODO DEPRECATE ALL THESE BELOW

  @Put('compliance_definitions/:name/organizations/:orgId')
  @ApiTags('Organizations')
  @ApiOperation({
    deprecated: true,
  })
  @ApiOperation({
    summary: 'Activate Ai Automation For Compliance Set',
    operationId: 'ActivateOrganziationComplianceAutomation',
  })
  @Roles(...allRoles)
  @HttpCode(200)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  activate(
    @Param('name') name: string,
    @Param('orgId') orgId: string,
    @Req()
    req: {
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.activate(orgId, req, name);
  }

  @Delete('compliance_definitions/:name/organizations/:orgId')
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @HttpCode(204)
  @Roles(Role.ColdAdmin)
  deleteOrgCompliance(
    @Param('name') name: string,
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.deactivate(name, orgId, req);
  }

  //TODO: Deprecated
  @Post('compliance_definitions/:name/organizations/:orgId')
  @HttpCode(201)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiBody({
    description: 'overrides the survey array in the compliance definition',
    required: true,
    type: 'object',
    examples: {
      'Surveys Override': {
        value: {
          surveys_override: ['survey_name_1', 'survey_name_2'],
        },
      },
    },
    schema: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  })
  @Roles(...allRoles)
  createOrgCompliance(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Req()
    req: {
      body: { surveys_override?: string[] };
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.createOrgCompliance(req, name, orgId);
  }

  @Patch('compliance_definitions/:name/organizations/:orgId')
  @HttpCode(201)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiBody({
    description: 'overrides the survey array in the compliance definition',
    required: true,
    type: 'object',
    examples: {
      'Surveys Override': {
        value: {
          surveys_override: ['survey_name_1', 'survey_name_2'],
        },
      },
    },
    isArray: true,
  })
  @Roles(...allRoles)
  upsertOrgCompliance(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Req()
    req: {
      body: { surveys_override?: string[] };
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.createOrgCompliance(req, name, orgId);
  }

  @Get('compliance_definitions/organizations/:orgId')
  @Roles(...allRoles)
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all activated compliances for an organization',
  })
  async getOrgComp(
    @Param('orgId') orgId: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Query('bpc') bpc?: boolean,
  ) {
    return await this.complianceService.findOrgCompliances(req, bpc);
  }

  @Delete('compliance_definitions/:name/organizations/:orgId')
  @HttpCode(204)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: 'b_corp_2024',
  })
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @ApiQuery(bpcDecoratorOptions)
  @Roles(...allRoles)
  deactivateCompliance(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Query('bpc') bpc?: boolean,
  ) {
    return this.complianceService.deactivate(name, orgId, req, bpc);
  }
}
