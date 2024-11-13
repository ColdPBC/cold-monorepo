import { stringify } from 'safe-stable-stringify';
import { find, remove } from 'lodash';
import { Global } from '@nestjs/common';

@Global()
export class RedactorService {
	defaultPropList: Array<{ prop: string; leftPad: number; rightPad: number }> = [
		{ prop: 'auth0Client', leftPad: 5, rightPad: 5 },
		{ prop: 'client_id', leftPad: 5, rightPad: 5 },
		{ prop: 'client-id', leftPad: 4, rightPad: 5 },
		{ prop: 'clientId', leftPad: 4, rightPad: 5 },
		{ prop: 'client_secret', leftPad: 4, rightPad: 5 },
		{ prop: 'client-secret', leftPad: 4, rightPad: 5 },
		{ prop: 'clientSecret', leftPad: 4, rightPad: 5 },
		{ prop: 'client-token', leftPad: 4, rightPad: 5 },
		{ prop: 'client_token', leftPad: 4, rightPad: 5 },
		{ prop: 'clientToken', leftPad: 4, rightPad: 5 },
		{ prop: 'accessToken', leftPad: 4, rightPad: 5 },
		{ prop: 'access_token', leftPad: 4, rightPad: 5 },
		{ prop: 'access-token', leftPad: 4, rightPad: 5 },
		{ prop: 'refresh_token', leftPad: 4, rightPad: 5 },
		{ prop: 'refresh-token', leftPad: 4, rightPad: 5 },
		{ prop: 'refreshToken', leftPad: 4, rightPad: 5 },
		{ prop: 'api_key', leftPad: 0, rightPad: 4 },
		{ prop: 'api-key', leftPad: 4, rightPad: 4 },
		{ prop: 'apiKey', leftPad: 4, rightPad: 4 },
		{ prop: 'api-token', leftPad: 4, rightPad: 4 },
		{ prop: 'api_token', leftPad: 4, rightPad: 4 },
		{ prop: 'apiToken', leftPad: 4, rightPad: 4 },
		{ prop: 'token', leftPad: 4, rightPad: 4 },
		{ prop: 'authorization', leftPad: 10, rightPad: 4 },
		{ prop: 'secret', leftPad: 0, rightPad: 0 },
		{ prop: 'password', leftPad: 0, rightPad: 0 },
		{ prop: 'pass', leftPad: 0, rightPad: 0 },
		{ prop: 'pwd', leftPad: 0, rightPad: 0 },
		{ prop: 'images', leftPad: 0, rightPad: 0 },
		{ prop: 'url', leftPad: 10, rightPad: 0 },
	];
	left = 0;
	right = 0;

	constructor(propList?: { prop: string; rightPad: number; leftPad: number }[]) {
		if (propList) {
			this.addProperties(propList);
		}
	}

	setDefaultPadding(left?: number, right?: number): RedactorService {
		this.left = left && left > -1 ? Math.round(left) : 0;
		this.right = right && right > -1 ? Math.round(right) : 0;

		return this;
	}

	addProperties(
		properties:
			| Array<string>
			| Array<{
					prop: string;
					leftPad: number;
					rightPad: number;
			  }>,
	): RedactorService {
		if (!properties || !Array.isArray(properties)) {
			const error = new Error('Properties must be an array of strings or properties: {prop: string, leftPad: number, rightPad: number}');
			throw error;
		}

		for (const p of properties) {
			this.addProperty(p);
		}

		return this;
	}

	addProperty(property: string | { prop: string; leftPad: number; rightPad: number }): RedactorService {
		let hasit = false;

		if (typeof property === 'string' || typeof property === 'number') {
			const newProp = {
				prop: property.toString().toLowerCase(),
				leftPad: this.left,
				rightPad: this.right,
			};

			for (const item of this.defaultPropList) {
				if (item.prop == newProp.prop) {
					hasit = true;
				}
			}
			if (!hasit) {
				this.defaultPropList.push(newProp);
			}
		} else {
			if (Array.isArray(property)) {
				const error = new Error('array passed to addProperty(); use addProperties() instead');
				console.error({ message: error.message, property });

				throw error;
			} else if (!property.prop) {
				const error = new Error('invalid property passed to redactor');
				console.error({ message: error.message, property });

				throw error;
			}

			if (!find(this.defaultPropList, { prop: property.prop.toLowerCase() })) {
				this.defaultPropList.push(property);
			} else {
				remove(this.defaultPropList, { prop: property.prop.toLowerCase() });
				this.defaultPropList.push(property);
			}
		}

		return this;
	}

	isArray(property: any) {
		return Array.isArray(property);
	}

	isString(property: any): boolean {
		return typeof property === 'string' && !this.isArrayOrObject(property);
	}

	isArrayOrObject(property: any): boolean {
		return typeof property === 'object' || Array.isArray(property);
	}

	isObject(property: any): boolean {
		return typeof property === 'object' && !Array.isArray(property);
	}

	//redacts chars from single lined string that match
	redactProp(text: string, left?: number, right?: number): any {
		if (typeof text !== 'string') return text;

		const start = Math.floor(left && left > -1 ? left : this.left);
		const end = Math.floor(text.length - (start + (right && right > -1 ? right : this.right)));
		const pattern = new RegExp(`(.{${start}}).{${end}}`, 'ism');
		return text.replace(pattern, '$1####');
	}

	//searches through error message and stack and redacts their value
	redactError(err: Error): Error {
		err.message = this.redactProp(err.message);

		if (err.stack) err.stack = this.redactProp(err.stack);

		return err;
	}

	// Recursively search through objects and arrays for properties and redacts their value
	redact(data: any): any {
		let redactMe: any;
		let obj = Object.assign({}, data);

		try {
			if (!obj) obj = {};
			const str = stringify(obj);
			if (str === '{}') obj = JSON.parse(str);
			redactMe = obj;
		} catch (err) {
			// failed to parse object so just return what was passed in
			return obj;
		}

		for (const p in redactMe) {
			if (typeof obj === 'undefined') {
				return obj;
			}

			if (typeof obj === 'string') {
				return this.redactProp(obj);
			}

			if (!this.isObject(obj) && !Array.isArray(obj)) {
				throw new TypeError('A valid JSON object must be specified');
			}

			const prop = find(this.defaultPropList, { prop: p });
			if (prop) {
				redactMe[p] = this.redactProp(redactMe[p], prop.leftPad, prop.rightPad);
			}

			if (Array.isArray(redactMe[p])) {
				redactMe[p].forEach((value: any, index: number) => {
					if (this.isObject(value)) {
						redactMe[p][index] = this.redact(value);
					}
				});
			} else if (this.isObject(redactMe[p])) {
				redactMe[p] = this.redact(redactMe[p]);
			}
		}

		return redactMe;
	}
}
