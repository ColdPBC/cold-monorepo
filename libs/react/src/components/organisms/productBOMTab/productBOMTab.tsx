import { ProductsQuery, SustainabilityAttribute } from '@coldpbc/interfaces';
import {
  Card,
  EditEntityAssociationsModal,
  ErrorFallback,
  MuiDataGrid,
  SustainabilityAttributeColumnList,
  ProductBOMTabSidebar, CalculatedWeight,
} from '@coldpbc/components';
import { GridColDef } from '@mui/x-data-grid-pro';
import { getCalculatedWeight, processEntityLevelAssurances } from '@coldpbc/lib';
import {get, uniq} from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import {useFlags} from "launchdarkly-react-client-sdk";
import { EntityLevel } from '@coldpbc/enums';

export const DEFAULT_GRID_COL_DEF = {
	headerClassName: 'bg-gray-30 text-body',
  flex: 1,
};

const _ProductBOMTab = (props: { product: ProductsQuery, refreshProduct: () => void }) => {
  const ldFlags = useFlags();

  const { product, refreshProduct } = props;
  const [selectedMaterial, setSelectedMaterial] = React.useState<
    {
      id: string;
      name: string;
      productMaterial: {
        id: string;
        yield: number | null;
        unitOfMeasure: string | null;
        weight: number | null;
      };
    }
    | undefined>(undefined);

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

  // Pre-calculate weights for all materials
  const materialWeights = React.useMemo(() => {
    return product.productMaterials.map(pm => ({
      productMaterialId: pm.id,
      weightResult: getCalculatedWeight(pm),
    }));
  }, [product.productMaterials]);

  // Calculate total weight once
  const totalWeight = React.useMemo(() => {
    return materialWeights.reduce((total, { weightResult }) => total + (get(weightResult, 'weightInKg') || 0), 0);
  }, [materialWeights]);

  const uniqCategories = uniq(
    product.productMaterials.map(productMaterial => productMaterial.material?.materialCategory || ''),
  ).filter(Boolean).sort( (a, b) => a.localeCompare(b));

  const uniqSubCategories = uniq(
    product.productMaterials.map(productMaterial => productMaterial.material?.materialSubcategory || ''),
  ).filter(Boolean).sort( (a, b) => a.localeCompare(b));

  const productCarbonFootprintColumns: GridColDef[] = ldFlags.productCarbonFootprintMvp ? (
    [
      {
        ...DEFAULT_GRID_COL_DEF,
        field: 'emissionsFactor',
        headerName: 'Factor',
        minWidth: 70,
      },
      {
        ...DEFAULT_GRID_COL_DEF,
        field: 'emissions',
        headerName: 'Emissions',
        minWidth: 100,
      },
    ]
  ) : (
    []
  );

	const columns: GridColDef[] = [
		{
			...DEFAULT_GRID_COL_DEF,
			field: 'material',
			headerName: 'Material',
			minWidth: 230,
      renderCell: renderName,
		},
		{
			...DEFAULT_GRID_COL_DEF,
			field: 'tier2Supplier',
			headerName: 'Tier 2 Supplier',
			minWidth: 230,
		},
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'yield',
      headerName: 'Yield',
      minWidth: 70,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'unitOfMeasure',
      headerName: 'UoM',
      minWidth: 70,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'weight',
      headerName: 'Weight',
      minWidth: 100,
      renderCell: params => {
        return <CalculatedWeight weightResult={params.row.weightResult} />;
      },
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'percent_weight',
      headerName: 'Weight (%)',
      minWidth: 100,
    },
    ...productCarbonFootprintColumns,
		{
			...DEFAULT_GRID_COL_DEF,
			field: 'sustainabilityAttributes',
			headerName: 'Sustainability Attributes',
			minWidth: 300,
			renderCell: params => {
				return <SustainabilityAttributeColumnList sustainabilityAttributes={params.value as SustainabilityAttribute[]} />;
			},
		},
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'materialCategory',
      headerName: 'Category',
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqCategories,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'materialSubcategory',
      headerName: 'Sub Category',
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqSubCategories
    },
	];

  const rows = React.useMemo(() => {
    return product.productMaterials
      .filter(productMaterial => productMaterial.material !== null)
      .map(productMaterial => {
        const material = productMaterial.material;
        const susAttributes = processEntityLevelAssurances([material]);
        const tier2Supplier = material.organizationFacility?.name || '';
        const weightResult = materialWeights.find(w => w.productMaterialId === productMaterial.id)?.weightResult;

        return {
          id: material.id,
          productMaterialId: productMaterial.id,
          material: material.name,
          materialCategory: material.materialCategory || '',
          materialSubcategory: material.materialSubcategory || '',
          tier2Supplier: tier2Supplier,
          yield: productMaterial.yield ? productMaterial.yield.toString() : '',
          unitOfMeasure: productMaterial.unitOfMeasure || '',
          weight: get(weightResult, 'weightInKg'),
          weightResult: weightResult,
          percent_weight: weightResult && 'weightInKg' in weightResult && totalWeight > 0 ? `${((weightResult.weightInKg / totalWeight) * 100).toFixed(0)}%` : null,
          emissionsFactor: material.emissionsFactor?.emissionsFactor,
          emissions: weightResult && 'weightInKg' in weightResult && material.emissionsFactor ? (weightResult.weightInKg * material.emissionsFactor.emissionsFactor).toFixed(2) : null,
          sustainabilityAttributes: susAttributes,
        };
      });
  }, [product.productMaterials, materialWeights, totalWeight]);

  const closeBomDetailSidebar = () => {
    setSelectedMaterial(undefined);
  }

  const openSidebar = (productMaterialId: string) => {
    const productMaterial = product.productMaterials.find(pm => pm.id === productMaterialId);
    if(productMaterial) {
      setSelectedMaterial({
        id: productMaterial.material?.id || '',
        name: productMaterial.material?.name || '',
        productMaterial: {
          id: productMaterial.id,
          yield: productMaterial.yield,
          unitOfMeasure: productMaterial.unitOfMeasure,
          weight: productMaterial.weight,
        },
      });
    }
  }

  return (
    <Card
      title={'Bill of Materials'}
      className={'w-full'}
      data-testid={'product-bom-tab-card'}
      ctas={[
        {
          child: <EditEntityAssociationsModal
            buttonText={'Edit Materials'}
            refresh={refreshProduct}
            title={'Edit Materials'}
            entityLevelToAdd={EntityLevel.MATERIAL}
            entityLevelToBeAddedTo={EntityLevel.PRODUCT}
            entityToBeAddedId={product.id}
            saveButtonText={'Save'}
            idsSelected={rows.map(r => r.id)}
          />
        }
      ]}
    >
			<MuiDataGrid
				rows={rows}
        onRowClick={(params) => {
          openSidebar(params.row.productMaterialId);
        }}
				columns={columns}
				showSearch
        showManageColumns
				columnHeaderHeight={55}
				rowHeight={72}
        initialState={{
          sorting: {
            sortModel: [{ field: 'material', sort: 'asc' }],
          },
        }}
        searchKey={`${product.id}productBOMSearchValue`}
			/>
      {
        selectedMaterial && (
          <ProductBOMTabSidebar
            productId={product.id}
            material={selectedMaterial}
            closeSidebar={closeBomDetailSidebar}
            refresh={refreshProduct}
          />
        )
      }
		</Card>
	);
};

export const ProductBOMTab = withErrorBoundary(_ProductBOMTab, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ProductBOMTab: ', error);
	},
});
