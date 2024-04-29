import { organizations, Prisma } from '@prisma/client';

export class CreateOrganizationDto implements Partial<organizations> {
  branding?: Prisma.JsonObject;
  created_at?: Date;
  display_name: string;
  email?: string;
  name: string;
  phone?: string;
  website?: string;
  updated_at?: Date;
}
