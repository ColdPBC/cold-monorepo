import { SupplierGraphQL, SustainabilityAttribute } from '@coldpbc/interfaces';
import {
  BulkEditAttributesForEntitiesSuppliedModal,
  Card,
  DEFAULT_GRID_COL_DEF,
  EditEntityAssociationsModal, EntitiesSelected,
  ErrorFallback,
  MuiDataGrid,
  SustainabilityAttributeColumnList,
} from '@coldpbc/components';
import {GridCellParams, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid-pro';
import {GRID_CHECKBOX_COL_DEF, processEntityLevelAssurances} from '@coldpbc/lib';
import { uniq } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {ButtonTypes, EntityLevel} from '@coldpbc/enums';
import {Checkbox} from "@mui/material";

interface ProductsSuppliedTabProps {
  supplier: SupplierGraphQL;
  refreshData: () => void;
}

const _ProductsSuppliedTab: React.FC<ProductsSuppliedTabProps> = ({ supplier, refreshData }) => {
  const [showBulkEditAttributesModal, setShowBulkEditAttributesModal] = React.useState<boolean>(false);
  const [rowsSelected, setRowsSelected] = useState<GridRowSelectionModel>([]);
  const navigate = useNavigate();

  const uniqCategories = uniq(supplier.products.map(product => product.productCategory || ''))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const uniqSubCategories = uniq(supplier.products.map(product => product.productSubcategory || ''))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const getProductsSelected = (): EntitiesSelected[] => {
    return rows
      .map(row => ({
        id: row.id,
        sustainabilityAttributes: row.sustainabilityAttributes,
      }))
      .filter(row =>
        rowsSelected.includes(row.id)
      )
  }

  const columns: GridColDef[] = [
    {
      ...GRID_CHECKBOX_COL_DEF,
      renderCell: (params: GridCellParams) => (
        <Checkbox
          data-testid={`select-checkbox-products-supplied-${params.row.id}`}
          checked={rowsSelected.includes(params.row.id) || false}
          onClick={() => setRowsSelected((prev) => {
            if (prev.includes(params.row.id)) {
              return prev.filter((id) => id !== params.row.id);
            } else {
              return [...prev, params.row.id];
            }
          })}
        />
      ),
      renderHeader: () => (
        <Checkbox
          data-testid={'select-all-checkbox-products-supplied'}
          checked={rowsSelected.length === rows.length && rowsSelected.length > 0}
          indeterminate={rowsSelected.length > 0 && rowsSelected.length < rows.length}
          onClick={() => {
            if(rowsSelected.length === rows.length) {
              setRowsSelected([]);
            } else if(rowsSelected.length > 0) {
              setRowsSelected([]);
            } else {
              setRowsSelected(rows.map(r => r.id));
            }
          }}
        />
      ),
    },
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
        {
          text: 'Bulk Edit Attributes',
          action: () => {
            setShowBulkEditAttributesModal(true);
          },
          variant: ButtonTypes.secondary,
          disabled: rowsSelected.length === 0,
        },
      ]}
    >
      <MuiDataGrid
        rows={rows}
        onCellClick={params => {
          if (params.field === 'checkbox') {
            return;
          }
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
      <BulkEditAttributesForEntitiesSuppliedModal
        show={showBulkEditAttributesModal}
        onClose={() => {
          setShowBulkEditAttributesModal(false);
          refreshData();
          setRowsSelected([]);
        }}
        entitiesSelected={getProductsSelected()}
        entityLevel={EntityLevel.PRODUCT}
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
