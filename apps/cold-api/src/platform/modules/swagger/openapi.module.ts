// noinspection JSVoidFunctionReturnValueUsed

import { INestApplication, Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';

@Module({})
export class OpenapiModule {
  static register(app: INestApplication) {
    const config = new ConfigService();
    const customOptions = new DocumentBuilder()
      .setTitle('V1 REST API')
      .setTermsOfService('http://www.coldclimate.com/tos')
      .addServer(`https://api.coldclimate.com/v1`, 'Production Server')
      .addServer(`https://api.coldclimate.online/v1`, 'Staging Server')
      .addOAuth2({
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: `https://${config.getOrThrow('AUTH0_DOMAIN')}/authorize?audience=${config.getOrThrow('AUTH0_AUDIENCE')}`,
            scopes: {
              all: 'openid profile email',
            },
          },
        },
      })
      .setDescription('🌱 This is a restful api for the cold platform 🌱 ')
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      .setVersion(process?.env?.npm_package_version || '0.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, customOptions, {
      deepScanRoutes: true,
    });

    patchNestjsSwagger();

    return {
      module: OpenapiModule,
      imports: [
        SwaggerModule.setup('/v1', app, document, {
          customfavIcon: join(__dirname, '../../../..', 'public/favicon.ico'), //adding our favicon to swagger
          customSiteTitle: 'Cold Climate Platform API', //add site title to swagger for nice SEO
          customCss: `.topbar-wrapper img {content:url('https://cold-public-assets.s3.us-east-2.amazonaws.com/cold-climate-logo/white/Asset+4Logotype_Preferred.svg'); width:200px; height:auto;}
      .swagger-ui .opblock.opblock-get { border-color: #2892D7 } .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #2892D7 } .swagger-ui .swagger-container { background-color: #0A1C2B; } .swagger-ui .btn.authorize { color: #2892D7; border-color: #2892D7; } .swagger-ui .btn.authorize svg { fill: #2892D7; }`,
          swaggerOptions: {
            oauth2RedirectUrl: `${config.getOrThrow('API_SERVER_URL')}/oauth2-redirect.html`,
            oauth: {
              clientId: config.getOrThrow('AUTH0_CLIENT_ID') || '',
            },
          },
        }),
      ],
      exports: [SwaggerModule],
    };
  }
}
