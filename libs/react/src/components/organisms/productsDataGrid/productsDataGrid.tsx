import {
  DataGridCellHoverPopover,
  ErrorFallback,
  MuiDataGrid,
  Spinner,
  SustainabilityAttributeColumnList
} from "@coldpbc/components";
import {useAuth0Wrapper, useGraphQLSWR} from "@coldpbc/hooks";
import { ProductsQuery, SustainabilityAttribute, SustainabilityAttributeAssuranceGraphQL } from "@coldpbc/interfaces";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";
import React from "react";
import {get, uniq} from "lodash";
import {withErrorBoundary} from "react-error-boundary";
import { processEntityLevelAssurances } from '@coldpbc/lib';
import {useFlags} from "launchdarkly-react-client-sdk";
import {useNavigate} from "react-router-dom";


const getColumnRows = (
  products: ProductsQuery[],
  flags: {
    [key: string]: boolean
  }) => {
  return products.map(product => {
    const tier1Supplier = product.organizationFacility

    const entitiesWithAttributeAssurances = [
      {
        id: product.id,
        name: product.name,
        attributeAssurances: product.attributeAssurances
      }
    ];

    if (flags.showEntitySustainabilityAttributesForRelatedEntitiesCold1128){
      entitiesWithAttributeAssurances.push(...product.productMaterials.map(prodMaterial => (
        {
          id: prodMaterial.material.id,
          name: prodMaterial.material.name,
          attributeAssurances: prodMaterial.material.attributeAssurances
        }
      )));
    }

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
  const productsQuery = useGraphQLSWR<{
    products: ProductsQuery[]
  }>(orgId ? 'GET_ALL_PRODUCTS' : null, {
    filter: {
      organization: {
        id: orgId
      }
    },
  });

  const defaultColumnProperties = {
    headerClassName: 'bg-gray-30 h-[37px] text-body',
    flex: 1,
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
    },
    {
      ...defaultColumnProperties,
      field: 'seasonCode',
      headerName: 'Season',
      minWidth: 200,
      flex: 1,
    },
    {
      ...defaultColumnProperties,
      field: 'sustainabilityAttributes',
      headerName: 'Sustainability Attributes',
      flex: 1,
      minWidth: 350,
      renderCell: (params) => {
        return (
          <SustainabilityAttributeColumnList sustainabilityAttributes={params.value} />
        )
      },
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
      field: 'materials', headerName: 'Materials',
      flex: 1,
      minWidth: 350,
      renderCell: (params) => {
        return (
          <DataGridCellHoverPopover params={params} />
        )
      },
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
  ]

  if(productsQuery.isLoading) {
    return <Spinner />
  }

  let rows: {
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
  }[] = []

  if(get(productsQuery.data, 'errors')) {
    rows = []
  }

  if(productsQuery.data && get(productsQuery.data, 'data.products', []).length > 0) {
    rows = getColumnRows(productsQuery.data.data.products, ldFlags)
  }

  return (
    <div className={'w-full'}>
      <MuiDataGrid
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
