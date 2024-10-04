import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { BullModule } from '@nestjs/bull';

@Module({
	imports: [],
	providers: [MaterialsService],
})
export class MaterialsModule {}
