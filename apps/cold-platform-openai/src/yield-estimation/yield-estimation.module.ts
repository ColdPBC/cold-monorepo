import { Module } from '@nestjs/common';
import { YieldEstimationController } from './yield-estimation.controller';
import { YieldEstimationService } from './yield-estimation.service';

@Module({
  controllers: [YieldEstimationController],
  providers: [YieldEstimationService],
  exports: [YieldEstimationService],
})
export class YieldEstimationModule {}
