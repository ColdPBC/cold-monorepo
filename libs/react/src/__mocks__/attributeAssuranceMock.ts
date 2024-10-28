import { addDays } from 'date-fns';
import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';

interface AttributeAssuranceMockParams {
	entity: EntityLevel;
	status: AttributeAssuranceStatus;
	index: number;
}

export const AttributeAssuranceMock = ({
  entity,
  status,
  index
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
      id: index.toString(),
    },
    effectiveEndDate: effectiveEndDate,
    status,
  };
};
