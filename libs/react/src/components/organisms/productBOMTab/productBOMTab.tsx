import { ProductsQuery, SustainabilityAttribute } from '@coldpbc/interfaces';
import { Card, ErrorFallback, MuiDataGrid, SustainabilityAttributeColumnList } from '@coldpbc/components';
import { GridColDef } from '@mui/x-data-grid';
import { processEntityLevelAssurances } from '@coldpbc/lib';
import {get, uniq} from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

export const DEFAULT_GRID_COL_DEF = {
	headerClassName: 'bg-gray-30 text-body',
};

const _ProductBOMTab = (props: { product: ProductsQuery }) => {
	const { product } = props;

  const renderName = (params: any) => {
    const name = get(params, 'row.material', '')
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


  const uniqCategories = uniq(
    product.productMaterials.map(productMaterial => productMaterial.material?.materialCategory || ''),
  ).filter(Boolean).sort( (a, b) => a.localeCompare(b));

  const uniqSubCategories = uniq(
    product.productMaterials.map(productMaterial => productMaterial.material?.materialSubcategory || ''),
  ).filter(Boolean).sort( (a, b) => a.localeCompare(b));

	const columns: GridColDef[] = [
		{
			...DEFAULT_GRID_COL_DEF,
			field: 'material',
			headerName: 'Material',
			flex: 1,
			minWidth: 230,
      renderCell: renderName,
		},
		{
			...DEFAULT_GRID_COL_DEF,
			field: 'tier2Supplier',
			headerName: 'Tier 2 Supplier',
			flex: 1,
			minWidth: 230,
		},
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'yield',
      headerName: 'Yield',
      flex: 1,
      minWidth: 70,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'unitOfMeasure',
      headerName: 'UoM',
      flex: 1,
      minWidth: 70,
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
      field: 'materialCategory',
      headerName: 'Category',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqCategories,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'materialSubcategory',
      headerName: 'Sub Category',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqSubCategories
    },
	];

	const rows: {
		id: string;
		materialId: string;
		material: string;
    materialCategory: string;
    materialSubcategory: string;
		tier2Supplier: string;
    yield: string;
    unitOfMeasure: string;
		sustainabilityAttributes: SustainabilityAttribute[];
	}[] = product.productMaterials
		.filter(productMaterial => productMaterial.material !== null)
		.map(productMaterial => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const material = productMaterial.material!;
			const susAttributes = processEntityLevelAssurances([material]);
			const tier2Supplier = get(material.materialSuppliers, '[0].organizationFacility.name', '');
			return {
				id: productMaterial.id,
				materialId: material.id,
				material: material.name,
        materialCategory: material.materialCategory || '',
        materialSubcategory: material.materialSubcategory || '',
				tier2Supplier: tier2Supplier,
        yield: productMaterial.yield ? productMaterial.yield.toString() : '',
        unitOfMeasure: productMaterial.unitOfMeasure || '',
				sustainabilityAttributes: susAttributes,
			};
		});

	return (
		<Card title={'Bill of Materials'} className={'w-full'} data-testid={'product-bom-tab-card'}>
			<MuiDataGrid
				rows={rows}
				columns={columns}
				showSearch
        showManageColumns
				columnHeaderHeight={55}
				rowHeight={72}
			/>
		</Card>
	);
};

export const ProductBOMTab = withErrorBoundary(_ProductBOMTab, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ProductBOMTab: ', error);
	},
});
