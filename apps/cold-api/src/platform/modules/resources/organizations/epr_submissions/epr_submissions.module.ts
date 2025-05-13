import { Module } from '@nestjs/common';
import { EprSubmissionsController } from './epr_submissions.controller';
import { EprSubmissionsService } from './epr_submissions.service';

@Module({
  controllers: [EprSubmissionsController],
  providers: [EprSubmissionsService]
})
export class EprSubmissionsModule {}
