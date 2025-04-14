import {
  AttributeAssurance,
  EntityLevelAttributeAssuranceGraphQL,
  EntityWithAttributeAssurances,
  AttributeAssuranceGraphData,
  SustainabilityAttribute,
  SustainabilityAttributeAssurance,
  SustainabilityAttributeAssuranceGraphQL,
  SustainabilityAttributeGraphQL,
  SustainabilityAttributeWithStatus,
} from '@coldpbc/interfaces';
import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';
import { addDays } from 'date-fns';
import { get } from 'lodash';

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

// Helper to sort assurances by most future expiration date and get the most relevant one
const getMostRelevantAssurance = (assurances: SustainabilityAttributeAssuranceGraphQL[]): SustainabilityAttributeAssuranceGraphQL => {
  return assurances.sort((a, b) => {
    // All assurances passed here should have effectiveEndDate, but just in case
    if (!a.effectiveEndDate) return 1;
    if (!b.effectiveEndDate) return -1;

    const dateA = new Date(a.effectiveEndDate).getTime();
    const dateB = new Date(b.effectiveEndDate).getTime();
    return dateB - dateA; // Sort in descending order (latest first)
  })[0];
};

const getAggregateStatusFromAttributeAssurancesGraphQL = (
  assurances: SustainabilityAttributeAssuranceGraphQL[]
) => {
  if (assurances.length === 0) {
    return {
      assuranceStatus: AttributeAssuranceStatus.NOT_DOCUMENTED,
      assuranceExpiration: null,
      certificateId: null
    };
  }

  // Step 1: Filter for documented assurances
  const documentedAssurances = assurances.filter(assurance => !!assurance.organizationFile?.id);

  if (documentedAssurances.length === 0) {
    return {
      assuranceStatus: AttributeAssuranceStatus.NOT_DOCUMENTED,
      assuranceExpiration: null,
      certificateId: null
    };
  }

  // Step 2: Filter for those with dates
  const assurancesWithDates = documentedAssurances.filter(assurance => !!assurance.effectiveEndDate);

  if (assurancesWithDates.length === 0) {
    // No dates means MISSING_DATE status
    const primaryAssurance = documentedAssurances[0];
    return {
      assuranceStatus: AttributeAssuranceStatus.MISSING_DATE,
      assuranceExpiration: null,
      certificateId: extractCertificateId(primaryAssurance)
    };
  }

  // Step 3: Sort by effective end date and pick the one with the latest date
  const primaryAssurance = getMostRelevantAssurance(assurancesWithDates);
  const expirationDate = new Date(primaryAssurance.effectiveEndDate!);

  // Determine status based on the expiration date
  let assuranceStatus: AttributeAssuranceStatus;
  const currentDate = new Date();

  if (expirationDate > addDays(currentDate, 60)) {
    assuranceStatus = AttributeAssuranceStatus.ACTIVE;
  } else if (expirationDate > currentDate) {
    assuranceStatus = AttributeAssuranceStatus.EXPIRING;
  } else {
    assuranceStatus = AttributeAssuranceStatus.EXPIRED;
  }

  return {
    assuranceStatus,
    assuranceExpiration: expirationDate,
    certificateId: extractCertificateId(primaryAssurance)
  };
};

// Helper function to extract certificate ID
const extractCertificateId = (assurance: SustainabilityAttributeAssuranceGraphQL): string | null => {
  if (!assurance?.organizationFile?.metadata) return null;

  try {
    const metadata = typeof assurance.organizationFile.metadata === 'string'
      ? JSON.parse(assurance.organizationFile.metadata)
      : assurance.organizationFile.metadata;

    return get(metadata, 'certificate_number', null);
  } catch (e) {
    // If parsing fails, try direct access
    return get(assurance.organizationFile.metadata, 'certificate_number', null);
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
      const entity = getEntity(attribute.level, assurance);

      if (!entity) continue;

      const existingAssurances = assurancesByEntity.get(entity.id) ?? [];
      assurancesByEntity.set(entity.id, [...existingAssurances, assurance]);
    }

    // Transform each entity group into a single assurance
    const transformedAssurances: SustainabilityAttributeAssurance[] =
      Array.from(assurancesByEntity.entries()).map(([entityId, assurances]) => {
        // Get status and max expiration for this group of assurances
        const { assuranceStatus, assuranceExpiration, certificateId } =
          getAggregateStatusFromAttributeAssurancesGraphQL(assurances);

        // Get the entity name from the first assurance
        // We can use the first one since all assurances in this group are for the same entity
        const firstAssurance = assurances[0];
        const entityName = getEntity(attribute.level, firstAssurance)?.name || '';

        return {
          effectiveEndDate: assuranceExpiration,
          entity: {
            id: entityId,
            name: entityName,
          },
          status: assuranceStatus,
          certificateId
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
      const { assuranceStatus, assuranceExpiration, certificateId } = getAggregateStatusFromAttributeAssurancesGraphQL(assurances);

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
          id: entity.id,
          name: entity.name,
          // For materials, we try to grab the Tier 2 supplier name
          supplierName: entity.organizationFacility?.name,
        },
        status: assuranceStatus,
        certificateId
      });
    }
  }

  // Return alphabetized Sustainability Attribute list
  return Array.from(attributesMap.values()).sort((a, b) => a.name.localeCompare(b.name));
};

export const filterAttributes = (attributes: SustainabilityAttribute[], level: EntityLevel) => {
  return attributes.filter(sustainabilityAttribute => sustainabilityAttribute.level === level)
}


export const getEntity = (entityLevel: EntityLevel, attributeAssurance: SustainabilityAttributeAssuranceGraphQL | AttributeAssurance) => {
  const entityMap = {
    [EntityLevel.MATERIAL]: attributeAssurance.material,
    [EntityLevel.PRODUCT]: attributeAssurance.product,
    [EntityLevel.SUPPLIER]: attributeAssurance.organizationFacility,
    [EntityLevel.ORGANIZATION]: attributeAssurance.organization,
  };

  return entityMap[entityLevel];
}

export function processSustainabilityAttributeForGraph(attribute: SustainabilityAttribute): AttributeAssuranceGraphData {
  const result: AttributeAssuranceGraphData = {
    activeCount: 0,
    inactiveCount: 0,
    notDocumentedCount: 0,
  };

  attribute.attributeAssurances.forEach((assurance) => {
    switch(assurance.status) {
      case AttributeAssuranceStatus.ACTIVE:
      case AttributeAssuranceStatus.EXPIRING:
        result.activeCount++;
        break;
      case AttributeAssuranceStatus.EXPIRED:
      case AttributeAssuranceStatus.MISSING_DATE:
        result.inactiveCount++;
        break;
      default:
        result.notDocumentedCount++;
    }
  });

  return result;
}
