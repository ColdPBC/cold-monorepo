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
			renderCell: (params) => params.value,
		},
		{
			field: 'assuranceStatus',
			headerName: 'Assurance Status',
			flex: 1,
			minWidth: 100,
      renderCell: params => {
        return <AttributeAssuranceStatusLabel status={params.value.status} effectiveEndDate={params.value.effectiveEndDate} />;
      },
		},
	];

  const rows: GridValidRowModel[] = sustainabilityAttribute.attributeAssurances.map(attributeAssurance => ({
    name: attributeAssurance.entity.name,
    assuranceStatus: {
      status: attributeAssurance.status,
      effectiveEndDate: attributeAssurance.effectiveEndDate,
    }
  }));

  return (
    <div className="flex flex-col gap-2">
      <span className="text-h4 text-tc-primary">Documentation</span>
      <AttributeAssuranceGraph sustainabilityAttribute={sustainabilityAttribute} />
      <div className={'w-full'}>
        <MuiDataGrid
          rows={rows}
          columns={columns}
          columnHeaderHeight={24}
          rowHeight={24}
        />
      </div>
    </div>
  );
};

export const SustainabilityCardExpandedView = withErrorBoundary(_SustainabilityCardExpandedView, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
