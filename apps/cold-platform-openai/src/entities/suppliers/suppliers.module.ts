import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { BullModule } from '@nestjs/bull';

@Module({
	imports: [],
	providers: [SuppliersService],
})
export class SuppliersModule {}
