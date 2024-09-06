import { Module } from '@nestjs/common';
import { NestModule } from '@coldpbc/nest';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Service_definitionsModule } from './resources/service_definitions/service_definitions.module';
import { Auth0Module } from './resources/auth0/auth0.module';
import { ComponentDefinitionsModule } from './resources/component-definitions/component-definitions.module';
import { Policy_definitionsModule } from './resources/policies/policy_definitions.module';
import { SurveysModule } from './resources/surveys/surveys.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { NewsModule } from './resources/news/news.module';
import { ActionsModule } from './resources/actions/actions.module';
import { IntegrationsModule } from './resources/integrations/integrations.module';
import { FacilitiesModule } from './resources/organizations/facilities/facilities.module';
import { ComplianceDefinitionModule } from './resources/compliance/compliance-definitions/compliance-definitions.module';
import { EventsModule } from './utilities/events/events.module';
import { OrganizationModule } from './resources/organizations/organization.module';
import { ComplianceSetModule } from './resources/compliance/compliance-set.module';
import { SustainabilityAttributesModule } from './resources/sustainability_attributes/sustainability_attributes.module';

@Module({})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [
        await NestModule.forRootAsync(),
        await EventsModule.forRootAsync(),
        ServeStaticModule.forRoot({
          serveStaticOptions: {
            index: false,
            fallthrough: true,
          },
          serveRoot: '../../../assets',
        }),
        OrganizationModule,
        Service_definitionsModule,
        Auth0Module,
        ComponentDefinitionsModule,
        Policy_definitionsModule,
        SurveysModule,
        CategoriesModule,
        NewsModule,
        ActionsModule,
        IntegrationsModule,
        FacilitiesModule,
        ComplianceDefinitionModule,
        ComplianceSetModule,
        SustainabilityAttributesModule,
      ],
      providers: [],
      exports: [],
    };
  }
}
