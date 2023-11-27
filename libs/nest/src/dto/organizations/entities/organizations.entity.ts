import { Prisma } from '@prisma/client';
import { SurveyDataEntity } from '../../survey-data';
import { CategoryDataEntity } from '../../category-data';
import { ActionsEntity } from '../../actions';

export type OrganizationsEntity = {
  id: string;
  name: string;
  enabled_connections: Prisma.JsonValue;
  display_name: string;
  branding: Prisma.JsonValue | null;
  phone: string | null;
  email: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  created_at: Date;
  updated_at: Date;
  survey_data?: SurveyDataEntity[];
  category_data?: CategoryDataEntity[];
  actions?: ActionsEntity[];
};
