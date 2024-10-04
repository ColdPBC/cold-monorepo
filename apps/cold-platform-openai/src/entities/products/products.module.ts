import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { BullModule } from '@nestjs/bull';

@Module({
	imports: [],
	providers: [ProductsService],
})
export class ProductsModule {}
