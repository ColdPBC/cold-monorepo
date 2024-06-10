import { number } from 'zod';
import { Role } from '../../primitives';

export const allRoles = [Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember];
export const coldAdminOnly = [Role.ColdAdmin];
export const coldAndCompanyAdmins = [Role.ColdAdmin, Role.CompanyOwner, Role.CompanyAdmin];
export const companyRoles = [Role.CompanyOwner, Role.CompanyAdmin, Role.CompanyMember];

export const nameDecoratorOptions = {
  name: 'name',
  type: String,
  required: true,
  example: 'Test Name',
  description: 'Name of object',
};

export const userIdDecoratorOptions = {
  name: 'userId',
  type: String,
  required: true,
  example: '{{test_owner_id}}',
  description: 'User Id',
};

export const ownerIdDecoratorOptions = {
  name: 'userId',
  type: String,
  required: true,
  example: '{{test_owner_id}}',
  description: 'User Id',
};

export const memberIdDecoratorOptions = {
  name: 'userId',
  type: String,
  required: true,
  example: '{{test_member_id}}',
  description: 'User Id',
};

export const adminIdDecoratorOptions = {
  name: 'userId',
  type: String,
  required: true,
  example: '{{test_admin_id}}',
  description: 'User Id',
};

export const roleNameDecoratorOptions = {
  name: 'roleName',
  type: String,
  required: true,
  description: 'Role Name e.g. `company:owner`',
};

export const impersonateOrgDecoratorOptions = {
  name: 'impersonateOrg',
  required: false,
  deprecated: true,
  description: 'Impersonate an organization',
};

export const orgIdDecoratorOptions = {
  name: 'orgId',
  type: String,
  example: `{{test_org_id}}`,
  required: true,
  description: 'Id of the Organization',
};

export const bpcDecoratorOptions = {
  name: 'bpc',
  type: Boolean,
  required: false,
  description: 'Bypass Cache',
};

export const invIdDecoratorOptions = {
  name: 'invId',
  type: String,
  required: true,
  description: 'Id of the invitation',
};

export const takeDecoratorOptions = {
  name: 'take',
  type: number,
  required: false,
  description: 'Number of records to return',
};

export const skipDecoratorOptions = {
  name: 'skip',
  type: number,
  required: false,
  description: 'Number of records to skip',
};
