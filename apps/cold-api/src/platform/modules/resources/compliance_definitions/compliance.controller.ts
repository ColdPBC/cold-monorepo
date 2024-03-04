import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { ResourceValidationPipe } from '../../../pipes/resource.pipe';
import { BaseWorker, HttpExceptionFilter, IAuthenticatedUser, JwtAuthGuard, Role, Roles, RolesGuard, SurveyResponseSchema } from '@coldpbc/nest';
import { allRoles, bpcDecoratorOptions, coldAdminOnly } from '../_global/global.params';
import { ComplianceDefinitionService } from './compliance_definition.service';
import { ComplianceDefinition, ComplianceDefinitionSchema } from './compliance_definition_schema';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(ComplianceController.name))
@ApiOAuth2(['openid'])
@ApiTags('Compliance Definitions')
@Controller()
export class ComplianceController extends BaseWorker {
  constructor(private readonly complianceService: ComplianceDefinitionService) {
    super(ComplianceController.name);
  }

  @Post('compliance_definitions')
  @HttpCode(201)
  @Roles(...coldAdminOnly)
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

  @Get('compliance_definitions')
  @Roles(...allRoles)
  @ApiQuery(bpcDecoratorOptions)
  @ApiResponse({
    status: 200,
    description: 'Returns all compliance definitions',
  })
  async findAll(
    @Req()
    req: {
      body: any;
      headers: any;
      query: any;
      user: IAuthenticatedUser;
    },
    @Query('bpc') bpc?: boolean,
  ) {
    return await this.complianceService.findAll(bpc);
  }

  /**
   * Get all compliance definitions by name
   */
  @Get('compliance_definitions/:name')
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
    description: 'Returns all compliance definitions by type',
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

  @ApiOperation({
    summary: 'Update by name',
    operationId: 'UpdateComplianceDefinitionByName',
  })
  @Patch('compliance_definitions/:name')
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

  @ApiOperation({
    summary: 'Activate Compliance Automation For Organization',
    operationId: 'ActivateOrganziationComplianceAutomation',
  })
  @Put('compliance_definitions/:name/organizations/:orgId')
  @Roles(...allRoles)
  @HttpCode(200)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: '{{compliance_definition_name}}',
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

  @Delete('compliance_definitions/:name')
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: '{{compliance_definition_name}}',
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
      user: IAuthenticatedUser;
    },
  ) {
    return this.complianceService.remove(name, req);
  }

  @Delete('compliance_definitions/:name/organizations/:orgId')
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: '{{compliance_definition_name}}',
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

  @Post('compliance_definitions/:name/organizations/:orgId')
  @HttpCode(201)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: '{{compliance_definition_name}}',
  })
  @ApiParam({
    name: 'orgId',
    required: true,
    type: 'string',
    example: '{{test_organization_id}}',
  })
  @Roles(...allRoles)
  createOrgCompliance(
    @Param('orgId') orgId: string,
    @Param('name') name: string,
    @Req()
    req: {
      body: any;
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
    return await this.complianceService.findOrgCompliances(req, orgId, bpc);
  }

  @Delete('compliance_definitions/:name/organizations/:orgId')
  @HttpCode(204)
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: '{{compliance_definition_name}}',
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
