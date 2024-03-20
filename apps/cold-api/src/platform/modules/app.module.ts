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
import { LocationsModule } from './resources/organizations/locations/locations.module';
import { ComplianceDefinitionModule } from './resources/compliance_definitions/compliance_definition.module';
import { OrganizationModule } from './resources/organizations/organization.module';
import { EventsModule } from './utilities/events/events.module';

@Module({})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [
        await NestModule.forRootAsync(1, 'cold-api-uploaded-files'),
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
        LocationsModule,
        ComplianceDefinitionModule,
      ],
      providers: [],
      exports: [],
    };
  }
}
