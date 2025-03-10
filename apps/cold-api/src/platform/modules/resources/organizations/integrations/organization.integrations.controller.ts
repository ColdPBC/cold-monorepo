import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { bpcDecoratorOptions, coldAndCompanyAdmins, orgIdDecoratorOptions } from '../../_global/global.params';
import { BaseWorker, IRequest, JwtAuthGuard, OrgUserInterceptor, Roles, RolesGuard } from '@coldpbc/nest';
import { IntegrationBodySchema } from '../../integrations/examples/integration_examples';
import { OrganizationIntegrationsService } from './organization.integrations.service';

@Controller('organizations/:orgId')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(OrgUserInterceptor)
export class OrganizationIntegrationsController extends BaseWorker {
	constructor(private readonly orgIntegrationsService: OrganizationIntegrationsService) {
		super(OrganizationIntegrationsController.name);
	}

	@ApiOperation({
		summary: 'Get Organization Integrations',
		operationId: 'getOrganizationIntegrations',
	})
	@ApiTags('Organizations : Integrations')
	@ApiQuery(bpcDecoratorOptions)
	@ApiParam(orgIdDecoratorOptions)
	@Roles(...coldAndCompanyAdmins)
	@HttpCode(200)
	@Get('integrations')
	getOrganizationIntegrations(
		@Param('orgId') orgId: string,
		@Req()
		req: IRequest,
		@Query('bpc', new ParseBoolPipe({ optional: true })) bpc: boolean,
	) {
		if (!bpc) bpc = false;

		return this.orgIntegrationsService.getOrganizationIntegrations(req, orgId, bpc);
	}

	@ApiOperation({
		summary: 'Create Organization Integration',
		operationId: 'createOrganizationIntegration',
	})
	@ApiQuery(bpcDecoratorOptions)
	@ApiParam(orgIdDecoratorOptions)
	@ApiBody(IntegrationBodySchema)
	@Post('integrations')
	@HttpCode(201)
	createIntegration(
		@Param('orgId') orgId: string,
		@Req()
		req: IRequest,
		@Body()
		body: {
			organization_id: string;
			service_definition_id: string;
			metadata: any;
		},
	) {
		return this.orgIntegrationsService.createIntegration(req, orgId, body);
	}

	@ApiOperation({
		summary: 'Create Organization Integration',
		operationId: 'createOrganizationIntegration',
	})
	@ApiQuery(bpcDecoratorOptions)
	@ApiParam(orgIdDecoratorOptions)
	@ApiBody(IntegrationBodySchema)
	@Put('integrations')
	@HttpCode(201)
	activateIntegration(
		@Param('orgId') orgId: string,
		@Req()
		req: IRequest,
		@Body()
		body: {
			organization_id: string;
			service_definition_id: string;
			metadata: any;
		},
	) {
		return this.orgIntegrationsService.enableIntegration(req, orgId, body);
	}

	@ApiOperation({
		summary: 'Create Organization Integration',
		operationId: 'createOrganizationIntegration',
	})
	@ApiQuery(bpcDecoratorOptions)
	@ApiParam(orgIdDecoratorOptions)
	@ApiBody(IntegrationBodySchema)
	@Put('backbone')
	@HttpCode(201)
	triggerIntegration(
		@Param('orgId') orgId: string,
		@Query('skip', new ParseIntPipe({ optional: true })) skip: number,
		@Query('limit', new ParseIntPipe({ optional: true })) limit: number,
		@Req()
		req: IRequest,
		@Body()
		body: {
			api_key: string;
		},
	) {
		return this.orgIntegrationsService.triggerIntegration(req, orgId, body, skip, limit);
	}

	@ApiOperation({
		summary: 'Create Organization Facility Integration',
		operationId: 'createFacilityIntegration',
	})
	@ApiQuery(bpcDecoratorOptions)
	@ApiParam(orgIdDecoratorOptions)
	@ApiBody(IntegrationBodySchema)
	@Post('facilities/:facId/integrations')
	@HttpCode(201)
	createFacilityIntegration(
		@Param('orgId') orgId: string,
		@Param('facId') facId: string,
		@Req()
		req: IRequest,
		@Body()
		body: {
			organization_id: string;
			service_definition_id: string;
			metadata: any;
		},
	) {
		return this.orgIntegrationsService.createFacilityIntegration(req, orgId, facId, body);
	}
}
