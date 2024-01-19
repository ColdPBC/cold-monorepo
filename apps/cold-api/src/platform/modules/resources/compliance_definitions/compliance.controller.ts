import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { ResourceValidationPipe } from '../../../pipes/resource.pipe';
import { AuthenticatedUser, BaseWorker, HttpExceptionFilter, JwtAuthGuard, Role, Roles, RolesGuard, SurveyResponseSchema } from '@coldpbc/nest';
import { allRoles, bpcDecoratorOptions, coldAdminOnly } from '../_global/global.params';
import { ComplianceDefinitionService } from './compliance_definition.service';
import { ComplianceDefinition, ComplianceDefinitionSchema } from './schemas/compliance_definition_schema';

//import { UpdateSurveyDefinitionDto } from './dto/update-survey-definition.dto';

@Span()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter(ComplianceController.name))
@ApiOAuth2(['openid'])
@ApiTags('Compliance Definitions')
@Controller('compliance_definitions')
export class ComplianceController extends BaseWorker {
  constructor(private readonly complianceService: ComplianceDefinitionService) {
    super(ComplianceController.name);
  }

  @Post()
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
    @Body(new ResourceValidationPipe(ComplianceDefinitionSchema, 'POST')) definition: ComplianceDefinition,
  ) {
    return this.complianceService.create(req.user, definition);
  }

  @Get()
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
      user: AuthenticatedUser;
    },
    @Query('bpc') bpc?: boolean,
  ) {
    return await this.complianceService.findAll(bpc);
  }

  /**
   * Get all compliance definitions by name
   */
  @Get(':name')
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
      user: AuthenticatedUser;
    },
    @Param('name') name: string,
    @Query('bpc') bpc?: boolean,
  ) {
    return await this.complianceService.findOne(name, req.user, bpc);
  }

  @ApiOperation({
    summary: 'Update by name',
    operationId: 'UpdateComplianceDefinitionByName',
  })
  @Patch(':name')
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
      user: AuthenticatedUser;
    },
  ) {
    return this.complianceService.update(name, compliance as ComplianceDefinition, req.user);
  }

  @Delete(':name')
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    example: '{{test_compliance_definition_name}}',
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
    return this.complianceService.remove(name, req.user);
  }
}
