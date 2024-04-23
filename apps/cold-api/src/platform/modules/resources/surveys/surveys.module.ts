import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '@coldpbc/nest';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { SurveysRabbitService } from './surveys.rabbit';
import { ScoringModule } from './scoring/scoring.module';
import { SurveyFilterService } from './filter/survey.filter.service';
import { OrgSurveysModule } from '../organizations/surveys/orgSurveys.module';

@Module({
  imports: [ScoringModule, OrgSurveysModule],
  controllers: [SurveysController],
  providers: [SurveysService, JwtService, JwtStrategy, SurveysRabbitService, SurveyFilterService],
  exports: [SurveysService, JwtService, JwtStrategy, SurveysRabbitService],
})
export class SurveysModule {}
