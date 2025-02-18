import { Module } from '@nestjs/common';
import { LinearController } from './linear.controller';
import { LinearService } from './linear.service';
import { LinearRabbitService } from './rabbit.service';

@Module({
	controllers: [LinearController],
	providers: [LinearService, LinearRabbitService],
	exports: [LinearService],
})
export class LinearModule {}
