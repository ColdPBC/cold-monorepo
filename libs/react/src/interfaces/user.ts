import { Role } from 'auth0';

export type UserRole = {
  name: string;
} & Role;
