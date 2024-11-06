import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { filter, first } from 'lodash';
import { Span } from 'nestjs-ddtrace';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { BaseWorker } from '../../worker';
import { CacheService } from '../../cache';
import { IAuthenticatedUser } from '../../primitives';
import { Organizations } from '../../../validation';
import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';

@Injectable()
@Span()
export class RolesGuard extends BaseWorker implements CanActivate {
	constructor(private reflector: Reflector, private readonly cache: CacheService) {
		super('RolesGuard');
	}

	async resolveRequest(request: any, user: IAuthenticatedUser, roles: Array<string>) {
		let isValid = false;
		let orgId: string | null = null;
		const isColdAdmin = user?.coldclimate_claims?.roles?.includes('cold:admin');

		const dd_user = {
			id: user?.sub,
			email: user?.coldclimate_claims?.email,
			org_id: user?.coldclimate_claims?.org_id,
		};

		this.tracer.setUser(dd_user);
		const tags = {
			action: 'resolveRequest',
			user: user.coldclimate_claims,
			required_roles: roles,
			url: request.url,
			method: request.method,
			query: request.query,
			params: request.params,
		};

		this.logger.setTags(tags);

		this.tracer.scope().active()?.addTags(tags);

		// check if user's role is allowed
		for (const role of roles) {
			if (user?.coldclimate_claims?.roles?.includes(role)) {
				isValid = true;
				break;
			} else {
				this.logger.warn(`${role} not found in ${user?.coldclimate_claims?.roles}`);
			}
		}

		if (!isValid) this.logger.warn(`None of the user's roles (${JSON.stringify(user?.coldclimate_claims?.roles)}) match the required roles (${roles})`);

		//Check for impersonation flag
		if (request?.query?.impersonateOrg) {
			if (isColdAdmin) {
				orgId = request?.query?.impersonateOrg;
			}
		} else if (request.params?.orgId && request?.params?.orgId.includes('org_')) {
			// Auth0 OrgId was passed on the url
			orgId = request.params.orgId;
		}

		// if no org id was passed in the orgId param or impersonate org, dig a little deeper
		if (!orgId) {
			// Check if organization is being requested by name, also check orgId in case they mistakenly passed in a name there
			if ((request?.params?.nameOrId || request?.params?.orgId) && !request?.params?.nameOrId?.includes('org_') && !request?.params?.orgId?.includes('org_')) {
				// either the nameOrId or orgId is populated however neither contain an Auth0 org ID so find the org by the name passed in
				const orgs = (await this.cache.get('organizations')) as Organizations[];
				// since org was requested by name get all orgs from cache and filter by name
				const org: any = first(
					filter(orgs, {
						name: request?.params?.nameOrId ? request?.params?.nameOrId : request?.params?.orgId,
					}),
				);

				if (!org) {
					this.logger.warn(`Unable to find cached org by name ${request?.params?.nameOrId | request?.params?.orgId}`);
				} else {
					//
					orgId = org?.id; //set org id to the ID of the org that matched by name
				}
			}
		}

		// if valid orgID was obtained, then verify that the user can query data for that org
		if (orgId && orgId !== user?.coldclimate_claims?.org_id) {
			// the user isn't authenticated to the requested org, check if they have the cold:admin role
			if (isColdAdmin) {
				// user is an admin, so just log a warning so the activity is visible
				this.logger.warn(`User: ${user?.coldclimate_claims?.email} is impersonating user for org: ${orgId}`);
				isValid = true; // user is good to go
			} else {
				// User is not allowed to query data related to this org
				this.logger.error(`User: ${user?.coldclimate_claims?.email} attempted to impersonate a user in another org: ${orgId}`);
				this.tracer.appsec.trackCustomEvent('invalid-impersonation-attempt', dd_user);

				throw new UnauthorizedException(`User: ${user?.coldclimate_claims?.email} attempted to impersonate a user in another org: ${orgId}`);
			}
		}

		// after all checks have completed render the final verdict
		if (!isValid) {
			this.tracer.appsec.trackCustomEvent('missing-role', dd_user);
			throw new UnauthorizedException('You do not have the correct role to access this resources');
		}

		return isValid;
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		// Do nothing if this is a RabbitMQ event
		if (isRabbitContext(context)) {
			return true;
		}

		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		this.tracer.setUser({
			id: user?.sub,
			email: user?.coldclimate_claims?.email,
			org_id: user?.coldclimate_claims?.org_id,
		});

		this.tracer.appsec.setUser({
			id: user?.sub,
			email: user?.coldclimate_claims?.email,
			org_id: user?.coldclimate_claims?.org_id,
		});

		this.tracer.setUser({
			id: user?.sub,
			email: user?.coldclimate_claims?.email,
			org_id: user?.coldclimate_claims?.org_id,
		});

		this.setTags({
			action: 'resolveRequest',
			user: user?.coldclimate_claims,
			required_roles: roles,
			url: request.url,
			method: request.method,
			query: request.query,
			params: request.params,
		});

		if (!roles) {
			// this.logger.log(`no roles required for this route`);
			return true;
		}

		return this.resolveRequest(request, user, roles);
	}
}
