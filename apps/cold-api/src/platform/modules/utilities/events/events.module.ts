import { Global, Module } from '@nestjs/common';
import { ColdRabbitService } from '@coldpbc/nest';
import { EventService } from './event.service';

@Global()
@Module({})
export class EventsModule {
	static async forRootAsync() {
		return {
			module: EventsModule,
			imports: [],
			providers: [ColdRabbitService, EventService],
			exports: [ColdRabbitService, EventService],
		};
	}
}
