import {DEFAULT_GRID_COL_DEF, MainContent, MuiDataGrid} from "@coldpbc/components";
import {useRegulations} from "@coldpbc/hooks";
import {GridColDef} from "@mui/x-data-grid-pro";
import {useNavigate} from "react-router-dom";
import {RegulationCategory, RegulationStatus, RegulationSubcategory, YesNo} from "@coldpbc/enums";
import React, {useMemo} from "react";

/**
 * StatusBadge component for displaying regulation status
 */
const StatusBadge: React.FC<{ status: RegulationStatus }> = ({ status }) => {
  const colorClass = status === RegulationStatus.InEffect
    ? 'text-green-200'
    : 'text-gray-200';

  return (
    <span className={`px-2 py-1 rounded-full text-body ${colorClass}`}>
      {status}
    </span>
  );
};

const ProductTypeEligibility: React.FC<{ eligibility: string }> = ({ eligibility }) => {

  return (
    <div className={'w-full h-full text-body items-center flex text-wrap break-words'}>
      <span className={'line-clamp-3'}>{eligibility}</span>
    </div>
  )
}

export const RegulatoryCompliance = () => {
  const navigate = useNavigate();
  const { filteredRegulations } = useRegulations();

  const columns: GridColDef[] = [
    { ...DEFAULT_GRID_COL_DEF, field: 'Regulation', headerName: 'Regulation', width: 200 },
    { ...DEFAULT_GRID_COL_DEF, field: 'Bill Number', headerName: 'Bill Number', width: 150 },
    { ...DEFAULT_GRID_COL_DEF, field: 'In Effect', headerName: 'In Effect', width: 100, renderCell: (params) => (<StatusBadge status={params.row["In Effect"]} />), type: 'singleSelect', valueOptions: Object.values(RegulationStatus)},
    { ...DEFAULT_GRID_COL_DEF, field: 'Jurisdiction', headerName: 'Jurisdiction', width: 150},
    { ...DEFAULT_GRID_COL_DEF, field: 'Effective', headerName: 'Effective', width: 150 },
    { ...DEFAULT_GRID_COL_DEF, field: 'Category', headerName: 'Category', width: 100, type: 'singleSelect', valueOptions: Object.values(RegulationCategory)},
    { ...DEFAULT_GRID_COL_DEF, field: 'Subcategory', headerName: 'Subcategory', width: 150, type: 'singleSelect', valueOptions: Object.values(RegulationSubcategory) },
    { ...DEFAULT_GRID_COL_DEF, field: 'Product Type Eligibility', headerName: 'Product Type Eligibility', minWidth: 300, flex: 1, renderCell: (params) => (<ProductTypeEligibility eligibility={params.row["Product Type Eligibility"]} />) },
    { ...DEFAULT_GRID_COL_DEF, field: 'Fees', headerName: 'Fees', width: 100 },
    { ...DEFAULT_GRID_COL_DEF, field: 'Penalties (Beyond Fees)', headerName: 'Penalties (Beyond Fees)', width: 200, type: 'singleSelect', valueOptions: Object.values(YesNo) },
  ]

  const rows = useMemo(() => {
    return filteredRegulations.map((regulation) => ({
      id: regulation.slug,
      ...regulation.regulation,
    }));
  }, [filteredRegulations])

  return (
    <MainContent
      title={'Regulatory Compliance'}
      className={'w-[calc(100%-100px)]'}
    >
      <MuiDataGrid
        rows={rows}
        columns={columns}
        onRowClick={(params) => {
          const id = params.row.id;
          navigate(`/regulatory_compliance/${id}`);
        }}
        rowHeight={72}
        columnHeaderHeight={72}
      />
    </MainContent>
  )

}
