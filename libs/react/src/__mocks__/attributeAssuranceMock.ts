import { subDays } from 'date-fns';

type Entity = 'MATERIAL' | 'ORGANIZATION' | 'PRODUCT' | 'SUPPLIER';
type AssuranceStatus = 'ACTIVE' | 'EXPIRED' | 'NOT DOCUMENTED';

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
  const yesterday = subDays(new Date(), 1).toISOString();

  const baseObject = {
    id: index.toString(),
    effectiveEndDate: status === 'EXPIRED' ? yesterday : null,
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
