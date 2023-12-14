import { Module } from '@nestjs/common';
import { ClimatiqService } from './climatiq.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ClimatiqService],
})
export class ClimatiqModule {}
