import { SustainabilityAttributeAssurance } from '@coldpbc/interfaces';
import { AttributeAssuranceStatus } from '@coldpbc/enums';
import { addDays } from 'date-fns';

export const getAggregateStatusFromAttributeAssurances = (
  assurances: SustainabilityAttributeAssurance[]
) => {
  const currentDate = new Date();
  let hasActiveAssurance = false;
  let hasExpiringAssurance = false;
  let hasDocumentedAssurance = false;
  let maxExpirationDate: Date | null | undefined = undefined;
  let assuranceStatus: AttributeAssuranceStatus;

  for (const assurance of assurances) {
    const hasDocument = !!assurance.organizationFile?.id;
    const expirationDate = assurance.effectiveEndDate ? new Date(assurance.effectiveEndDate) : null;

    // Null expiration date is considered active 'forever'
    if (maxExpirationDate !== null && (expirationDate === null || maxExpirationDate === undefined || maxExpirationDate < expirationDate)) {
      maxExpirationDate = expirationDate;
    }

    if (hasDocument) {
      if (!expirationDate || expirationDate > addDays(currentDate, 60)) {
        hasActiveAssurance = true;
      } else if (expirationDate > currentDate) {
        hasExpiringAssurance = true;
      } else {
        hasDocumentedAssurance = true;
      }
    }
  }

  if (hasActiveAssurance) {
    assuranceStatus = AttributeAssuranceStatus.ACTIVE;
  } else if (hasExpiringAssurance) {
    assuranceStatus = AttributeAssuranceStatus.EXPIRING;
  } else if (hasDocumentedAssurance) {
    assuranceStatus = AttributeAssuranceStatus.EXPIRED;
  } else {
    assuranceStatus = AttributeAssuranceStatus.NOT_DOCUMENTED;
  }

  return {
    assuranceStatus,
    assuranceExpiration: maxExpirationDate
  }
};
