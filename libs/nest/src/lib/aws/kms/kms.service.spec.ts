import { Test, TestingModule } from '@nestjs/testing';
import { KmsService } from './kms.service';
import { ConfigService } from '@nestjs/config';
import { KMSClient, EncryptCommand, DecryptCommand } from '@aws-sdk/client-kms';

// Keep unit tests independent of Datadog initialization, sockets, and filesystem metadata.
jest.mock('../../worker', () => ({
	BaseWorker: class {
		appPackage = { name: 'cold-unit-tests' };
		logger = { log: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() };
		sendMetrics = jest.fn();
	},
	WorkerLogger: class {
		error = jest.fn();
	},
}));

describe('KmsService', () => {
	let service: KmsService;
	let module: TestingModule;
	const config = { get: jest.fn().mockReturnValue('test-key') };
	const send = jest.spyOn(KMSClient.prototype, 'send');

	beforeEach(async () => {
		jest.clearAllMocks();
		send.mockReset();
		module = await Test.createTestingModule({
			providers: [KmsService, { provide: ConfigService, useValue: config }],
		}).compile();
		service = module.get(KmsService);
	});

	afterEach(async () => {
		await module?.close();
	});

	afterAll(() => send.mockRestore());

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('encrypts with the configured key and returns base64 ciphertext', async () => {
		send.mockResolvedValueOnce({ CiphertextBlob: Buffer.from('ciphertext') } as never);
		await expect(service.encrypt('hello')).resolves.toBe(Buffer.from('ciphertext').toString('base64'));
		const command = send.mock.calls[0][0] as EncryptCommand;
		expect(command).toBeInstanceOf(EncryptCommand);
		expect(command.input).toEqual({ KeyId: 'test-key', Plaintext: Buffer.from('hello') });
	});

	it('decodes base64 ciphertext and returns decrypted UTF-8 text', async () => {
		send.mockResolvedValueOnce({ Plaintext: Buffer.from('hello') } as never);
		await expect(service.decrypt(Buffer.from('ciphertext').toString('base64'))).resolves.toBe('hello');
		const command = send.mock.calls[0][0] as DecryptCommand;
		expect(command).toBeInstanceOf(DecryptCommand);
		expect(command.input).toEqual({ CiphertextBlob: Buffer.from('ciphertext') });
	});

	it('rejects an encryption response without ciphertext', async () => {
		send.mockResolvedValueOnce({} as never);
		const errorLog = jest.spyOn(console, 'error').mockImplementation(() => undefined);
		try {
			await expect(service.encrypt('hello')).rejects.toThrow('Encryption failed: No CiphertextBlob returned');
		} finally {
			errorLog.mockRestore();
		}
	});
});
