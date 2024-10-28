import {
	EntityLevelAttributeAssuranceGraphQL,
	EntityWithAttributeAssurances,
	SustainabilityAttribute,
	SustainabilityAttributeAssurance,
	SustainabilityAttributeAssuranceGraphQL,
	SustainabilityAttributeGraphQL,
	SustainabilityAttributeWithStatus,
} from '@coldpbc/interfaces';
import { AttributeAssuranceStatus } from '@coldpbc/enums';
import { addDays } from 'date-fns';

const statusPriority: { [key in AttributeAssuranceStatus]: number } = {
	[AttributeAssuranceStatus.ACTIVE]: 0,
	[AttributeAssuranceStatus.EXPIRING]: 1,
	[AttributeAssuranceStatus.EXPIRED]: 2,
	[AttributeAssuranceStatus.MISSING_DATE]: 3,
	[AttributeAssuranceStatus.NOT_DOCUMENTED]: 4,
};

export const sustainabilityAttributeSortFn = (
  a: SustainabilityAttributeWithStatus,
  b: SustainabilityAttributeWithStatus
): number => {
  // First, compare by status
  const statusComparison = statusPriority[a.assuranceStatus] - statusPriority[b.assuranceStatus];

  if (statusComparison !== 0) {
    return statusComparison;
  }

  // If status is the same, compare by name
  return a.name.localeCompare(b.name);
};

export const attributeAssuranceSortFn = (
  a: SustainabilityAttributeAssurance,
  b: SustainabilityAttributeAssurance,
): number => {
  // First, compare by status
  const statusComparison = statusPriority[a.status] - statusPriority[b.status];

  if (statusComparison !== 0) {
    return statusComparison;
  }

  // If status is the same, compare by effective date
  // Having a date comes before not having a date
  if (!a.effectiveEndDate && !b.effectiveEndDate) {
    return a.entity.id.localeCompare(b.entity.id);
  }

  if (!a.effectiveEndDate) {
    return 1; // b comes first because it has a date
  }

  if (!b.effectiveEndDate) {
    return -1; // a comes first because it has a date
  }

  // Both have dates, compare them (most future date first)
  const dateComparison = b.effectiveEndDate.getTime() - a.effectiveEndDate.getTime();

  if (dateComparison !== 0) {
    return dateComparison;
  }

  // If dates are equal, compare by ID
  return a.entity.id.localeCompare(b.entity.id);
};

export const getAggregateStatusFromAttributeAssurances = (
  assurances: SustainabilityAttributeAssurance[]
)=> {
  if (assurances.length === 0) {
    return {
      assuranceStatus: AttributeAssuranceStatus.NOT_DOCUMENTED,
      assuranceExpiration: null
    };
  } else {
    const firstAssurance = assurances.sort(attributeAssuranceSortFn)[0];
    return {
      assuranceStatus: firstAssurance.status,
      assuranceExpiration: firstAssurance.effectiveEndDate,
    }
  }
}

const getAggregateStatusFromAttributeAssurancesGraphQL = (
  assurances: SustainabilityAttributeAssuranceGraphQL[]
) => {
  const currentDate = new Date();
  let hasActiveAssurance = false;
  let hasExpiringAssurance = false;
  let hasExpiredAssurance = false;
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
      if (!expirationDate) {
        hasDocumentedAssurance = true;
      } else if (expirationDate > addDays(currentDate, 60)) {
        hasActiveAssurance = true;
      } else if (expirationDate > currentDate) {
        hasExpiringAssurance = true;
      } else if (expirationDate) {
        hasExpiredAssurance = true;
      }
    }
  }

  if (hasActiveAssurance) {
    assuranceStatus = AttributeAssuranceStatus.ACTIVE;
  } else if (hasExpiringAssurance) {
    assuranceStatus = AttributeAssuranceStatus.EXPIRING;
  } else if (hasExpiredAssurance) {
    assuranceStatus = AttributeAssuranceStatus.EXPIRED;
  } else if (hasDocumentedAssurance) {
    assuranceStatus = AttributeAssuranceStatus.MISSING_DATE;
  } else {
    assuranceStatus = AttributeAssuranceStatus.NOT_DOCUMENTED;
  }

  return {
    assuranceStatus,
    assuranceExpiration: maxExpirationDate
  }
};

// When we get the data from the backend, each SustainabilityAttribute
// can have multiple AttributeAssurances for the same entity. We want
// to aggregate them into one status.
export const processSustainabilityAttributeDataFromGraphQL = (
  attributes: SustainabilityAttributeGraphQL[]
): SustainabilityAttribute[] => {
  return attributes.map(attribute => {
    // Group assurances by entity
    const assurancesByEntity = new Map<string, SustainabilityAttributeAssuranceGraphQL[]>();

    for (const assurance of attribute.attributeAssurances) {
      // Determine which entity this assurance belongs to
      const entity =
        assurance.material ??
        assurance.organization ??
        assurance.organizationFacility ??
        assurance.product;

      if (!entity) continue;

      const entityId = entity.id;
      const existingAssurances = assurancesByEntity.get(entityId) ?? [];
      assurancesByEntity.set(entityId, [...existingAssurances, assurance]);
    }

    // Transform each entity group into a single assurance
    const transformedAssurances: SustainabilityAttributeAssurance[] =
      Array.from(assurancesByEntity.entries()).map(([entityId, assurances]) => {
        // Get status and max expiration for this group of assurances
        const { assuranceStatus, assuranceExpiration } =
          getAggregateStatusFromAttributeAssurancesGraphQL(assurances);

        return {
          effectiveEndDate: assuranceExpiration,
          entity: {
            id: entityId,
          },
          status: assuranceStatus
        };
      });

    return {
      id: attribute.id,
      name: attribute.name,
      logoUrl: attribute.logoUrl,
      level: attribute.level,
      attributeAssurances: transformedAssurances
    };
  });
};

export const processEntityLevelAssurances = (
  entities: EntityWithAttributeAssurances[]
): SustainabilityAttribute[] => {
  // Map to track unique attributes by ID
  const attributesMap = new Map<string, SustainabilityAttribute>();

  // Process each entity
  for (const entity of entities) {
    // Group assurances by attribute for this entity
    const assurancesByAttribute = new Map<string, EntityLevelAttributeAssuranceGraphQL[]>();

    for (const assurance of entity.attributeAssurances) {
      const attribute = assurance.sustainabilityAttribute;
      if (!attribute) continue;

      const existingAssurances = assurancesByAttribute.get(attribute.id) ?? [];
      assurancesByAttribute.set(attribute.id, [...existingAssurances, assurance]);
    }

    // Process each attribute group for this entity
    for (const [attributeId, assurances] of assurancesByAttribute) {
      const attribute = assurances[0]!.sustainabilityAttribute!;
      const { assuranceStatus, assuranceExpiration } = getAggregateStatusFromAttributeAssurancesGraphQL(assurances);

      // Get or create the attribute in our map
      let sustainabilityAttribute = attributesMap.get(attributeId);
      if (!sustainabilityAttribute) {
        sustainabilityAttribute = {
          ...attribute,
          attributeAssurances: []
        };
        attributesMap.set(attributeId, sustainabilityAttribute);
      }

      // Add the aggregated assurance for this entity
      sustainabilityAttribute.attributeAssurances.push({
        effectiveEndDate: assuranceExpiration,
        entity: {
          id: entity.id
        },
        status: assuranceStatus
      });
    }
  }

  // Return alphabetized Sustainability Attribute list
  return Array.from(attributesMap.values()).sort((a, b) => a.name.localeCompare(b.name));;
};
