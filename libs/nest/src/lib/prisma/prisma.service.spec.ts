import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

// Keep unit tests independent of Datadog initialization, sockets, and filesystem metadata.
jest.mock('../worker', () => ({
	BaseWorker: class {
		appPackage = { name: 'cold-unit-tests' };
		logger = { log: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() };
		sendMetrics = jest.fn();
	},
	WorkerLogger: class {
		error = jest.fn();
	},
}));

describe('PrismaService', () => {
	let service: PrismaService;
	let module: TestingModule;
	const originalOptimizeKey = process.env.OPTIMIZE_API_KEY;
	const config = { internalConfig: { DATABASE_URL: 'postgresql://test:test@localhost:5432/unit_test' } };
	let connect: jest.SpyInstance;
	let disconnect: jest.SpyInstance;
	let on: jest.SpyInstance;

	beforeEach(async () => {
		jest.clearAllMocks();
		delete process.env.OPTIMIZE_API_KEY;
		connect = jest.spyOn(PrismaClient.prototype, '$connect').mockResolvedValue(undefined);
		disconnect = jest.spyOn(PrismaClient.prototype, '$disconnect').mockResolvedValue(undefined);
		on = jest.spyOn(PrismaClient.prototype, '$on').mockImplementation(function (this: PrismaClient) {
			return this;
		});
		module = await Test.createTestingModule({
			providers: [PrismaService, { provide: ConfigService, useValue: config }],
		}).compile();
		service = module.get(PrismaService);
	});

	afterEach(async () => {
		await module?.close();
		jest.restoreAllMocks();
		if (originalOptimizeKey === undefined) delete process.env.OPTIMIZE_API_KEY;
		else process.env.OPTIMIZE_API_KEY = originalOptimizeKey;
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('connects on initialization and registers error logging', async () => {
		await expect(service.onModuleInit()).resolves.toBe(service);
		expect(connect).toHaveBeenCalledTimes(1);
		expect(on).toHaveBeenCalledWith('error', expect.any(Function));
	});

	it('disconnects when the module is destroyed', async () => {
		await service.onModuleDestroy();
		expect(disconnect).toHaveBeenCalledTimes(1);
	});
});
