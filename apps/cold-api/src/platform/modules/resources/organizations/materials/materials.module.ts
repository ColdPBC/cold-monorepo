import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { MaterialsRepository } from '@coldpbc/nest';

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService, MaterialsRepository],
})
export class MaterialsModule {}
