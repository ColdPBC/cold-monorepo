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
import { IconNames } from '@coldpbc/enums';
import {
  ColdIcon,
  DataGridCellHoverPopover,
  MuiDataGrid,
  Spinner,
  SustainabilityAttributeColumnList,
} from '@coldpbc/components';
import React, { useEffect, useState } from 'react';
import {
  EntityWithAttributeAssurances,
  SuppliersWithAssurances,
  SustainabilityAttributeAssuranceGraphQL,
} from '@coldpbc/interfaces';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import { useNavigate } from 'react-router-dom';
import { get, has, isEqual, uniqWith } from 'lodash';
import { listFilterOperators, listSortComparator, processEntityLevelAssurances } from '@coldpbc/lib';
import {useFlags} from "launchdarkly-react-client-sdk";
import { AttributeAssuranceMock } from '@coldpbc/mocks';

export const SuppliersDataGrid = (props: { tier: number }) => {
  const ldFlags = useFlags();
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
    },
  });

  useEffect(() => {
    if (suppliersQuery.data) {
      if (has(suppliersQuery.data, 'errors')) {
        setSuppliers([]);
      } else {
        const suppliers = get(suppliersQuery.data, 'data.organizationFacilities', []).filter(
          (supplier: SuppliersWithAssurances) => supplier.supplierTier === tier,
        )
        setSuppliers(suppliers);
      }
    }
  }, [suppliersQuery.data, tier]);

  if (suppliersQuery.isLoading) {
    return <Spinner />;
  }

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
        return <DataGridCellHoverPopover params={params} />;
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
      suppliers
        .map(supplier => supplier.materialSuppliers.map(materialSupplier => materialSupplier.material.name))
        .flat(),
      isEqual,
    );
    columns.push({
      field: 'materials',
      headerName: 'Materials',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      renderCell: (params) => {
        return <DataGridCellHoverPopover params={params} />;
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

    if(ldFlags.showEntitySustainabilityAttributesForRelatedEntitiesCold1128 && tier === 2) {
      const materials = supplier.materialSuppliers.map(materialSupplier => materialSupplier.material)
      entitiesWithAttributeAssurances.push(...materials);
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
      row['materials'] = supplier.materialSuppliers.map(materialSupplier => materialSupplier.material.name);
    }
    newRows.push(row);
  });

  const rows: GridValidRowModel[] = newRows;

  return (
    <div className={'w-full'}>
      <MuiDataGrid
        rows={rows}
        columns={columns}
        onRowClick={params => {
          // navigate(`/suppliers/${params.row.id}`);
          // todo: add back in when the supplier detail page is ready
        }}
        columnHeaderHeight={55}
        rowHeight={72}
        showManageColumns
        showExport
        showSearch
      />
    </div>
  );
};
