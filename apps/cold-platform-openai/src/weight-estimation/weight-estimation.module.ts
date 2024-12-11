import { Module } from '@nestjs/common';
import { WeightEstimationController } from './weight-estimation.controller';
import { WeightEstimationService } from './weight-estimation.service';

@Module({
  controllers: [WeightEstimationController],
  providers: [WeightEstimationService],
  exports: [WeightEstimationService],
})
export class WeightEstimationModule {}
