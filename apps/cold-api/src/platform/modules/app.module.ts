import { Module } from '@nestjs/common';
import { NestModule, PrismaModule } from '@coldpbc/nest';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Auth0Module } from './resources/auth0/auth0.module';
import { ComponentDefinitionsModule } from './resources/component-definitions/component-definitions.module';
import { PolicyDefinitionsModule } from './resources/policies/policy-definitions.module';
import { SurveysModule } from './resources/surveys/surveys.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { NewsModule } from './resources/news/news.module';
import { ActionsModule } from './resources/actions/actions.module';

@Module({})
export class AppModule {
  static async forRootAsync() {
    return {
      module: AppModule,
      imports: [
        await NestModule.forRootAsync(),
        ServeStaticModule.forRoot({
          serveStaticOptions: {
            index: false,
            fallthrough: true,
          },
          serveRoot: '../../../assets',
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
    };
  }
}
