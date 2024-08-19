import { organizations } from '@prisma/client';
import { IAuthenticatedUser } from './user.interface';

export interface IRequest {
  organization: organizations;
  user: IAuthenticatedUser;
  url?: string;
  method?: string;
  params?: any;
  query?: any;
  headers?: any;
  body?: any;
  // Add other necessary fields
}
