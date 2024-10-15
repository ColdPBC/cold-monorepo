import {DataGridCellHoverPopoverWrap, MuiDataGrid, Spinner} from "@coldpbc/components";
import {useAuth0Wrapper, useGraphQLSWR} from "@coldpbc/hooks";
import {ProductsQuery} from "@coldpbc/interfaces";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";
import React from "react";
import {get} from "lodash";


const getColumnRows = (products: ProductsQuery[]) => {
  // get sustainability attributes for each product
  return products.map(product => {
    return {
      id: product.id,
      name: product.name,
      sustainabilityAttributes: product.attributeAssurances.map(attribute => attribute.sustainabilityAttribute.name),
      tier1Supplier: product.organizationFacility?.name ?? '',
      materials: product.productMaterials.map(material => material.material?.name).filter((material): material is string => material !== null),
      upcCode: product.upcCode ?? '',
      styleCode: product.styleCode ?? '',
      seasonCode: product.seasonCode ?? '',
    }
  })
}

export const ProductsDataGrid = () => {
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

  const columns = [
    // default columns
    // columns: Name, Sustainability Attributes, Tier 1 Supplier, Materials
    {
      ...defaultColumnProperties,
      field: 'name',
      headerName: 'Name',
      width: 200
    },
    {
      ...defaultColumnProperties,
      field: 'sustainabilityAttributes',
      headerName: 'Sustainability Attributes',
      flex: 1,
      minWidth: 250,
      renderCell: (params) => {
        return (
          <DataGridCellHoverPopoverWrap params={params} />
        )
      },
    },
    {
      ...defaultColumnProperties,
      field: 'tier1Supplier',
      headerName: 'Tier 1 Supplier',
      width: 200,
    },
    {
      ...defaultColumnProperties,
      field: 'materials', headerName: 'Materials',
      flex: 1,
      minWidth: 250,
      renderCell: (params) => {
        return (
          <DataGridCellHoverPopoverWrap params={params} />
        )
      },
    },
    {
      ...defaultColumnProperties,
      field: 'upcCode',
      headerName: 'UPC',
      width: 200,
    },
    {
      ...defaultColumnProperties,
      field: 'styleCode',
      headerName: 'Style',
      width: 200,
    },
    {
      ...defaultColumnProperties,
      field: 'seasonCode',
      headerName: 'Season',
      width: 200,
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
        rowHeight={114}
        slots={{ toolbar: getToolbar }}
      />
    </div>
  )
}
