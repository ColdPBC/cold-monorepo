import { Module } from '@nestjs/common';
import { MaterialsModule } from './materials/materials.module';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { BullModule } from '@nestjs/bull';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'openai:materials',
			settings: {
				stalledInterval: 3600000,
				maxStalledCount: 120,
			},
		}),
		BullModule.registerQueue({
			name: 'openai:products',
			settings: {
				stalledInterval: 3600000,
				maxStalledCount: 120,
			},
		}),
		BullModule.registerQueue({
			name: 'openai:suppliers',
			settings: {
				stalledInterval: 3600000,
				maxStalledCount: 120,
			},
		}),
		MaterialsModule,
		ProductsModule,
		SuppliersModule,
	],
	exports: [MaterialsModule, ProductsModule, ProductsModule],
})
export class EntitiesModule {}
