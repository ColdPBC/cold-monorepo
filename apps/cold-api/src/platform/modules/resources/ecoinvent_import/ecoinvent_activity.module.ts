import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EcoinventActivityController } from './ecoinvent_activity.controller';
import { EcoinventActivityProcessorService } from './ecoinvent_activity.processor.service';
import { EcoinventActivityService } from './ecoinvent_activity.service';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'ecoinvent:activity',
			settings: {
				retryProcessDelay: 60000,
				stalledInterval: 3600000,
				maxStalledCount: 120,
			},
		}),
	],
	controllers: [EcoinventActivityController],
	providers: [EcoinventActivityProcessorService, EcoinventActivityService],
})
export class EcoinventActivityModule {}
