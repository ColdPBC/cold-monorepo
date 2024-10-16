import {DataGridCellHoverPopover, ErrorFallback, MuiDataGrid, Spinner} from "@coldpbc/components";
import {useAuth0Wrapper, useGraphQLSWR} from "@coldpbc/hooks";
import {ProductsQuery} from "@coldpbc/interfaces";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";
import React from "react";
import {get, uniq} from "lodash";
import {withErrorBoundary} from "react-error-boundary";


const getColumnRows = (products: ProductsQuery[]) => {
  // get sustainability attributes for each product
  return products.map(product => {
    return {
      id: product.id,
      name: product.name,
      category: product.productCategory ?? '',
      subcategory: product.productSubcategory ?? '',
      description: product.description ?? '',
      sustainabilityAttributes: uniq(product.attributeAssurances.map(attribute => attribute.sustainabilityAttribute.name)),
      tier1Supplier: product.organizationFacility?.name ?? '',
      seasonCode: product.seasonCode ?? '',
      styleCode: product.styleCode ?? '',
      upcCode: product.upcCode ?? '',
      brandProductId: product.brandProductId ?? '',
      supplierProductId: product.supplierProductId ?? '',
      materials: product.productMaterials.map(material => material.material?.name).filter((material): material is string => material !== null),
    }
  })
}

export const _ProductsDataGrid = () => {
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
    const category = get(params, 'row.category', '')
    const subcategory = get(params, 'row.subcategory', '')
    const text = [category, subcategory]
			.filter((i: string) => (i !== ''))
			.join(' | ');

    return (
      <div className={'flex flex-col w-full h-full justify-center gap-[8px]'}>
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
      minWidth: 200,
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
      field: 'sustainabilityAttributes',
      headerName: 'Sustainability Attributes',
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
      field: 'styleCode',
      headerName: 'Style',
      minWidth: 200,
      flex: 1,
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
  ]

  if(productsQuery.isLoading) {
    return <Spinner />
  }

  let rows: {
    id: string,
    name: string,
    sustainabilityAttributes: string[],
    tier1Supplier: string,
    materials: string[],
    upcCode: string,
    styleCode: string,
    seasonCode: string,
  }[] = []

  if(get(productsQuery.data, 'errors')) {
    rows = []
  }

  if(productsQuery.data && get(productsQuery.data, 'data.products', []).length > 0) {
    rows = getColumnRows(productsQuery.data.data.products)
  }

  const getToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton
          slotProps={{
            tooltip: {
              sx: {
                '& .MuiInput-input': {
                  backgroundColor: 'transparent',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  padding: '4px 0px 5px',
                  height: '32px',
                },
                '& .MuiDataGrid-filterFormColumnInput': {
                  backgroundColor: 'transparent',
                },
              },
            },
          }}
        />
        <GridToolbarExport />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  };

  return (
    <div className={'w-full'}>
      <MuiDataGrid
        columns={columns}
        rows={rows}
        slots={{ toolbar: getToolbar }}
        rowHeight={114}
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
