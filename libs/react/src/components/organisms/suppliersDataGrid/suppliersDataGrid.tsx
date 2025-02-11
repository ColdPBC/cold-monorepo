import {
  GridColDef,
  GridColumnHeaderParams,
  GridValidRowModel,
} from '@mui/x-data-grid-pro';
import { IconNames } from '@coldpbc/enums';
import {
  ColdIcon,
  BubbleList,
  MuiDataGrid,
  SustainabilityAttributeColumnList,
} from '@coldpbc/components';
import React, { useEffect, useState } from 'react';
import {
  EntityWithAttributeAssurances,
  SuppliersDataGridGraphQL,
} from '@coldpbc/interfaces';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import { useNavigate } from 'react-router-dom';
import { get, has, isEqual, uniqWith } from 'lodash';
import { listFilterOperators, listSortComparator, processEntityLevelAssurances } from '@coldpbc/lib';

export const SuppliersDataGrid = (props: { tier: number }) => {
  const { tier } = props;
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<SuppliersDataGridGraphQL[]>([]);
  const { orgId } = useAuth0Wrapper();
  const suppliersQuery = useGraphQLSWR<{
    organizationFacilities: SuppliersDataGridGraphQL[];
  }>(orgId ? 'GET_ALL_SUPPLIERS_FOR_ORG' : null, {
    filter: {
      organization: {
        id: orgId,
      },
      supplier: true,
    },
  });

  useEffect(() => {
    if (suppliersQuery.data) {
      if (has(suppliersQuery.data, 'errors')) {
        setSuppliers([]);
      } else {
        const suppliers = get(suppliersQuery.data, 'data.organizationFacilities', []).filter(
          (supplier: SuppliersDataGridGraphQL) => supplier.supplierTier === tier,
        )
        setSuppliers(suppliers);
      }
    }
  }, [suppliersQuery.data, tier]);

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
      cellClassName: 'text-body text-tc-primary font-bold truncate'
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
      valueOptions: uniqSusAttributes,
      renderCell: (params) => {
        return <SustainabilityAttributeColumnList sustainabilityAttributes={params.value} />;
      },
      type: 'singleSelect',
      sortComparator: listSortComparator,
      filterOperators: listFilterOperators,
      minWidth: 350,
      flex: 1,
    },
  ];

  if (tier === 1) {
    const uniqProducts = uniqWith(
      suppliers
        .map(supplier => supplier.products.map(product => product.name))
        .flat(),
      isEqual,
    );
    // add a products column
    columns.push({
      field: 'products',
      headerName: 'Products',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      renderCell: (params) => {
        return <BubbleList values={params.value as string[]} />;
      },
      renderHeader: renderHeader,
      type: 'singleSelect',
      sortComparator: listSortComparator,
      filterOperators: listFilterOperators,
      valueOptions: uniqProducts,
      minWidth: 350,
      flex: 1,
    });
  } else {
    const uniqMaterials = uniqWith(
      suppliers.map(supplier => supplier.materials.map(material => material.name)),
      isEqual,
    );
    columns.push({
      field: 'materials',
      headerName: 'Materials',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      renderCell: (params) => {
        return <BubbleList values={params.value as string[]} />;
      },
      renderHeader: renderHeader,
      type: 'singleSelect',
      sortComparator: listSortComparator,
      filterOperators: listFilterOperators,
      valueOptions: uniqMaterials,
      minWidth: 350,
      flex: 1,
    });
  }

  const newRows: GridValidRowModel[] = [];

  suppliers.forEach((supplier, index) => {
    const entitiesWithAttributeAssurances: EntityWithAttributeAssurances[] = [supplier];

    if(tier === 2) {
      entitiesWithAttributeAssurances.push(...supplier.materials);
    }

    const sustainabilityAttributes = processEntityLevelAssurances(entitiesWithAttributeAssurances);

    const row = {
      id: supplier.id,
      name: supplier.name,
      country: supplier.country ?? '',
      sustainabilityAttributes: sustainabilityAttributes,
    };

    if (tier === 1) {
      row['products'] = supplier.products.map(product => product.name);
    } else {
      row['materials'] = supplier.materials.map(material => material.name);
    }
    newRows.push(row);
  });

  const rows: GridValidRowModel[] = newRows;

  return (
    <div className={'w-full'}>
      <MuiDataGrid
        loading={suppliersQuery.isLoading}
        rows={rows}
        columns={columns}
        onRowClick={params => {
          navigate(`/suppliers/${params.row.id}`);
        }}
        columnHeaderHeight={55}
        rowHeight={72}
        showManageColumns
        showExport
        showSearch
        initialState={{
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }],
          },
        }}
        searchKey={`${tier}TierSuppliersDataGridSearchValue`}
      />
    </div>
  );
};
