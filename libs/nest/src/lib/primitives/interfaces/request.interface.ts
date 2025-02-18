import { organizations } from '@prisma/client';
import { IAuthenticatedUser } from './user.interface';

//TODO: set type back to organizations when you find out why it's throwing
export interface IRequest {
	organization: any;
	user: IAuthenticatedUser;
	url?: string;
	method?: string;
	params?: any;
	query?: any;
	headers?: any;
	body?: any;
	metadata?: any;
	// Add other necessary fields
}
