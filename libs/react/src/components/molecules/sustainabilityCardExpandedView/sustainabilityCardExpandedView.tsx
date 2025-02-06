import React from 'react';
import { SustainabilityAttribute} from '@coldpbc/interfaces';
import {
  AttributeAssuranceStatusGraph,
  AttributeAssuranceStatusLabel, ColdIcon,
  ErrorFallback,
  MuiDataGrid, Popover,
} from '@coldpbc/components';
import {
  GridColDef,
  GridValidRowModel,
} from '@mui/x-data-grid-pro';
import { withErrorBoundary } from 'react-error-boundary';
import { toSentenceCase } from '@coldpbc/lib';
import { EntityLevel, IconNames } from '@coldpbc/enums';

interface SustainabilityCardExpandedViewProps {
  sustainabilityAttribute: SustainabilityAttribute;
  displayedOnEntityLevel?: EntityLevel;
}

const _SustainabilityCardExpandedView: React.FC<SustainabilityCardExpandedViewProps> = ({
  sustainabilityAttribute,
  displayedOnEntityLevel,
}) => {
  const nameColumn: GridColDef = {
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
  };

  const statusColumn: GridColDef = {
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
  };

  const tier2SupplierColumn: GridColDef = {
    field: 'supplierName',
    headerName: 'Supplier',
    flex: 1,
    minWidth: 100,
    renderHeader: (params) => (
      <div className="p-1 h-full flex items-center font-bold">{params.colDef.headerName}</div>
    ),
    renderCell: (params) => (
      <div className="p-1 h-full flex items-center">{params.value || ''}</div>
    ),
  };

  const showTier2SupplierColumn = (
    sustainabilityAttribute.level === EntityLevel.MATERIAL &&
      displayedOnEntityLevel !== EntityLevel.SUPPLIER
  )

  const columns = showTier2SupplierColumn
    ? [nameColumn, tier2SupplierColumn, statusColumn]
    : [nameColumn, statusColumn];

  const rows: GridValidRowModel[] = sustainabilityAttribute.attributeAssurances.map(attributeAssurance => ({
    id: attributeAssurance.entity.id,
    name: attributeAssurance.entity.name,
    supplierName: attributeAssurance.entity.supplierName, // Only expected on Materials
    assuranceStatus: {
      status: attributeAssurance.status,
      effectiveEndDate: attributeAssurance.effectiveEndDate,
    }
  }));

  return (
		<div className="w-full flex flex-col gap-2 p-4 rounded-b-2xl border-b border-l border-r border-gray-90 ">
			<div className="w-full flex gap-2 items-center">
				<span className="text-h4 text-tc-primary">Documentation</span>
				<Popover contentClassName="max-w-[260px]"
					content={'This documentation report shows the status of assurance documents for each material or supplier. Assurance documents can be active, expired, or missing.'}>
					<ColdIcon name={IconNames.ColdInfoIcon} />
				</Popover>
			</div>
			<AttributeAssuranceStatusGraph sustainabilityAttribute={sustainabilityAttribute} showHeader={false} />
			<div className="w-full rounded-xl overflow-hidden border border-gray-30">
				<MuiDataGrid rows={rows} columns={columns} columnHeaderHeight={32} rowHeight={32} hideFooter={true} disableColumnMenu={true} disableRowSelectionOnClick={true} />
			</div>
		</div>
	);
};

export const SustainabilityCardExpandedView = withErrorBoundary(_SustainabilityCardExpandedView, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
