import { SupplierGraphQL, SustainabilityAttribute } from '@coldpbc/interfaces';
import {
  Card,
  DEFAULT_GRID_COL_DEF,
  EditEntityAssociationsModal,
  ErrorFallback,
  MuiDataGrid,
  SustainabilityAttributeColumnList,
} from '@coldpbc/components';
import { GridColDef } from '@mui/x-data-grid';
import { processEntityLevelAssurances } from '@coldpbc/lib';
import { uniq } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EntityLevel } from '@coldpbc/enums';

interface ProductsSuppliedTabProps {
  supplier: SupplierGraphQL;
  refreshData: () => void;
}

const _ProductsSuppliedTab: React.FC<ProductsSuppliedTabProps> = ({ supplier, refreshData }) => {
  const navigate = useNavigate();

  const uniqCategories = uniq(supplier.products.map(product => product.productCategory || ''))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const uniqSubCategories = uniq(supplier.products.map(product => product.productSubcategory || ''))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const columns: GridColDef[] = [
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'name',
      headerName: 'Product',
      flex: 1,
      minWidth: 230,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 230,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'seasonCode',
      headerName: 'Season',
      flex: 1,
      minWidth: 230,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'sustainabilityAttributes',
      headerName: 'Sustainability Attributes',
      flex: 1,
      minWidth: 300,
      renderCell: params => {
        return <SustainabilityAttributeColumnList sustainabilityAttributes={params.value as SustainabilityAttribute[]} />;
      },
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'productCategory',
      headerName: 'Category',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqCategories,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'productSubcategory',
      headerName: 'Sub Category',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqSubCategories,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'upcCode',
      headerName: 'UPC',
      flex: 1,
      minWidth: 230,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'brandProductId',
      headerName: 'Brand Product ID',
      flex: 1,
      minWidth: 230,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'supplierProductId',
      headerName: 'supplierProductId',
      flex: 1,
      minWidth: 230,
    },
  ];

  const rows = React.useMemo(() => supplier.products.map(product => {
    const sustainabilityAttributes = processEntityLevelAssurances([product]);
    return {
      ...product,
      sustainabilityAttributes,
    };
  }), [supplier]);

  return (
    <Card
      title={'Products Supplied'}
      className={'w-full'}
      data-testid={'products-supplied-tab-card'}
      ctas={[
          {
            child: <EditEntityAssociationsModal
              buttonText={'Edit Products'}
              refresh={refreshData}
              title={'Edit Products'}
              entityLevelToAdd={EntityLevel.PRODUCT}
              entityLevelToBeAddedTo={EntityLevel.SUPPLIER}
              entityToBeAddedId={supplier.id}
              saveButtonText={'Save'}
              idsSelected={rows.map(r => r.id)}
            />
          },
        ]}
    >
      <MuiDataGrid
        rows={rows}
        onRowClick={params => {
          navigate(`/products/${params.id}`);
        }}
        columns={columns}
        showSearch
        showManageColumns
        columnHeaderHeight={55}
        rowHeight={72}
        initialState={{
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }],
          },
        }}
        searchKey={`${supplier.id}productsSuppliedSearchValue`}
      />
    </Card>
  );
};

export const ProductsSuppliedTab = withErrorBoundary(_ProductsSuppliedTab, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ProductsSuppliedTab: ', error);
  },
});
