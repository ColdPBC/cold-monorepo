import React from 'react';
import { SustainabilityAttribute} from '@coldpbc/interfaces';
import {
  AttributeAssuranceGraph,
  AttributeAssuranceStatusLabel,
  ErrorFallback,
  MuiDataGrid,
} from '@coldpbc/components';
import {
  GridColDef,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { withErrorBoundary } from 'react-error-boundary';
import { toSentenceCase } from '@coldpbc/lib';
import { EntityLevel } from '@coldpbc/enums';

interface SustainabilityCardExpandedViewProps {
  sustainabilityAttribute: SustainabilityAttribute;
}

const _SustainabilityCardExpandedView: React.FC<SustainabilityCardExpandedViewProps> = ({
  sustainabilityAttribute
}) => {
  const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: toSentenceCase(EntityLevel[sustainabilityAttribute.level]),
			headerClassName: 'text-body text-tc-primary truncate',
			flex: 1,
			minWidth: 100,
      renderHeader: (params) => (
        <div className="p-1 h-full flex items-center font-bold">{params.colDef.headerName}</div>
      ),
      renderCell: (params) => (
        <div className="p-1 h-full flex items-center">{params.value}</div>
      ),
		},
		{
			field: 'assuranceStatus',
			headerName: 'Assurance Status',
			flex: 1,
			minWidth: 100,
      renderHeader: (params) => (
        <div className="p-1 h-full flex items-center font-bold">{params.colDef.headerName}</div>
      ),
      renderCell: (params) => (
        <div className="p-1 h-full flex items-center">
          <AttributeAssuranceStatusLabel
            status={params.value.status}
            effectiveEndDate={params.value.effectiveEndDate}
          />
        </div>
      ),
		},
	];

  const rows: GridValidRowModel[] = sustainabilityAttribute.attributeAssurances.map(attributeAssurance => ({
    id: attributeAssurance.entity.id,
    name: attributeAssurance.entity.name,
    assuranceStatus: {
      status: attributeAssurance.status,
      effectiveEndDate: attributeAssurance.effectiveEndDate,
    }
  }));

  return (
    <div className="w-full flex flex-col gap-2 p-4 rounded-b-2xl border-b border-l border-r border-gray-90 ">
      <span className="text-h4 text-tc-primary">Documentation</span>
      <AttributeAssuranceGraph sustainabilityAttribute={sustainabilityAttribute} showHeader={false} />
      <div className="w-full rounded-xl overflow-hidden border border-gray-30">
        <MuiDataGrid
          rows={rows}
          columns={columns}
          columnHeaderHeight={32}
          rowHeight={32}
          hideFooter={true}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
        />
      </div>
    </div>
  );
};

export const SustainabilityCardExpandedView = withErrorBoundary(_SustainabilityCardExpandedView, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
