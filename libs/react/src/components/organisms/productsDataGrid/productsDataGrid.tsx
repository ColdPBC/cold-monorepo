import {
  BubbleList,
  ErrorFallback,
  MuiDataGrid,
  ProductFootprintDataGridCell,
  SustainabilityAttributeColumnList,
} from '@coldpbc/components';
import { getProductCarbonFootprint, useAuth0Wrapper, useGraphQLSWR, useProductCarbonFootprintCache } from '@coldpbc/hooks';
import {
  EntityWithAttributeAssurances,
  ProductsQuery,
  SustainabilityAttribute,
} from '@coldpbc/interfaces';
import React, { useEffect, useState } from 'react';
import { get, has } from 'lodash';
import { withErrorBoundary } from "react-error-boundary";
import {addToOrgStorage, getFromOrgStorage, processEntityLevelAssurances} from '@coldpbc/lib';
import { useFlags } from "launchdarkly-react-client-sdk";
import { useNavigate } from "react-router-dom";
import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { IconNames } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';


const getColumnRows = (
  products: ProductsQuery[],
  flags: {
    [key: string]: boolean
  }) => {
  return products.map(product => {
    const tier1Supplier = product.organizationFacility

    const entitiesWithAttributeAssurances: EntityWithAttributeAssurances[] = [
      {
        id: product.id,
        name: product.name,
        attributeAssurances: product.attributeAssurances
      }
    ];

    entitiesWithAttributeAssurances.push(...product.productMaterials.map(prodMaterial => (
      {
        id: prodMaterial.material.id,
        name: prodMaterial.material.name,
        attributeAssurances: prodMaterial.material.attributeAssurances
      }
    )));

    const suppliers = new Set<EntityWithAttributeAssurances>;
    if (tier1Supplier) {
      suppliers.add(tier1Supplier);
    }
    product.productMaterials.forEach(productMaterial => {
      const tier2supplier = productMaterial.material.materialSuppliers[0]?.organizationFacility;
      if (tier2supplier) {
        suppliers.add(tier2supplier);
      }
    });
    entitiesWithAttributeAssurances.push(...Array.from(suppliers));

    const sustainabilityAttributes = processEntityLevelAssurances(entitiesWithAttributeAssurances);

    return {
      id: product.id,
      name: product.name,
      description: product.description ?? '',
      sustainabilityAttributes: sustainabilityAttributes,
      tier1Supplier: tier1Supplier?.name ?? '',
      seasonCode: product.seasonCode ?? '',
      upcCode: product.upcCode ?? '',
      brandProductId: product.brandProductId ?? '',
      supplierProductId: product.supplierProductId ?? '',
      materials: product.productMaterials.map(material => material.material?.name).filter((material): material is string => material !== null),
      productCategory: product.productCategory ?? '',
      productSubcategory: product.productSubcategory ?? '',
    }
  })
}

