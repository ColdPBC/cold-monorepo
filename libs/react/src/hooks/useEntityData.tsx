import { EntityLevel } from '@coldpbc/enums';
import { BaseEntity, MaterialsWithRelations, ProductsQuery, SupplierGraphQL } from '@coldpbc/interfaces';
import { useGraphQLSWR } from '@coldpbc/hooks';
import { get } from 'lodash';
import React from 'react';

type SupportedEntityLevel = Exclude<EntityLevel, EntityLevel.ORGANIZATION>;

// Define stable config object outside of hook to prevent unnecessary re-renders
const ENTITY_MAP = {
  [EntityLevel.MATERIAL]: {
    queryKey: 'GET_ALL_MATERIALS_FOR_ORG',
    dataPath: 'data.materials',
    categoryNames: ['materialCategory', 'materialSubcategory'],
    transform: (item: MaterialsWithRelations, assurances: Array<{ entity: { id: string }}>): BaseEntity => ({
      id: item.id,
      name: item.name,
      category: item.materialCategory || '',
      subcategory: item.materialSubcategory || '',
      hasAttribute: assurances.some(assurance => assurance.entity.id === item.id)
    })
  },
  [EntityLevel.PRODUCT]: {
    queryKey: 'GET_ALL_PRODUCTS',
    dataPath: 'data.products',
    categoryNames: ['productCategory', 'productSubcategory'],
    transform: (item: ProductsQuery, assurances: Array<{ entity: { id: string }}>): BaseEntity => ({
      id: item.id,
      name: item.name,
      category: item.productCategory || '',
      subcategory: item.productSubcategory || '',
      hasAttribute: assurances.some(assurance => assurance.entity.id === item.id)
    })
  },
  [EntityLevel.SUPPLIER]: {
    queryKey: 'GET_ALL_SUPPLIERS_FOR_ORG',
    dataPath: 'data.organizationFacilities',
    categoryNames: ['category', 'subcategory'],
    transform: (item: SupplierGraphQL, assurances: Array<{ entity: { id: string }}>): BaseEntity => ({
      id: item.id,
      name: item.name,
      // Use country in lieu of category for suppliers
      category: item.country || '',
      subcategory: '',
      hasAttribute: assurances.some(assurance => assurance.entity.id === item.id)
    })
  },
} as const;

interface EntityQueryResult {
  materials?: MaterialsWithRelations[];
  organizationFacilities?: SupplierGraphQL[];
  products?: ProductsQuery[];
}

// Memoize the query config to prevent unnecessary re-renders
function useQueryConfig(entityLevel: SupportedEntityLevel | undefined, orgId: string | undefined) {
  return React.useMemo(() => {
    if (!entityLevel || !orgId) return null;

    return {
      key: ENTITY_MAP[entityLevel].queryKey,
      filter: {
        organization: { id: orgId }
      }
    };
  }, [entityLevel, orgId]);
}

export function useEntityData(
  entityLevel: SupportedEntityLevel | undefined,
  orgId: string | undefined,
  attributeAssurances: Array<{ entity: { id: string }}> = []
): BaseEntity[] {
  // Get the configuration for the current entity type
  const config = entityLevel ? ENTITY_MAP[entityLevel] : null;

  // Memoize the query configuration
  const queryConfig = useQueryConfig(entityLevel, orgId);

  // Execute the query with memoized config
  const query = useGraphQLSWR<EntityQueryResult>(
    queryConfig?.key ?? null,
    { filter: queryConfig?.filter }
  );

  // Get the raw data from the query result
  return React.useMemo(() => {
    if (!config || !query.data) return [];
    const rawData = get(query.data, config.dataPath, []);

    // Transform the raw data into BaseEntity format
    return rawData
      .map(item => config.transform(item, attributeAssurances))
      .sort((a: BaseEntity, b: BaseEntity) => a.name.localeCompare(b.name));
  }, [query.data, config, attributeAssurances]);
}
