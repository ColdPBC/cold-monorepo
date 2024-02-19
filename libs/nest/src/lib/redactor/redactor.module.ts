import { Global, Module } from '@nestjs/common';

import { RedactorService } from './redactor.service';

@Global()
@Module({
  providers: [RedactorService],
  exports: [RedactorService],
})
export class RedactorModule {}
