import { Module } from '@nestjs/common';
import { OrgSurveysController } from './orgSurveys.controller';
import { OrgSurveysService } from './orgSurveys.service';

@Module({
  controllers: [OrgSurveysController],
  providers: [OrgSurveysService],
})
export class OrgSurveysModule {}
