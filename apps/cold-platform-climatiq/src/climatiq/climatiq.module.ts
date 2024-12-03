import { Module } from '@nestjs/common';
import { ClimatiqService } from './climatiq.service';
import { HttpModule } from '@nestjs/axios';
import { ClimatiqController } from './climatiq.controller';

@Module({
	imports: [HttpModule],
	providers: [ClimatiqService],
	controllers: [ClimatiqController],
	exports: [ClimatiqService],
})
export class ClimatiqModule {}
