import React, { useEffect, useState } from 'react';
import { MaterialsWithRelations } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import { ErrorFallback, MuiDataGrid, Spinner } from '@coldpbc/components';
import {
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridTreeNodeWithRender,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { get, has, uniq } from 'lodash';
import { listFilterOperators } from '@coldpbc/lib';
import { useNavigate } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { HexColors } from '@coldpbc/themes';

const _MaterialsDataGrid = () => {
  const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<MaterialsWithRelations[]>([]);
  const materialsWithRelations = useGraphQLSWR(orgId ? 'GET_ALL_MATERIALS_FOR_ORG' : null, {
    filter: {
      organization: {
        id: orgId,
      },
    },
  });

  useEffect(() => {
    if (materialsWithRelations.data) {
      if (has(materialsWithRelations.data, 'errors')) {
        setMaterials([]);
      } else {
        const materials = get(materialsWithRelations.data, 'data.materials', []);
        setMaterials(materials);
      }
    }
  }, [materialsWithRelations.data]);
  const uniqSusAttributes = uniq(
    materials
      .map(material =>
        material.attributeAssurances.map(assurance => {
          return assurance.sustainabilityAttribute.name;
        }),
      )
      .flat(),
  );
  const uniqTier1Suppliers = uniq(
    materials
      .map(material => material.materialSuppliers.filter(supplier => supplier.organizationFacility.supplierTier === 1).map(supplier => supplier.organizationFacility.name))
      .flat(),
  );

  const uniqTier2Suppliers = uniq(
    materials
      .map(material => material.materialSuppliers.filter(supplier => supplier.organizationFacility.supplierTier === 2).map(supplier => supplier.organizationFacility.name))
      .flat(),
  );

  if (materialsWithRelations.isLoading) {
    return <Spinner />;
  }

  const renderSusAttributes = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    // loop through the array of suppliers and return the suppliers
    return (
      <div className={'h-full flex items-center text-body text-tc-primary font-bold gap-[10px] truncate'}>
        {params.value.map((supplier: string, index: number) => {
          return (
            <div key={index} className={'rounded-[32px] border-[1px] border-primary px-[12px] w-auto whitespace-nowrap'}>
              <span className={'text-body'}>{supplier}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      renderCell: params => {
        return <div className={'h-full flex items-center text-body text-tc-primary font-bold truncate'}>{params.value}</div>;
      },
    },
    {
      field: 'sustainabilityAttributes',
      headerName: 'Sustainability Attributes',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqSusAttributes,
      renderCell: renderSusAttributes,
      filterOperators: listFilterOperators,
      valueFormatter: value => `[${(value as Array<string>).join(', ')}]`,
    },
    {
      field: 'tier2Supplier',
      headerName: 'Tier 2 Supplier',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqTier2Suppliers,
    },
    {
      field: 'usedBy',
      headerName: 'Used By',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqTier1Suppliers,
    },
  ];

  const newRows: GridValidRowModel[] = [];

  materials.forEach(material => {
    const tier1Supplier = material.materialSuppliers.find(supplier => supplier.organizationFacility.supplierTier === 1);
    const tier2Supplier = material.materialSuppliers.find(supplier => supplier.organizationFacility.supplierTier === 2);
    const row = {
      id: material.id,
      name: material.name,
      sustainabilityAttributes: material.attributeAssurances.map(assurance => assurance.sustainabilityAttribute.name),
      tier2Supplier: tier2Supplier ? tier2Supplier.organizationFacility.name : '',
      usedBy: tier1Supplier ? tier1Supplier.organizationFacility.name : '',
    };
    newRows.push(row);
  });

  const rows: GridValidRowModel[] = newRows;

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
        rows={rows}
        columns={columns}
        slots={{ toolbar: getToolbar }}
        columnHeaderHeight={55}
        rowHeight={55}
      />
    </div>
  );
};

export const MaterialsDataGrid = withErrorBoundary(_MaterialsDataGrid, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
