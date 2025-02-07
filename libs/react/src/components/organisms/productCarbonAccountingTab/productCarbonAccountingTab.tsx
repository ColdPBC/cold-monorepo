import {Card, DEFAULT_GRID_COL_DEF, MuiDataGrid} from "@coldpbc/components"
import {ProductsQuery} from "@coldpbc/interfaces";
import {GridColDef} from "@mui/x-data-grid-pro";
import {get} from "lodash";


export const ProductCarbonAccountingTab = (props: { product: ProductsQuery }) => {
  const { product } = props;

  const renderTotalEmissions = (params: any) => {
    const emissions: number = get(params, 'row.total_emissions', 0);
    if(emissions === 0) {
      return '';
    } else {
      return `${(emissions/1000).toFixed(2)} kg CO2e`;
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
      type: 'number',
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

  const rows = product.productMaterials.map((prodMaterial, index) => {
    return {
      id: prodMaterial.id,
      materialId: prodMaterial.material?.id,
      material: prodMaterial.material?.name,
      classification: prodMaterial.material.materialClassification?.name,
      yield_with_uom: [prodMaterial.yield, prodMaterial.unitOfMeasure].join(' '),
      weight: prodMaterial.weight || 0,
      emissions_factor: prodMaterial.material.emissionsFactor?.toFixed(2) || null,
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
