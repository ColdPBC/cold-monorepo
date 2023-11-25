import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { ActionsModule } from './resources/actions/actions.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { ComponentDefinitionsModule } from './resources/component-definitions/component-definitions.module';
import { NewsModule } from './resources/news/news.module';
import { PolicyDefinitionsModule } from './resources/policies/policy-definitions.module';
import { SurveysModule } from './resources/surveys/surveys.module';
import { Auth0Module } from './resources/auth0/auth0.module';
import { NestModule, PrismaModule } from 'nest';

@Module({
  imports: [
    NestModule,
    ServeStaticModule.forRoot({
      serveStaticOptions: {
        index: false,
        fallthrough: true,
      },
      serveRoot: '../../../public',
    }),
    PrismaModule,
    Auth0Module,
    ComponentDefinitionsModule,
    PolicyDefinitionsModule,
    SurveysModule,
    CategoriesModule,
    NewsModule,
    ActionsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
