import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseWorker, DarklyService, MqttService, OrganizationComplianceRepository, PrismaService } from '@coldpbc/nest';
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

  async activateAi(orgId: string, req: any, compliance_name: string): Promise<any> {
    const { user, url, headers } = req;

    const openAI_definition = await this.prisma.service_definitions.findFirst({
      where: {
        name: 'cold-platform-openai',
      },
    });

    if (!openAI_definition) {
      throw new NotFoundException(`Service cold-platform-openai not found`);
    }

    const useComplianceFlow = await this.darkly.getBooleanFlag('dynamic-enable-compliance-flow', false, {
      kind: 'org-compliance-set',
      key: orgId,
      name: compliance_name,
    });

    if (useComplianceFlow) {
      // try the new way first....

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
          token: headers['authorization'].replace('Bearer ', ''),
        },
        user,
        orgId,
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
    } else {
      const compliance_definition = await this.prisma.compliance_definitions.findFirst({
        where: {
          name: compliance_name,
        },
      });

      if (!compliance_definition) {
        throw new NotFoundException(`Compliance definition ${compliance_name} not found`);
      }

      // then try the old way
      const compliance = await this.prisma.organization_compliances_old.findFirst({
        where: {
          organization_id: orgId,
          compliance_id: compliance_definition.id,
        },
        include: {
          compliance_definition: true,
        },
      });

      if (!compliance) {
        throw new NotFoundException(`Compliance ${compliance_name} not found for org ${orgId}`);
      }

      let surveyNames: string[];
      if (Array.isArray(compliance.surveys_override) && compliance.surveys_override.length > 0) {
        surveyNames = compliance.surveys_override as string[];
      } else {
        surveyNames = compliance.compliance_definition.surveys as string[];
      }

      const surveys: any[] = [];

      for (const name of surveyNames) {
        const survey = await this.prisma.survey_definitions.findFirst({
          where: {
            name: name,
          },
        });
        if (survey) {
          surveys.push(survey);
        } else {
          this.logger.error(`Survey ${name} referenced in ${Array.isArray(compliance.surveys_override) ? 'surveys_override' : 'surveys'} array not found for ${compliance_name}`);
          throw new NotFoundException(
            `Survey ${name} referenced in ${Array.isArray(compliance.surveys_override) ? 'surveys_override' : 'surveys'} array not found for ${compliance_name}`,
          );
        }
      }

      await this.event.sendIntegrationEvent(
        false,
        'compliance_automation.enabled',
        {
          on_update_url: `/organizations/${orgId}/surveys/${compliance_name}`,
          surveys,
          service: openAI_definition,
          compliance,
        },
        user,
        orgId,
      );

      this.mqtt.publishMQTT('public', {
        swr_key: url,
        action: 'create',
        status: 'complete',
        data: {
          compliance,
        },
      });
    }
  }
  create(name: string, organizationCompliance: organization_compliance, req: any) {
    try {
      organizationCompliance.organization_id = req.organization.id;
      organizationCompliance.compliance_definition_name = name;

      return this.repository.createOrgCompliance(name, organizationCompliance, req.user, req.organization);
    } catch (error) {
      this.logger.error(`Error creating organization compliance`, { organizationCompliance, error });
      throw error;
    }
  }

  findAll(name: string, req: any) {
    const { organization, user } = req;
    try {
      return this.repository.getOrgComplianceDefinitions(name, organization, user);
    } catch (error) {
      this.logger.error(`Error getting compliance definitions`, { organization, error, user });
      throw error;
    }
  }

  findOneByName(name: string, req: any) {
    try {
      return this.repository.getOrgComplianceDefinitionByName(name, req.user, req.organization);
    } catch (error) {
      this.logger.error(`Error getting compliance definition`, { organization: req.organization, user: req.user, compliance: { name }, error });
      throw error;
    }
  }

  update(name: string, orgComplianceData: organization_compliance, req: any) {
    try {
      orgComplianceData.compliance_definition_name = name;
      orgComplianceData.organization_id = req.organization.id;

      return this.repository.updateOrgComplianceDefinition(name, orgComplianceData, req.user, req.organization);
    } catch (error) {
      this.logger.error(`Error updating organization compliance definition`, { organization: req.organization, user: req.user, compliance: { name }, error });
      throw error;
    }
  }

  remove(name: string, req: any) {
    try {
      return this.repository.deleteOrgComplianceDefinition(name, req.user, req.organization);
    } catch (error) {
      this.logger.error(`Error deleting organization compliance definition`, { organization: req.organization, user: req.user, compliance: { name }, error });
      throw error;
    }
  }
}
