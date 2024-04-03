import { Module } from '@nestjs/common';
import { FreeplayService } from './freeplay.service';

@Module({
  providers: [FreeplayService],
  exports: [FreeplayService],
})
export class FreeplayModule {}
