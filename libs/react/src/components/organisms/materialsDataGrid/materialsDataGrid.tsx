import React, { useEffect, useState } from 'react';
import { MaterialsWithRelations } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import {
  BubbleList,
  ErrorFallback,
  MuiDataGrid,
  SustainabilityAttributeColumnList,
} from '@coldpbc/components';
import {
  GridColDef, GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { get, has, uniq } from 'lodash';
import { processEntityLevelAssurances } from '@coldpbc/lib';
import { withErrorBoundary } from 'react-error-boundary';
import { useFlags } from "launchdarkly-react-client-sdk";
import { useNavigate } from 'react-router-dom';

const _MaterialsDataGrid = () => {
  const ldFlags = useFlags();
  const navigate = useNavigate();
  const { orgId } = useAuth0Wrapper();

  // Pagination state
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
  });

  // Sorting state
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'name', sort: 'asc' }
  ]);


  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle search input changes
  const handleFilterChange = (filterModel: GridFilterModel) => {
    const searchValue = filterModel.quickFilterValues?.join(' ') || '';
    setSearchQuery(searchValue);
    setPaginationModel(prev => ({
      ...prev,
      page: 0,
    }));
  };

  // Build search filter
  const getSearchFilter = (searchQuery: string) => {
    const baseFilter = {
      organization: {
        id: orgId
      }
    };

    if (!searchQuery) {
      return baseFilter;
    }

    return {
      ...baseFilter,
      name_ilike: `%${searchQuery}%`,
    };
  };

  // Total count state
  const [totalRows, setTotalRows] = useState<number>(0);

  // Convert MUI sort model to GraphQL ordering
  const getOrderByInput = (sortModel: GridSortModel) => {
    if (!sortModel.length) return undefined;

    const [{ field, sort }] = sortModel;
    return {
      [field]: sort === 'asc' ? 'ASC' : 'DESC'
    };
  };

  // Prepare pagination input
  const paginationInput = {
    offset: paginationModel.page * paginationModel.pageSize,
    limit: paginationModel.pageSize,
    orderBy: getOrderByInput(sortModel)
  };

  const materialsQuery = useGraphQLSWR<{
    materials: MaterialsWithRelations[];
    totalCount: number;
  }>(orgId ? 'GET_PAGINATED_MATERIALS_FOR_ORG' : null, {
    filter: getSearchFilter(searchQuery),
    pagination: paginationInput
  });

  const [materials, setMaterials] = useState<MaterialsWithRelations[]>([]);

  useEffect(() => {
    if (materialsQuery.data) {
      if (has(materialsQuery.data, 'errors')) {
        setMaterials([]);
        setTotalRows(0);
      } else {
        const materials = get(materialsQuery.data, 'data.materials', []);
        const total = get(materialsQuery.data, 'data.materials_aggregate.count', 0);
        setMaterials(materials);
        setTotalRows(total);
      }
    }
  }, [materialsQuery.data]);

  const renderName = (params: any) => {
    const name = get(params, 'row.name', '')
    const category = get(params, 'row.materialCategory', '')
    const subcategory = get(params, 'row.materialSubcategory', '')
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
      .flatMap(material => material.productMaterials.map(productMaterial => productMaterial.product.organizationFacility?.name))
      .filter(name => name !== undefined),
  );

  const uniqTier2Suppliers = uniq(
    materials
      .map(material => material.materialSuppliers.filter(supplier => supplier.organizationFacility.supplierTier === 2).map(supplier => supplier.organizationFacility.name))
      .flat(),
  );

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
      renderCell: renderName,
      filterable: false,
    },
    {
      field: 'tier2Supplier',
      headerName: 'Tier 2 Supplier',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqTier2Suppliers,
      filterable: false,
      sortable: false,
    },
    {
      field: 'usedBy',
      headerName: 'Used By',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      type: 'singleSelect',
      valueOptions: uniqTier1Suppliers,
      valueFormatter: value => `[${(value as Array<string>).join(', ')}]`,
      renderCell: (params) => {
        return <BubbleList values={params.value as string[]} />;
      },
      minWidth: 350,
      flex: 1,
      filterable: false,
      sortable: false,
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
      filterable: false,
      sortable: false,
    },
    {
      field: 'materialCategory',
      headerName: 'Category',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqCategories,
      filterable: false,
    },
    {
      field: 'materialSubcategory',
      headerName: 'Sub Category',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqSubCategories,
      filterable: false,
    },
  ];

  const rows: GridValidRowModel[] = materials.map(material => ({
    id: material.id,
    name: material.name,
    materialCategory: material.materialCategory || '',
    materialSubcategory: material.materialSubcategory || '',
    sustainabilityAttributes: processEntityLevelAssurances([material]),
    tier2Supplier: material.materialSuppliers[0]?.organizationFacility?.name || '',
    usedBy: uniq(material.productMaterials
      .map(pm => pm.product.organizationFacility?.name)
      .filter(name => name !== undefined)
      .sort((a,b) => a.localeCompare(b)))
  }));

  return (
    <div className={'w-full'}>
      <MuiDataGrid
        loading={materialsQuery.isLoading}
        rows={rows}
        columns={columns}
        columnHeaderHeight={55}
        rowHeight={72}
        showManageColumns
        showExport
        showSearch
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[25, 50, 100]}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        paginationMode="server"
        sortingMode="server"
        rowCount={totalRows}
        onRowClick={(params) => {
          if(ldFlags.materialDetailPageCold997){
            navigate(`/materials/${params.id}`)
          }
        }}
        // Search props
        filterMode="server"
        onFilterModelChange={handleFilterChange}
        filterDebounceMs={500}
        slotProps={{
          toolbar: {
            quickFilterProps: {
              placeholder: 'Search by name...',
            }
          }
        }}
      />
    </div>
  );
};

export const MaterialsDataGrid = withErrorBoundary(_MaterialsDataGrid, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
