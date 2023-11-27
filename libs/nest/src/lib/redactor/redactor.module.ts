import { Module } from '@nestjs/common';

import { RedactorService } from './redactor.service';

@Module({
  providers: [RedactorService],
  exports: [RedactorService],
})
export class RedactorModule {}
