import { addDays, subDays } from 'date-fns';
import { EntityLevel } from '@coldpbc/enums';

type AssuranceStatus = 'ACTIVE' | 'EXPIRING' | 'EXPIRED' | 'NOT DOCUMENTED';

interface AttributeAssuranceMockParams {
  entity: EntityLevel;
  status: AssuranceStatus;
  index: number;
}

export const AttributeAssuranceMock = ({
  entity,
  status,
  index
}: AttributeAssuranceMockParams) => {
  let effectiveEndDate: string | null;

  switch (status) {
    case 'EXPIRING':
      effectiveEndDate = addDays(new Date(), 10).toISOString();
      break;
    case 'EXPIRED':
      effectiveEndDate = subDays(new Date(), 1).toISOString();
      break;
    default:
      effectiveEndDate = null;
  }

  const baseObject = {
    id: index.toString(),
    effectiveEndDate: effectiveEndDate,
    material: null,
    organization: null,
    organizationFacility: null,
    organizationFile: status === 'NOT DOCUMENTED' ? null : { id: '123' },
    product: null,
  };

  switch (entity) {
    case EntityLevel.MATERIAL:
      return { ...baseObject, material: { id: `mat_${index}` } };
    case EntityLevel.ORGANIZATION:
      return { ...baseObject, organization: { id: `org_${index}` } };
    case EntityLevel.PRODUCT:
      return { ...baseObject, product: { id: `prod_${index}` } };
    case EntityLevel.SUPPLIER:
      return { ...baseObject, organizationFacility: { id: `sup_${index}` } };
    default:
      throw new Error(`Unsupported Entity Entity: ${entity}`);
  }
};
