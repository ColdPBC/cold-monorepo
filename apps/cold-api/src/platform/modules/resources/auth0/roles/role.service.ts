import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Span } from 'nestjs-ddtrace';
import { Auth0TokenService, BaseWorker, MqttService } from '@coldpbc/nest';
import { filter, first } from 'lodash';
import { AxiosRequestConfig } from 'axios';

@Span()
@Injectable()
export class RoleService extends BaseWorker {
	options: AxiosRequestConfig<any>;
	httpService: HttpService;

	constructor(readonly utilService: Auth0TokenService, readonly mqtt: MqttService) {
		super('Auth0OrganizationService');
		this.httpService = new HttpService();

		this.utilService.init();
	}

	async initialize() {
		this.logger.info('Checking Role Cache...');
		// cache known roles
		/*await this.cache.delete('roles');*/
		this.logger.info('Role Cache Cleared');
		const roles = ['cold:admin', 'company:admin', 'company:owner', 'company:member'];

		await Promise.all(
			roles.map(value => {
				return this.resolveRoleIdByName(value);
			}),
		);
	}

	async getRoles(filters?: { id?: string; name?: string }): Promise<any> {
		if (filters && !filters.id && !filters.name) {
			throw new Error(`If a filter is supplied it must specify either an id or name`);
		}

		this.options = await this.utilService.init();

		// check if all roles are cached
		/*let roles = await this.cache.get(`roles`);
		if (roles) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			return filters ? filter(roles, filters) : roles;
		}*/

		// get all roles from Auth0
		const roles = (await this.httpService.axiosRef.get(`/roles`, this.options)).data;

		// cache all roles
		//await this.cache.set('roles', roles, { ttl: 0, update: true });

		if (filters && roles) {
			// filter roles based on the filter passed in, and return the first result
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			const role = first(filter(roles, filters));

			// cache data based on the filter passed in
			/*	filters?.name
				? await this.cache.set(`roles:${filters?.name}`, role, {
						ttl: 0,
						update: true,
				  })
				: await this.cache.set(`roles:${filters?.id}`, role, {
						ttl: 0,
						update: true,
				  });
*/
			// return the filtered role
			return role;
		}

		// return all roles
		return roles;
	}

	/***
	 * Get Role by name or id
	 * @param nameOrId
	 */
	async getRole(nameOrId: string): Promise<any> {
		if (!nameOrId) throw new Error(`Role 'name' or 'id' is required`);

		/*const role; //= await this.cache.get(`roles:${nameOrId}`);
		 */
		//if (!role) {
		const filter = nameOrId.startsWith('rol_') ? { id: nameOrId } : { name: nameOrId };

		return this.getRoles(filter);
		//}

		//	return role;
	}

	/***
	 * Get Role ID By Role Name
	 */
	async resolveRoleIdByName(roleName: string): Promise<string> {
		if (Array.isArray(roleName)) {
			roleName = first(roleName);
		}

		/*	const cached: { id: string; name: string } | undefined = await this.cache.get(`roles:${roleName}`);

		if (cached) {
			return cached.id;
		}
*/
		const role = await this.getRoles({ name: roleName });

		return Array.isArray(role) ? first(role).id : role.id;
	}

	/***
	 * Get list of roles from Auth0
	 */
	async resolveRoleNameById(roleId: string): Promise<string | null> {
		if (Array.isArray(roleId)) {
			roleId = first(roleId);
		}

		/*const cached: { id: string; name: string } | undefined = await this.cache.get(`roles:${roleId}`);

		if (cached) {
			this.logger.info(`Returning cached role ${roleId}`, cached);
			return cached.name;
		}*/

		const filter = roleId.startsWith('rol_') ? { id: roleId } : { name: roleId };

		const role = await this.getRoles(filter);

		return role[0].name;
	}

	/***
	 * Convert array of role names to array of role ids
	 */
	async convertRoleNamesToIds(roleNames: string[]): Promise<string[]> {
		return Promise.all(
			roleNames.map(roleName => {
				if (roleName.startsWith('rol_')) return roleName;
				return this.resolveRoleIdByName(roleName);
			}),
		);
	}
}
