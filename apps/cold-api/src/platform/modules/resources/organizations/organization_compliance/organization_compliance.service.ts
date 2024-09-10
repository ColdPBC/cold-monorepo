import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker, DarklyService, IRequest, MqttService, OrganizationComplianceRepository, PrismaService } from '@coldpbc/nest';
import { organization_compliance } from '@prisma/client';
import { EventService } from '../../../utilities/events/event.service';

@Injectable()
export class OrganizationComplianceService extends BaseWorker {
	constructor(
		readonly repository: OrganizationComplianceRepository,
		readonly darkly: DarklyService,
		readonly event: EventService,
		readonly mqtt: MqttService,
		readonly prisma: PrismaService,
	) {
		super(OrganizationComplianceService.name);
	}

	async activateAi(orgId: string, req: IRequest, compliance_name: string): Promise<any> {
		const { user, url, headers, organization } = req;

		const openAI_definition = await this.prisma.service_definitions.findFirst({
			where: {
				name: 'cold-platform-openai',
			},
		});

		if (!openAI_definition) {
			throw new NotFoundException(`Service cold-platform-openai not found`);
		}

		const compliance = await this.repository.getOrgComplianceByName(compliance_name, req.user, req.organization);

		if (!compliance) {
			throw new NotFoundException(`Compliance ${compliance_name} not found for org ${orgId}`);
		}

		await this.event.sendIntegrationEvent(
			false,
			'compliance_flow.enabled',
			{
				base_update_topic: `ui/${process.env.NODE_ENV}/${orgId}/${compliance_name}`,
				service: openAI_definition,
				compliance,
				organization,
				token: headers['authorization'].replace('Bearer ', ''),
			},
			user,
		);

		this.metrics.increment('cold.compliance.ai', 1, {
			event: 'activated',
			compliance: compliance_name,
			organization_id: organization.id,
			organization_name: organization.name,
			email: user.coldclimate_claims.email,
		});

		this.metrics.event(
			'Compliance AI Activated',
			`${user.coldclimate_claims.email} from ${organization.name} activated AI process for ${compliance_name}`,
			{
				alert_type: 'success',
				date_happened: new Date(),
				priority: 'normal',
			},
			{
				event: 'activated',
				compliance: compliance_name,
				organization_id: organization.id,
				organization_name: organization.name,
				email: user.coldclimate_claims.email,
			},
		);

		this.mqtt.publishMQTT('public', {
			swr_key: url,
			action: 'create',
			status: 'complete',
			data: {
				event: 'compliance_flow.enabled',
				base_update_topic: `ui/${process.env.NODE_ENV}/${orgId}/${compliance_name}`,
				service: openAI_definition,
			},
		});
	}
	create(name: string, organizationCompliance: organization_compliance, req: IRequest) {
		try {
			organizationCompliance.organization_id = req.organization.id;
			organizationCompliance.compliance_definition_name = name;

			return this.repository.createOrgCompliance(name, organizationCompliance, req.user, req.organization);
		} catch (error) {
			this.logger.error(`Error creating organization compliance`, { organizationCompliance, error });
			throw error;
		}
	}

	findAll(name: string, req: IRequest) {
		const { organization, user } = req;
		try {
			return this.repository.getOrgComplianceDefinitions(name, user, organization);
		} catch (error) {
			this.logger.error(`Error getting compliance definitions`, { organization, error, user });
			throw error;
		}
	}

	findOneByName(name: string, req: IRequest) {
		try {
			return this.repository.getOrgComplianceDefinitionByName(name, req.user, req.organization);
		} catch (error) {
			this.logger.error(`Error getting compliance definition`, { organization: req.organization, user: req.user, compliance: { name }, error });
			throw error;
		}
	}

	update(name: string, orgComplianceData: organization_compliance, req: IRequest) {
		try {
			orgComplianceData.compliance_definition_name = name;
			orgComplianceData.organization_id = req.organization.id;

			return this.repository.updateOrgComplianceDefinition(name, orgComplianceData, req.user, req.organization);
		} catch (error) {
			this.logger.error(`Error updating organization compliance definition`, { organization: req.organization, user: req.user, compliance: { name }, error });
			throw error;
		}
	}

	remove(name: string, req: IRequest) {
		try {
			return this.repository.deleteOrgComplianceDefinition(name, req.user, req.organization);
		} catch (error) {
			this.logger.error(`Error deleting organization compliance definition`, { organization: req.organization, user: req.user, compliance: { name }, error });
			throw error;
		}
	}
}
