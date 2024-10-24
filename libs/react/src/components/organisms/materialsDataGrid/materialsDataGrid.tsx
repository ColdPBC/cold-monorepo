import React, { useEffect, useState } from 'react';
import {MaterialsWithRelations, SustainabilityAttributeAssurance} from '@coldpbc/interfaces';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import {
  DataGridCellHoverPopover,
  ErrorFallback,
  MuiDataGrid,
  Spinner,
  SustainabilityAttributeColumnList,
} from '@coldpbc/components';
import {
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridValidRowModel,
} from '@mui/x-data-grid';
import {filter, get, has, uniq} from 'lodash';
import {listFilterOperators, listSortComparator, mapAttributeAssurancesToSustainabilityAttributes} from '@coldpbc/lib';
import { withErrorBoundary } from 'react-error-boundary';
import {useFlags} from "launchdarkly-react-client-sdk";

const _MaterialsDataGrid = () => {
  const ldFlags = useFlags();
  const { orgId } = useAuth0Wrapper();
  const [materials, setMaterials] = useState<MaterialsWithRelations[]>([]);
  const materialsWithRelations = useGraphQLSWR<{
    materials: MaterialsWithRelations[];
  }>(orgId ? 'GET_ALL_MATERIALS_FOR_ORG' : null, {
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
      .map(material => material.productMaterials.map(productMaterial => productMaterial.product.organizationFacility.name)),
  );

  const uniqTier2Suppliers = uniq(
    materials
      .map(material => material.materialSuppliers.filter(supplier => supplier.organizationFacility.supplierTier === 2).map(supplier => supplier.organizationFacility.name))
      .flat(),
  );

  if (materialsWithRelations.isLoading) {
    return <Spinner />;
  }

  const uniqCategories = uniq(
		materials.map(material =>  material.materialCategory || ''),
  ).filter(Boolean).sort( (a, b) => a.localeCompare(b));

  const uniqSubCategories = uniq(
    materials.map(material =>  material.materialSubcategory || ''),
  ).filter(Boolean).sort( (a, b) => a.localeCompare(b));

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
      field: 'materialCategory',
      headerName: 'Category',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqCategories,
    },
    {
      field: 'materialSubcategory',
      headerName: 'Sub Category',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqSubCategories,
    },
    {
      field: 'sustainabilityAttributes',
      headerName: 'Sustainability Attributes',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      type: 'singleSelect',
      valueOptions: uniqSusAttributes,
      valueFormatter: value => `[${(value as Array<string>).join(', ')}]`,
      renderCell: (params) => {
        return <SustainabilityAttributeColumnList sustainabilityAttributes={params.value} />;
      },
      minWidth: 206,
      flex: 1,
      sortComparator: listSortComparator,
      filterOperators: listFilterOperators,
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
      type: 'singleSelect',
      valueOptions: uniqTier1Suppliers,
      valueFormatter: value => `[${(value as Array<string>).join(', ')}]`,
      renderCell: (params) => {
        return <DataGridCellHoverPopover params={params} />;
      },
      minWidth: 350,
      flex: 1,
      sortComparator: listSortComparator,
      filterOperators: listFilterOperators,
    },
  ];

  const newRows: GridValidRowModel[] = [];

  materials.forEach(material => {
    // For now, we just grab the tier 1 supplier of the first product that uses the material
    const tier1Suppliers = material.productMaterials.map(pm => pm.product.organizationFacility);
    // While the database schema allows for multiple MaterialSuppliers, we insist on 1 per Material
    const tier2Supplier = material.materialSuppliers[0]?.organizationFacility;

    const extraAttributes: SustainabilityAttributeAssurance[] = [];

    if(ldFlags.showEntitySustainabilityAttributesForRelatedEntitiesCold1128){
      extraAttributes.push(...material.productMaterials.map(pm => pm.product.attributeAssurances).flat());
      extraAttributes.push(...tier2Supplier?.attributeAssurances || []);
    }
    // get all related attribute assurances from the related entities
    const allRelatedAttributeAssurances = [
      ...material.attributeAssurances,
      ...extraAttributes,
    ]
    const sustainabilityAttributes = mapAttributeAssurancesToSustainabilityAttributes(allRelatedAttributeAssurances);

    const row = {
      id: material.id,
      name: material.name,
      materialCategory: material.materialCategory || '',
      materialSubcategory: material.materialSubcategory || '',
      sustainabilityAttributes: sustainabilityAttributes,
      tier2Supplier: tier2Supplier ? tier2Supplier.name : '',
      usedBy: uniq(tier1Suppliers.map(supplier => supplier.name).sort((a,b) => a.localeCompare(b))),
    };
    newRows.push(row);
  });

  const rows: GridValidRowModel[] = newRows;

  return (
    <div className={'w-full'}>
      <MuiDataGrid
        rows={rows}
        columns={columns}
        columnHeaderHeight={55}
        rowHeight={114}
        showManageColumns
        showExport
        showSearch
      />
    </div>
  );
};

export const MaterialsDataGrid = withErrorBoundary(_MaterialsDataGrid, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
