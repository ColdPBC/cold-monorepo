import { Module } from '@nestjs/common';
import { FootprintsService } from './footprints.service';
import { FootprintsController } from './footprints.controller';

@Module({
  controllers: [FootprintsController],
  providers: [FootprintsService],
  exports: [FootprintsService],
})
export class FootprintsModule {}
