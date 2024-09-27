import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridTreeNodeWithRender,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { IconNames } from '@coldpbc/enums';
import { ColdIcon, MuiDataGrid, Spinner } from '@coldpbc/components';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import React, { useEffect, useState } from 'react';
import { SuppliersWithAssurances, SuppliersWithCertifications } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import { useNavigate } from 'react-router-dom';
import { get, has, isEqual, lowerCase, uniqWith, upperCase } from 'lodash';

export const SuppliersDataGrid = (props: { tier: number }) => {
  const { tier } = props;
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<SuppliersWithAssurances[]>([]);
  const { orgId } = useAuth0Wrapper();
  const suppliersQuery = useGraphQLSWR<{
    organizationFacilities: SuppliersWithAssurances[];
  }>(orgId ? 'GET_ALL_SUPPLIERS_FOR_ORG' : null, {
    filter: {
      organization: {
        id: orgId,
      },
      supplier: true,
      supplierTier: tier,
    },
  });

  useEffect(() => {
    if (suppliersQuery.data) {
      if (has(suppliersQuery.data, 'errors')) {
        setSuppliers([]);
      } else {
        const suppliers = get(suppliersQuery.data, 'data.organizationFacilities', []);
        setSuppliers(suppliers);
      }
    }
  }, [suppliersQuery.data]);

  if (suppliersQuery.isLoading) {
    return <Spinner />;
  }

  const renderCell = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    return (
      <div className={'h-full w-full flex flex-row items-center gap-[10px]'}>
        {params.value.map((object: string, index: number) => {
          return (
            <div key={index} className={'text-tc-primary text-body p-[4px] rounded-[32px] border-[1px] border-primary'}>
              {lowerCase(upperCase(object))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderHeader = (params: GridColumnHeaderParams<any, any, any>) => {
    // check if the header is materials or products
    // then return the appropriate icon with the header title: Materials or Products
    return (
      <div className={'h-full w-full flex flex-row items-center gap-[10px]'}>
        <ColdIcon name={tier === 1 ? IconNames.ColdProductsNavIcon : IconNames.ColdMaterialsNavIcon} />
        <div className={'text-tc-primary text-body font-bold'}>{tier === 1 ? 'Products' : 'Materials'}</div>
      </div>
    );
  };

  const uniqSusAttributes = uniqWith(
    suppliers
      .map(supplier =>
        supplier.attributeAssurances.map(assurance => {
          return assurance.sustainabilityAttribute.name;
        }),
      )
      .flat(),
    isEqual,
  );

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      renderCell: params => {
        return <div className={'text-body text-tc-primary font-bold truncate'}>{params.value}</div>;
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 180,
    },
    {
      // sustainability attributes
      field: 'sustainabilityAttributes',
      headerName: 'Sustainability Attributes',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      valueOptions: uniqSusAttributes,
      renderCell: renderCell,
    },
  ];

  if (tier === 1) {
    // add a products column
    columns.push({
      field: 'products',
      headerName: 'Products',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      renderCell: renderCell,
      renderHeader: renderHeader,
    });
  } else {
    // add a materials column

    columns.push({
      field: 'materials',
      headerName: 'Materials',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      renderCell: renderCell,
      renderHeader: renderHeader,
    });
  }

  const newRows: GridValidRowModel[] = [];

  suppliers.forEach((supplier, index) => {
    const susAttributes = supplier.attributeAssurances.map(assurance => assurance.sustainabilityAttribute.name);
    const row = {
      id: supplier.id,
      name: supplier.name,
      country: supplier.country,
      sustainabilityAttributes: susAttributes,
    };

    if (tier === 1) {
      row['products'] = [];
    } else {
      const uniqueMaterials = uniqWith(
        supplier.materialSuppliers.map(materialSupplier => materialSupplier.material.name),
        isEqual,
      );
      row['materials'] = uniqueMaterials;
    }
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
        onRowClick={params => {
          navigate(`/suppliers/${params.row.id}`);
        }}
        slots={{ toolbar: getToolbar }}
        columnHeaderHeight={55}
        rowHeight={55}
      />
    </div>
  );
};
