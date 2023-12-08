import { Module } from '@nestjs/common';
import { DarklyService } from './darkly.service';

@Module({
  providers: [DarklyService],
  exports: [DarklyService],
})
export class DarklyModule {}
