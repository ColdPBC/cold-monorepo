import { Module } from '@nestjs/common';
import { NestModule } from '@coldpbc/nest';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({})
export class AppModule {
	static async forRootAsync() {
		return {
			module: AppModule,
			imports: [
				await NestModule.forRootAsync({
					disableHotShots: true,
					disableDDTrace: true,
					disableHealthModule: false,
					disableAuthorizationModule: true,
					disablePrismaModule: false,
					disableInterceptorModule: false,
					disableRabbitModule: true,
					disableDarklyModule: true,
					disableBullModule: true,
					disableS3Module: true,
					disableSMModule: true,
					disableMqttModule: true,
					disableComplianceDataModule: true,
				}),
			],
			providers: [AppService],
			exports: [],
			controllers: [AppController],
		};
	}
}
