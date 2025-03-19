import { Module } from '@nestjs/common';
import { EcoinventImportService } from './ecoinvent_import.service';
import { EcoinventImportController } from './ecoinvent_import.controller';
import { EcoinventImportProcessorService } from './ecoinvent_import.processor.service';
import { BullModule } from '@nestjs/bull';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'ecoinvent:import',
			settings: {
				stalledInterval: 3600000,
				maxStalledCount: 120,
			},
		}),
	],
	controllers: [EcoinventImportController],
	providers: [EcoinventImportService, EcoinventImportProcessorService],
})
export class EcoinventImportModule {}
