import { useMemo } from 'react';
import { useGraphQLSWR } from './useGraphqlSWR';
import { ProductCarbonFootprintData } from '@coldpbc/interfaces';
import { useAuth0Wrapper } from './useAuth0Wrapper';
import { get } from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';

interface ProductFootprint {
  totalFootprint: number;
  hasCompleteData: boolean;
}

interface CarbonFootprintResult {
  totalFootprint: number;
  categoryAverage: number;
  percentageFromAverage: number;
  hasCompleteData: boolean;
}

type CacheType = {
  getProductFootprint: (id: string) => ProductFootprint | undefined;
  getCategoryAverage: (category: string | null) => number | undefined;
} | null;

// Create a singleton cache that persists across components
const footprintCache = {
  products: new Map<string, ProductFootprint>(),
  categories: new Map<string, number>()
};

// Function to calculate product footprint
const calculateProductFootprint = (product: ProductCarbonFootprintData): ProductFootprint => {
  let totalFootprint = 0;
  let missingData = false;

  product.productMaterials.forEach(materialItem => {
    if (!materialItem.weight || !materialItem.material.emissionsFactor) {
      missingData = true;
      return;
    }

    const materialFootprint = materialItem.weight * materialItem.material.emissionsFactor;
    totalFootprint += materialFootprint;
  });

  return {
    totalFootprint,
    hasCompleteData: !missingData
  };
};

// Hook to fetch initialize and manage cache
export const useProductCarbonFootprintCache = () => {
  const ldFlags = useFlags();
  const { orgId } = useAuth0Wrapper();
  const query = useGraphQLSWR<{
    data: {
      products: ProductCarbonFootprintData[] | null
    }
  }>(ldFlags.productCarbonFootprintMvp ? 'GET_PRODUCT_CARBON_FOOTPRINT_DATA' : null, {
      organizationId: orgId
    },
  );

  // Update cache when data changes
  const cache = useMemo(() => {
    if (query.isLoading) return null;

    const productData = get(query.data, 'data.products', []);
    if (!productData) return null;

    console.log('Product Data from query:', productData);

    // Clear category averages as they'll be recalculated
    footprintCache.categories.clear();

    // Map to store category totals and counts
    const categoryTotals = new Map<string, { sum: number; count: number }>();

    // Process each product
    productData.forEach((product: ProductCarbonFootprintData) => {
      // Calculate and cache product footprint
      const footprint = calculateProductFootprint(product);
      footprintCache.products.set(product.id, footprint);

      // Only include in category average if data is available and category exists
      if (footprint.totalFootprint > 0 && product.productCategory) {
        const current = categoryTotals.get(product.productCategory) || { sum: 0, count: 0 };
        categoryTotals.set(product.productCategory, {
          sum: current.sum + footprint.totalFootprint,
          count: current.count + 1
        });
      }
    });

    // Calculate and cache category averages
    categoryTotals.forEach((value, category) => {
      const average = value.sum / value.count;
      footprintCache.categories.set(category, average);
    });

    return {
      getCategoryAverage: (category: string | null) =>
        category ? footprintCache.categories.get(category) : undefined,
      getProductFootprint: (productId: string) =>
        footprintCache.products.get(productId)
    };
  }, [query]);

  return {
    cache,
    loading: query.isLoading,
    error: get(query.data, 'error', null)
  };
};

// Function to access cached calculations for a specific product
export const getProductCarbonFootprint = (
  cache: CacheType | null,
  { id, productCategory }: { id: string; productCategory: string | null }
): CarbonFootprintResult => {
  const result: CarbonFootprintResult = {
    totalFootprint: 0,
    categoryAverage: 0,
    percentageFromAverage: 0,
    hasCompleteData: true
  };

  if (!cache) return result;

  // Get product footprint from cache
  const productFootprint = cache.getProductFootprint(id);
  if (productFootprint) {
    result.totalFootprint = productFootprint.totalFootprint;
    result.hasCompleteData = productFootprint.hasCompleteData;
  }

  // Get category average from cache
  if (productCategory) {
    const categoryAverage = cache.getCategoryAverage(productCategory);
    if (categoryAverage) {
      result.categoryAverage = categoryAverage;

      // Calculate percentage difference
      if (categoryAverage > 0) {
        result.percentageFromAverage =
          ((result.totalFootprint - categoryAverage) / categoryAverage) * 100;
      }
    }
  }

  return result;
};
