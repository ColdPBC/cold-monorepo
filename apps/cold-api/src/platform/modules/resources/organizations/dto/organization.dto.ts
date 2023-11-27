import { organizations, Prisma } from '@prisma/client';

export class CreateOrganizationDto implements Partial<organizations> {
  branding: Prisma.JsonObject | null;
  city: string | null;
  created_at: Date | undefined;
  display_name: string;
  email: string | null;
  name: string;
  phone: string | null;
  state: string | null;
  street_address: string | null;
  updated_at: Date;
  zip: string | null;
}
