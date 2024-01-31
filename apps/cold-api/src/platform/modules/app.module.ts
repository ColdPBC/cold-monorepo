import { Module } from '@nestjs/common';
import { ColdRabbitModule, NestModule, OrgUserInterceptor } from '@coldpbc/nest';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Auth0Module } from './resources/auth0/auth0.module';
import { ComponentDefinitionsModule } from './resources/component-definitions/component-definitions.module';
import { PolicyDefinitionsModule } from './resources/policies/policy-definitions.module';
import { SurveysModule } from './resources/surveys/surveys.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { NewsModule } from './resources/news/news.module';
import { ActionsModule } from './resources/actions/actions.module';
import { ConfigModule } from '@nestjs/config';
import { IntegrationsModule } from './resources/integrations/integrations.module';
import { Service_definitionsModule } from './resources/service_definitions/service_definitions.module';
import { OrganizationLocationsModule } from './resources/organization_locations/organization_locations.module';
import { ComplianceDefinitionModule } from './resources/compliance_definitions/compliance_definition.module';
import { BroadcastEventService } from '../utilities/events/broadcast.event.service';

@Module({})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        ColdRabbitModule.forFeature(),
        await NestModule.forRootAsync(1, 'cold-api-uploaded-files'),
        ServeStaticModule.forRoot({
          serveStaticOptions: {
            index: false,
            fallthrough: true,
          },
          serveRoot: '../../../assets',
        }),
        Service_definitionsModule,
        Auth0Module,
        ComponentDefinitionsModule,
        PolicyDefinitionsModule,
        SurveysModule,
        CategoriesModule,
        NewsModule,
        ActionsModule,
        IntegrationsModule,
        OrganizationLocationsModule,
        ComplianceDefinitionModule,
      ],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: OrgUserInterceptor,
        },
        BroadcastEventService,
      ],
      exports: [BroadcastEventService],
    };
  }
}
