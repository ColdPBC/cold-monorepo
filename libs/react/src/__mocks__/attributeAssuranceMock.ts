import { addDays, subDays } from 'date-fns';

type Entity = 'MATERIAL' | 'ORGANIZATION' | 'PRODUCT' | 'SUPPLIER';
type AssuranceStatus = 'ACTIVE' | 'EXPIRING' | 'EXPIRED' | 'NOT DOCUMENTED';

interface AttributeAssuranceMockParams {
  entity: Entity;
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
    case 'MATERIAL':
      return { ...baseObject, material: { id: `mat_${index}` } };
    case 'ORGANIZATION':
      return { ...baseObject, organization: { id: `org_${index}` } };
    case 'PRODUCT':
      return { ...baseObject, product: { id: `prod_${index}` } };
    case 'SUPPLIER':
      return { ...baseObject, organizationFacility: { id: `sup_${index}` } };
  }
};
