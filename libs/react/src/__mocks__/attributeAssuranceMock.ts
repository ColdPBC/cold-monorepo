import { addDays } from 'date-fns';
import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';
import { toSentenceCase } from '@coldpbc/lib';

interface AttributeAssuranceMockParams {
	entity: EntityLevel;
	status: AttributeAssuranceStatus;
  index: number;
  id?: string;
}

export const AttributeAssuranceMock = ({
  entity,
  status,
  index,
  id
}: AttributeAssuranceMockParams) => {
  let effectiveEndDate: Date | null;

  switch (status) {
    case AttributeAssuranceStatus.ACTIVE:
      effectiveEndDate = new Date('2027-12-31');
      break;
    case AttributeAssuranceStatus.EXPIRING:
      effectiveEndDate = addDays(new Date(), 10);
      break;
    case AttributeAssuranceStatus.EXPIRED:
      effectiveEndDate = new Date('2024-10-24');
      break;
    default:
      effectiveEndDate = null;
  }

  return {
    entity: {
      id: id || index.toString(),
      name: `${toSentenceCase(entity)} ${index}`,
      supplierName: entity === EntityLevel.MATERIAL ? `Tier 2 Supplier ${Math.floor(index / 2) + 1}` : undefined,
    },
    effectiveEndDate: effectiveEndDate,
    status,
  };
};
