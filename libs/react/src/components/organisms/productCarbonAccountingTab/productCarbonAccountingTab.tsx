import {
  CalculatedWeight,
  Card,
  DEFAULT_GRID_COL_DEF, EmissionsFactorDetailedExpandedView,
  MaterialClassificationIcon,
  MissingMaterialEmissionsCard,
  MuiDataGrid
} from "@coldpbc/components"
import {EmissionFactor, AggregatedEmissionFactor, ProductsQuery} from "@coldpbc/interfaces";
import {
  DataGridProProps,
  GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
  GRID_DETAIL_PANEL_TOGGLE_FIELD,
  GridColDef
} from "@mui/x-data-grid-pro";
import {get} from "lodash";
import {MaterialClassificationCategory} from "@coldpbc/enums";
import {HexColors} from "@coldpbc/themes";
import {useCallback, useMemo} from "react";
import {getCalculatedWeight, getAggregateEmissionFactors} from "@coldpbc/lib";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {twMerge} from "tailwind-merge";


export const ProductCarbonAccountingTab = (props: { product: ProductsQuery }) => {
  const { product } = props;

  const renderTotalEmissions = (params: any) => {
    const emissions: number = get(params, 'row.totalEmissions', 0);
    if(emissions === 0) {
      return '';
    } else {
      return (
        <div className={'text-body flex flex-row gap-1 justify-end h-full'}>
          <div className={'font-bold text-tc-primary self-center'}>
            {(emissions).toFixed(2)}
          </div>
          <div className={'text-tc-secondary self-center'}>
            kg CO2e
          </div>
        </div>
      )
    }
  }

  const renderClassification = (params: any) => {
    const classification: {
      id: string;
      name: string;
      category: MaterialClassificationCategory;
    } | null = get(params, 'row.classification', null);

    if(!classification) {
      return null;
    }

    return (
      <div className={'flex items-center gap-[10px] w-full h-full'}>
        <MaterialClassificationIcon materialClassificationCategory={classification.category}/>
        <div className={'text-body truncate'}>{classification.name}</div>
      </div>
    );
  }

  const renderEmissionsFactor = (params: any) => {
    const emissionFactorValue: number | null = get(params, 'row.emissionFactorValue', 0);
    return (
      <div className={'h-full w-full flex items-center'}>
        {emissionFactorValue ? emissionFactorValue : '--'}
      </div>
    )
  }

  const renderToggleDetailPanelContent = (params: any) => {
    // render the toggle button with ChevronDownIcon
    const isExpanded = params.value as boolean;
    // rotate the icon if the detail panel is expanded
    return (
      <div className={'w-full h-full flex items-center justify-center'}
           aria-label={'Expand'}
      >
        <ChevronDownIcon
          className={twMerge(
            'w-[20px] h-[20px] transition-transform duration-300',
            isExpanded ? 'transform rotate-180' : ''
          )}
        />
      </div>
    )
  }

  const columns: GridColDef[] = [
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'material',
      headerName: 'Material Name',
      minWidth: 230,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'classification',
      headerName: 'Classification',
      minWidth: 200,
      renderCell: renderClassification,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'yieldWithUom',
      headerName: 'Yield',
      minWidth: 100,
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
      field: 'emissionsFactorValue',
      headerName: 'Emissions Factor',
      minWidth: 200,
      renderCell: renderEmissionsFactor,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'totalEmissions',
      headerName: 'Total Emissions',
      minWidth: 130,
      type: 'number',
      renderCell: renderTotalEmissions,
    },
    {
      ...GRID_DETAIL_PANEL_TOGGLE_COL_DEF, // Already contains the right field
      renderCell: renderToggleDetailPanelContent,
    },
  ]

  const rows = useMemo(() => {
    return product.productMaterials.map((prodMaterial) => {
      const weightResult = getCalculatedWeight(prodMaterial);
      const calculatedWeight = get(weightResult, 'weightInKg');
      const emissionFactor = getAggregateEmissionFactors(prodMaterial.material.materialEmissionFactors);
      const emissionsFactorValue = emissionFactor?.value || null;
      const totalEmissions = (emissionFactor && calculatedWeight) ? emissionFactor.value * calculatedWeight : 0

      return {
        id: prodMaterial.id,
        materialId: prodMaterial.material?.id,
        material: prodMaterial.material?.name,
        classification: prodMaterial.material.materialClassification,
        yieldWithUom: [prodMaterial.yield !== null ? parseFloat(prodMaterial.yield.toFixed(2)) : null, prodMaterial.unitOfMeasure].join(' '),
        weight: calculatedWeight,
        weightResult: weightResult,
        emissionFactorValue: emissionsFactorValue,
        totalEmissions: totalEmissions,
        aggregatedEmissionFactors: emissionFactor,
      };
    });
  }, [product.productMaterials]);

  const getDetailPanelContent = useCallback<NonNullable<DataGridProProps['getDetailPanelContent']>>(({row}) => {
    const aggregatedEmissionFactor: AggregatedEmissionFactor | null = get(row, 'aggregatedEmissionFactors', null);
    const weight = get(row, 'weight',null)

    return (
      <EmissionsFactorDetailedExpandedView
        aggregateEmissionsFactors={aggregatedEmissionFactor}
        weight={weight}
        />
    )
  }, [])

  const getDetailPanelHeight = useCallback<NonNullable<DataGridProProps['getDetailPanelHeight']>>(() => {
    return 'auto';
  }, [])

  return (
    <div className={'w-full flex flex-col gap-[40px]'}>
      <MissingMaterialEmissionsCard productMaterials={product.productMaterials}/>
      <Card
        title={'Emissions By Material'}
        className={'w-full'}
        glow={false}
      >
        <MuiDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'totalEmissions', sort: 'desc' }],
            },
            pinnedColumns: {
              right: [GRID_DETAIL_PANEL_TOGGLE_FIELD]
            }
          }}
          getDetailPanelContent={getDetailPanelContent}
          getDetailPanelHeight={getDetailPanelHeight}
          sx={{
            '& .MuiDataGrid-columnHeader' : {
              backgroundColor: HexColors.gray["30"]
            }
          }}
          columnHeaderHeight={55}
          rowHeight={72}
          disableRowSelectionOnClick={true}
        />
      </Card>
    </div>
  )
}
