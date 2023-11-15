import { Prisma } from '@prisma/client';

export class UpdateOrganizationsDto {
  name?: string;
  enabled_connections?: Prisma.InputJsonValue;
  display_name?: string;
  branding?: Prisma.InputJsonValue;
  phone?: string;
  email?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip?: string;
  created_at?: Date;
}
