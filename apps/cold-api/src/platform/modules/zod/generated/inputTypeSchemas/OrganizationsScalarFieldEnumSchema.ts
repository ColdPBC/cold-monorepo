import { z } from 'zod';

export const OrganizationsScalarFieldEnumSchema = z.enum(['id','name','enabled_connections','display_name','branding','phone','email','street_address','city','state','zip','created_at','updated_at','isTest']);

export default OrganizationsScalarFieldEnumSchema;
