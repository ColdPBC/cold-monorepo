import { Module } from '@nestjs/common';
import { DarklyService } from './darkly.service';

@Module({
  providers: [DarklyService],
})
export class DarklyModule {}
