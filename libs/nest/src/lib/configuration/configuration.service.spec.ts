import { Test, TestingModule } from '@nestjs/testing';
import { S3ConfigurationService } from './configuration.service';
import { ConfigService } from '@nestjs/config';
import { fromSSO } from '@aws-sdk/credential-provider-sso';

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

jest.mock('@aws-sdk/credential-provider-sso', () => ({ fromSSO: jest.fn() }));
describe('S3ConfigurationService', () => {
	let service: S3ConfigurationService;
	let module: TestingModule;
	const originalEnv = process.env;
	const values = { AWS_REGION: 'us-west-2', AWS_ACCESS_KEY_ID: 'test-access', AWS_SECRET_ACCESS_KEY: 'test-secret', AWS_PROFILE: 'test-profile' };
	const config = { get: jest.fn((key: string, fallback?: string) => values[key] ?? fallback) };

	beforeEach(async () => {
		jest.clearAllMocks();
		process.env = { ...originalEnv };
		delete process.env.FLIGHTCONTROL;
		delete process.env.AWS_ACCESS_KEY_ID;
		delete process.env.AWS_SECRET_ACCESS_KEY;
		delete process.env.AWS_SESSION_TOKEN;
		module = await Test.createTestingModule({
			providers: [S3ConfigurationService, { provide: ConfigService, useValue: config }],
		}).compile();
		service = module.get(S3ConfigurationService);
	});

	afterEach(async () => {
		await module?.close();
		process.env = originalEnv;
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('uses configured credentials in Flightcontrol without invoking SSO', async () => {
		process.env.FLIGHTCONTROL = '1';
		process.env.AWS_ACCESS_KEY_ID = 'test-access';
		process.env.AWS_SECRET_ACCESS_KEY = 'test-secret';
		await expect(service.getAWSCredentials()).resolves.toEqual({
			region: 'us-west-2',
			credentials: { accessKeyId: 'test-access', secretAccessKey: 'test-secret' },
		});
		expect(fromSSO).not.toHaveBeenCalled();
	});

	it('loads the configured SSO profile and exposes its session credentials', async () => {
		const credentials = { accessKeyId: 'sso-access', secretAccessKey: 'sso-secret', sessionToken: 'sso-session' };
		jest.mocked(fromSSO).mockReturnValue(jest.fn().mockResolvedValue(credentials));
		await expect(service.getAWSCredentials()).resolves.toEqual({ region: 'us-west-2', ...credentials });
		expect(fromSSO).toHaveBeenCalledWith({ profile: 'test-profile' });
		expect(process.env.AWS_ACCESS_KEY_ID).toBe('sso-access');
		expect(process.env.AWS_SECRET_ACCESS_KEY).toBe('sso-secret');
		expect(process.env.AWS_SESSION_TOKEN).toBe('sso-session');
	});
});