export const _ProductsDataGrid = () => {
  const ldFlags = useFlags();
  const navigate = useNavigate();
  const {orgId} = useAuth0Wrapper()

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'name', sort: 'asc' }
  ]);

  const [searchQuery, setSearchQuery] = useState<string>(getFromOrgStorage(orgId, 'productsDataGridSearchValue') || '');

  // Handle search input changes
  const handleFilterChange = (filterModel: GridFilterModel) => {
    const searchValue = filterModel.quickFilterValues?.join(' ') || '';
    setSearchQuery(searchValue);
    setPaginationModel(prev => ({
      ...prev,
      page: 0,
    }));
    if(orgId) addToOrgStorage(orgId, 'productsDataGridSearchValue', searchValue);
  };

  // Convert MUI sort model to GraphQL ordering
  const getOrderByInput = (sortModel: GridSortModel) => {
    if (!sortModel.length) return undefined;

    const [{ field, sort }] = sortModel;
    return {
      [field]: sort === 'asc' ? 'ASC' : 'DESC'
    };
  };

  // Build search filter
  const getSearchFilter = (searchQuery: string) => {
    const baseFilter = {
      organization: {
        id: orgId
      }
    };

    if (!searchQuery) {
      return baseFilter;
    }

    return {
      ...baseFilter,
      name_ilike: `%${searchQuery}%`,
    };
  };

  const productsQuery = useGraphQLSWR<{
    products: ProductsQuery[];
    products_aggregate: { count: number };
  }>(orgId ? 'GET_PAGINATED_PRODUCTS_FOR_ORG' : null, {
    filter: getSearchFilter(searchQuery),
    pagination: {
      offset: paginationModel.page * paginationModel.pageSize,
      limit: paginationModel.pageSize,
      orderBy: getOrderByInput(sortModel)
    }
  });

  const { cache, loading: footprintLoading, error: footprintError } = useProductCarbonFootprintCache();

  const [rows, setRows] = useState<{
    id: string;
    name: string;
    description: string;
    sustainabilityAttributes: SustainabilityAttribute[];
    tier1Supplier: string;
    seasonCode: string;
    upcCode: string;
    brandProductId: string;
    supplierProductId: string;
    materials: string[];
    productCategory: string;
    productSubcategory: string;
  }[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);

  useEffect(() => {
    if (productsQuery.data) {
      if (has(productsQuery.data, 'errors')) {
        setRows([]);
        setTotalRows(0);
      } else {
        const products = get(productsQuery.data, 'data.products', []);
        const rows = getColumnRows(products, ldFlags)
        const total = get(productsQuery.data, 'data.products_aggregate.count', 0);
        setRows(rows);
        setTotalRows(total);
      }
    }
  }, [productsQuery.data]);

  const defaultColumnProperties = {
    headerClassName: 'bg-gray-30 h-[37px] text-body',
    flex: 1,
    filterable: false,
  }

  const renderName = (params: any) => {
    const name = get(params, 'row.name', '')
    const category = get(params, 'row.productCategory', '')
    const subcategory = get(params, 'row.productSubcategory', '')
    const text = [category, subcategory]
			.filter((i: string) => (i !== ''))
			.join(' | ');

    return (
      <div className={'flex flex-col w-full h-full justify-center gap-[2px]'}>
        <div className={'w-full h-auto items-center text-body font-bold truncate'}>
          <span>{name}</span>
        </div>
        {
          text &&
          <div className={'w-full h-auto items-center text-body text-tc-disabled truncate'}>
            <span>{text}</span>
          </div>
        }
      </div>
    )
  }

  const renderDescription = (params: any) => {
    const description = get(params, 'row.description', '')
    return (
      <div className={'w-full h-full text-body items-center flex text-wrap break-words'}>
        <span className={'line-clamp-3'}>{description}</span>
      </div>
    )
  }

  const productFootprintColumn =
		ldFlags.productCarbonFootprintMvp && !footprintError
			? [
					{
						...defaultColumnProperties,
						field: 'carbonFootprint',
						headerName: 'Carbon Footprint (kgCO2e)',
						flex: 1,
						minWidth: 220,
						renderCell: params => (
             <ProductFootprintDataGridCell cache={cache} id={params.row.id} productCategory={params.row.productCategory} />
            ),
					},
			  ]
			: [];

	const columns = [
		{
			...defaultColumnProperties,
			field: 'name',
			headerName: 'Name',
			minWidth: 230,
			flex: 1,
			renderCell: renderName,
		},
		{
			...defaultColumnProperties,
			field: 'description',
			headerName: 'Description',
			minWidth: 200,
			flex: 1,
			renderCell: renderDescription,
		},
		{
			...defaultColumnProperties,
			field: 'tier1Supplier',
			headerName: 'Tier 1 Supplier',
			minWidth: 200,
			flex: 1,
			sortable: false,
		},
		{
			...defaultColumnProperties,
			field: 'seasonCode',
			headerName: 'Season',
			minWidth: 200,
			flex: 1,
		},
		...productFootprintColumn,
		{
			...defaultColumnProperties,
			field: 'sustainabilityAttributes',
			headerName: 'Sustainability Attributes',
			flex: 1,
			minWidth: 350,
			renderCell: params => {
				return <SustainabilityAttributeColumnList sustainabilityAttributes={params.value} />;
			},
			sortable: false,
		},
		{
			...defaultColumnProperties,
			field: 'upcCode',
			headerName: 'UPC',
			minWidth: 200,
			flex: 1,
		},
		{
			...defaultColumnProperties,
			field: 'brandProductId',
			headerName: 'Brand Product ID',
			minWidth: 200,
			flex: 1,
		},
		{
			...defaultColumnProperties,
			field: 'supplierProductId',
			headerName: 'Supplier Product ID',
			minWidth: 200,
			flex: 1,
		},
		{
			...defaultColumnProperties,
			field: 'materials',
			headerName: 'Materials',
			flex: 1,
			minWidth: 350,
			renderCell: params => {
				return <BubbleList values={params.value} />;
			},
			sortable: false,
		},
		{
			...defaultColumnProperties,
			field: 'productCategory',
			headerName: 'Category',
			minWidth: 230,
			flex: 1,
		},
		{
			...defaultColumnProperties,
			field: 'productSubcategory',
			headerName: 'Sub Category',
			minWidth: 230,
			flex: 1,
		},
	];

  return (
    <div className={'w-full'}>
      <MuiDataGrid
        loading={productsQuery.isLoading || footprintLoading}
        columns={columns}
        rows={rows}
        rowHeight={72}
        onRowClick={(params) => {
          if(ldFlags.showProductDetailPageCold1140){
            navigate(`/products/${params.id}`)
          }
        }}
        showManageColumns
        showExport
        showSearch
        // Pagination props
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[25, 50, 100]}
        paginationMode="server"
        rowCount={totalRows}
        // Sorting props
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        sortingMode="server"
        // Search props
        filterModel={{
          items: [],
          quickFilterValues: [searchQuery],
        }}
        filterMode="server"
        onFilterModelChange={handleFilterChange}
        filterDebounceMs={500}
        slotProps={{
          toolbar: {
            quickFilterProps: {
              placeholder: 'Search by name...',
              value: searchQuery,
            }
          }
        }}
      />
    </div>
  )
}

export const ProductsDataGrid = withErrorBoundary(_ProductsDataGrid, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ProductsDataGrid: ', error);
  },
});
