import { Prisma } from '@prisma/client';
import { SurveyDataEntity } from '../../survey-data/entities/survey-data.entity';
import { CategoryDataEntity } from '../../category-data/entities/category-data.entity';
import { ActionsEntity } from '../../actions/entities/actions.entity';

export class OrganizationsEntity {
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
}
