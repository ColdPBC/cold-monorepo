import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '@coldpbc/nest';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { SurveysRabbitService } from './surveys.rabbit';
import { ScoringModule } from './scoring/scoring.module';
import { SurveyFilterService } from './filter/survey.filter.service';

@Module({
  controllers: [SurveysController, ScoringModule],
  providers: [SurveysService, JwtService, JwtStrategy, SurveysRabbitService, SurveyFilterService],
  exports: [SurveysService, JwtService, JwtStrategy, SurveysRabbitService],
  imports: [ScoringModule],
})
export class SurveysModule {}
