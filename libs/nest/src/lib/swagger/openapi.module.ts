// noinspection JSVoidFunctionReturnValueUsed

import { INestApplication, Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { ConfigService } from '@nestjs/config';

@Module({})
export class OpenapiModule {
  static register(
    app: INestApplication,
    swaggerConfig: {
      title: string;
      tosUrl: string;
      description: string;
      version?: string;
    },
  ) {
    const config = new ConfigService();
    const customOptions = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setTermsOfService(swaggerConfig.tosUrl)
      .setDescription(swaggerConfig.description)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      .setVersion(swaggerConfig.version || process?.env?.npm_package_version || '0.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, customOptions, {
      deepScanRoutes: false,
    });

    patchNestjsSwagger();

    return {
      module: OpenapiModule,
      imports: [
        SwaggerModule.setup('/v1', app, document, {
          customfavIcon: join(__dirname, '../../../..', 'public/favicon.ico'), //adding our favicon to swagger
          customSiteTitle: swaggerConfig.title, //add site title to swagger for nice SEO
          customCss: `.topbar-wrapper img {content:url('https://cold-public-assets.s3.us-east-2.amazonaws.com/cold-climate-logo/white/Asset+4Logotype_Preferred.svg'); width:200px; height:auto;}
      .swagger-ui .opblock.opblock-get { border-color: #2892D7 } .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #2892D7 } .swagger-ui .swagger-container { background-color: #0A1C2B; } .swagger-ui .btn.authorize { color: #2892D7; border-color: #2892D7; } .swagger-ui .btn.authorize svg { fill: #2892D7; }`,
          yamlDocumentUrl: 'v1/yaml',
          jsonDocumentUrl: 'v1/json',
        }),
      ],
      exports: [SwaggerModule],
    };
  }
}
