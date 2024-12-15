import { Injectable } from '@nestjs/common';
import { KMSClient, EncryptCommand, DecryptCommand } from '@aws-sdk/client-kms';
import { BaseWorker } from '../../worker';
import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import process from 'process';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KmsService extends BaseWorker {
	private kmsClient: KMSClient;
	private keyId: string;

	constructor(readonly config: ConfigService) {
		super(KmsService.name);
		this.kmsClient = new KMSClient({ region: process.env['AWS_REGION'] || 'us-east-1' });

		const parts = this.appPackage.name.split('-');
		const type = parts.length > 2 ? parts[1] : 'core';

		this.keyId = this.config.get(`KMS_KEY_ID`) || '';

		if (!this.keyId) {
			this.logger.warn('KMS Key ID not set');
		}
		//this.kmsClient.this.keyId = keyId;
	}

	/**
	 * Encrypt a plain text string
	 * @param plainText - The string to encrypt
	 * @returns A base64-encoded encrypted string
	 */
	async encrypt(plainText: string): Promise<string> {
		try {
			const command = new EncryptCommand({
				KeyId: this.keyId,
				Plaintext: Buffer.from(plainText),
			});
			const response = await this.kmsClient.send(command);
			if (response.CiphertextBlob) {
				return Buffer.from(response.CiphertextBlob).toString('base64');
			}
			throw new Error('Encryption failed: No CiphertextBlob returned');
		} catch (error) {
			console.error('Encryption error:', error);
			throw error;
		}
	}

	/**
	 * Decrypt an encrypted string
	 * @param encryptedText - The base64-encoded encrypted string
	 * @returns The decrypted plain text string
	 */
	async decrypt(encryptedText: string): Promise<string> {
		try {
			const command = new DecryptCommand({
				CiphertextBlob: Buffer.from(encryptedText, 'base64'),
			});
			const response = await this.kmsClient.send(command);
			if (response.Plaintext) {
				return Buffer.from(response.Plaintext).toString('utf-8');
			}
			throw new Error('Decryption failed: No Plaintext returned');
		} catch (error) {
			console.error('Decryption error:', error);
			throw error;
		}
	}
}
