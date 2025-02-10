import {Card, DEFAULT_GRID_COL_DEF, MaterialClassificationIcon, MuiDataGrid} from "@coldpbc/components"
import {ProductsQuery} from "@coldpbc/interfaces";
import {GridColDef} from "@mui/x-data-grid-pro";
import {get} from "lodash";
import {MaterialClassificationCategory} from "@coldpbc/enums";


export const ProductCarbonAccountingTab = (props: { product: ProductsQuery }) => {
  const { product } = props;

  const renderTotalEmissions = (params: any) => {
    const emissions: number = get(params, 'row.total_emissions', 0);
    if(emissions === 0) {
      return '';
    } else {
      return (
        <div className={'text-body flex flex-row gap-1 justify-end'}>
          <span className={'font-bold text-tc-primary'}>
            {(emissions).toFixed(2)}
          </span>
          <span className={'text-tc-secondary'}>
            kg CO2e
          </span>
        </div>
      )
    }
  }

  const renderWeight = (params: any) => {
    const weight: number = get(params, 'row.weight', 0);
    if(weight === 0) {
      return '';
    } else {
      return `${weight} g`;
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
      field: 'yield_with_uom',
      headerName: 'Yield',
      minWidth: 100,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'weight',
      headerName: 'Weight',
      minWidth: 100,
      renderCell: renderWeight,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'emissions_factor',
      headerName: 'Emissions Factor',
      minWidth: 200,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'total_emissions',
      headerName: 'Total Emissions',
      minWidth: 130,
      type: 'number',
      renderCell: renderTotalEmissions,
    },
  ]

  const rows = product.productMaterials.map((prodMaterial) => {
    return {
      id: prodMaterial.id,
      materialId: prodMaterial.material?.id,
      material: prodMaterial.material?.name,
      classification: prodMaterial.material.materialClassification,
      yield_with_uom: [prodMaterial.yield !== null ? parseFloat(prodMaterial.yield.toFixed(2)) : null, prodMaterial.unitOfMeasure].join(' '),
      weight: prodMaterial.weight ? prodMaterial.weight * 1000 : 0,
      emissions_factor: prodMaterial.material.emissionsFactor?.toFixed(1) || null,
      total_emissions: (prodMaterial.material.emissionsFactor && prodMaterial.weight)
        ? prodMaterial.material.emissionsFactor * prodMaterial.weight : 0,
    }
  })

  return (
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
            sortModel: [{ field: 'total_emissions', sort: 'desc' }],
          },
        }}
      />
    </Card>
  )
}
