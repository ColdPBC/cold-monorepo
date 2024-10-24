import {
  DataGridCellHoverPopover,
  ErrorFallback,
  MuiDataGrid,
  Spinner,
  SustainabilityAttributeColumnList
} from "@coldpbc/components";
import {useAuth0Wrapper, useGraphQLSWR} from "@coldpbc/hooks";
import {ProductsQuery, SustainabilityAttribute, SustainabilityAttributeAssurance} from "@coldpbc/interfaces";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";
import React from "react";
import {get, uniq} from "lodash";
import {withErrorBoundary} from "react-error-boundary";
import {mapAttributeAssurancesToSustainabilityAttributes} from "@coldpbc/lib";
import {useFlags} from "launchdarkly-react-client-sdk";
import {useNavigate} from "react-router-dom";


const getColumnRows = (
  products: ProductsQuery[],
  flags: {
    [key: string]: boolean
  }) => {
  return products.map(product => {
    const extraAttributes: SustainabilityAttributeAssurance[] = [];

    if(flags.showEntitySustainabilityAttributesForRelatedEntitiesCold1128){
      extraAttributes.push(...product.organizationFacility?.attributeAssurances ?? []);
      extraAttributes.push(...product.productMaterials.map(prodMaterial => prodMaterial.material?.attributeAssurances ?? []).flat());
    }
    // get all attribute assurances for the product and related materials and tier 1 supplier
    const allAttributeAssurances: SustainabilityAttributeAssurance[] = [
      ...product.attributeAssurances,
      ...extraAttributes,
    ]

    const sustainabilityAttributes = mapAttributeAssurancesToSustainabilityAttributes(allAttributeAssurances);

    return {
      id: product.id,
      name: product.name,
      category: product.productCategory ?? '',
      subcategory: product.productSubcategory ?? '',
      description: product.description ?? '',
      sustainabilityAttributes: sustainabilityAttributes,
      tier1Supplier: product.organizationFacility?.name ?? '',
      seasonCode: product.seasonCode ?? '',
      upcCode: product.upcCode ?? '',
      brandProductId: product.brandProductId ?? '',
      supplierProductId: product.supplierProductId ?? '',
      materials: product.productMaterials.map(material => material.material?.name).filter((material): material is string => material !== null),
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
    const category = get(params, 'row.category', '')
    const subcategory = get(params, 'row.subcategory', '')
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
    id: string;
    name: string;
    category: string;
    subcategory: string;
    description: string;
    sustainabilityAttributes: SustainabilityAttribute[];
    tier1Supplier: string;
    seasonCode: string;
    upcCode: string;
    brandProductId: string;
    supplierProductId: string;
    materials: string[];
  }[] = []

  if(get(productsQuery.data, 'errors')) {
    rows = []
  }

  if(productsQuery.data && get(productsQuery.data, 'data.products', []).length > 0) {
    rows = getColumnRows(productsQuery.data.data.products, ldFlags)
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
        rowHeight={72}
        onRowClick={(params) => {
          if(ldFlags.showProductDetailPageCold1140){
            navigate(`/products/${params.id}`)
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
