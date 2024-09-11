import { init, isCuid } from '@paralleldrive/cuid2';
import { GuidPrefixes } from './compliance.enums';

/**
 * CUID2 class!
 */
export class Cuid2Generator {
	createId: any;
	id: string;
	prefix: GuidPrefixes | string;
	scopedId: string;
	private static prefix: GuidPrefixes;
	private static id: string;

	constructor(prefix: GuidPrefixes) {
		this.createId = init({
			length: 24,
		});
		this.id = this.createId();
		this.prefix = prefix;
		this.scopedId = `${this.prefix}_${this.id}`;
		return this;
	}

	static getProvider(prefix: GuidPrefixes) {
		const cuid2 = new Cuid2Generator(prefix);

		return {
			provide: 'Cuid2Generator',
			useExisting: prefix ? (this.prefix = prefix) : cuid2,
		};
	}

	/**
	 * Generate a new cuid2
	 * @param prefix - Optional scope prefix to prepend to the generated id
	 */
	generate(prefix?: string) {
		this.prefix = prefix ? prefix : this.prefix;

		this.id = this.createId();
		this.scopedId = `${this.prefix}_${this.id}`;
		return this;
	}

	/**
	 * Check if a string is a cuid2
	 * @param id
	 */
	static isColdCuid2(id: string) {
		let isColdScoped = false;

		for (const guidPrefixesKey in GuidPrefixes) {
			// @ts-expect-error it's fine...
			isColdScoped = id.startsWith(`${GuidPrefixes[guidPrefixesKey]}_`);
			if (isColdScoped) {
				break;
			}
		}

		const idParts = id.split('_');
		console.log('pfx', idParts[0]);
		console.log('id', idParts[1]);
		const isCUID = id.split('_').length == 16 || isCuid(idParts[1]);

		return isColdScoped && isCUID;
	}

	/**
	 * Check if a string is a cuid2
	 * @param id
	 */
	static isCUID2(id: string) {
		return isCuid(id);
	}
}
