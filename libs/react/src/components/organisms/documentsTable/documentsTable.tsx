import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridRowParams, GridTreeNodeWithRender, GridValidRowModel, MuiEvent } from '@mui/x-data-grid';
import { ClaimStatus, IconNames } from '@coldpbc/enums';
import { ColdIcon, ErrorFallback, MUIDataGridNoRowsOverlay } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';
import { differenceInDays, format } from 'date-fns';
import { capitalize } from 'lodash';
import React from 'react';
import {get, lowerCase, startCase, toArray, uniqWith} from 'lodash';
import { Claims, FilesWithAssurances } from '@coldpbc/interfaces';
import {
  addTZOffset,
  getDateActiveStatus,
  getEffectiveEndDate,
  getFileProcessingStatus,
  listFilterOperators,
  listSortComparator
} from '@coldpbc/lib';
import { withErrorBoundary } from 'react-error-boundary';
import { useColdContext } from '@coldpbc/hooks';
import { twMerge } from 'tailwind-merge';

const _DocumentsTable = (props: { files: FilesWithAssurances[]; sustainabilityAttributes: Claims[]; selectDocument: (id: string) => void }) => {
	const { files, sustainabilityAttributes, selectDocument } = props;
	const { logBrowser } = useColdContext();

  const renderName = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const file = files.find(file => file.id === params.row.id);
    const fileStatus = getFileProcessingStatus(file);
    let className = 'text-tc-primary font-bold';
    if (fileStatus === 'uploaded') {
      className = 'text-tc-disabled font-bold';
    }
    return <div className={twMerge('overflow-hidden text-ellipsis ', className)}>{params.value}</div>;
  };

  const renderUploadDate = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const file = files.find(file => file.id === params.row.id);
    const fileStatus = getFileProcessingStatus(file);
    let className = 'text-tc-secondary';
    if (fileStatus === 'uploaded') {
      className = 'text-tc-disabled';
    }
    let dateString = '--';
    if (params.value.getTime() !== new Date(0).getTime()) {
      dateString = format(new Date(params.value), 'M/d/yy h:mm a');
    }
    return (
      <div data-chromatic="ignore" className={twMerge('w-full h-full flex flex-row justify-start items-center', className)}>
        {dateString}
      </div>
    );
  };

  const renderStatus = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const file = files.find(file => file.id === params.row.id);
    const fileStatus = getFileProcessingStatus(file);
    if (fileStatus === 'uploaded') {
      return (
        <div className={'w-full h-full py-[16px] px-[0px]'}>
          <div
            className={'w-full h-full flex flex-row rounded-[8px] animate-pulsate'}
            style={{
              background: 'linear-gradient(90deg, rgba(255, 241, 102, 0.20) 0%, rgba(255, 241, 102, 0.40) 100%)',
            }}></div>
        </div>
      );
    } else {
      // if the value is null return null
      const expirationDate: string | null = params.row.expiration_date;
      let diff = 0;

      switch (params.value) {
        case ClaimStatus.Expired:
          return (
            <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px] text-tc-secondary'}>
              <ColdIcon name={IconNames.ColdDangerIcon} color={HexColors.tc.disabled} />
              <span className={'text-tc-disabled'}>Expired</span>
            </div>
          );
        case ClaimStatus.ExpiringSoon:
          if (expirationDate) {
            diff = differenceInDays(addTZOffset(expirationDate), new Date());
          }
          return (
            <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[4px] pl-[4px] text-tc-secondary'}>
              <ColdIcon name={IconNames.ColdExpiringIcon} color={HexColors.yellow['200']} />
              <span className={'text-yellow-200'}>{diff + 1} days</span>
            </div>
          );
        case ClaimStatus.Active:
          return (
            <div className={'text-body w-full h-full flex flex-row justify-start items-center gap-[0px] text-tc-secondary'}>
              <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} />
              <span className={'text-green-200'}>Active</span>
            </div>
          );
        default:
        case ClaimStatus.Inactive:
          return (
            <div className={'w-full h-full flex flex-row justify-start items-center text-tc-secondary'}>
              <div className={'w-[24px] h-[24px] flex flex-row justify-center items-center'}>
                <div className={'w-[13px] h-[13px] bg-gray-70 rounded-full'}></div>
              </div>
            </div>
          );
      }
    }
  };

  const renderDate = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const file = files.find(file => file.id === params.row.id);
    const fileStatus = getFileProcessingStatus(file);
    if (fileStatus === 'uploaded') {
      return (
        <div className={'w-full h-full py-[16px] px-[0px]'}>
          <div
            className={'w-full h-full flex flex-row rounded-[8px] animate-pulsate'}
            style={{
              background: 'linear-gradient(90deg, rgba(255, 241, 102, 0.20) 0%, rgba(255, 241, 102, 0.40) 100%)',
            }}></div>
        </div>
      );
    }

    let dateString = '--';
    if (params.value.getTime() !== new Date(0).getTime()) {
      dateString = format(new Date(params.value), 'M/d/yy');
    }
    return (
      <div data-chromatic="ignore" className={'w-full h-full flex flex-row justify-start items-center text-tc-secondary'}>
        {dateString}
      </div>
    );
  };

  const renderType = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const file = files.find(file => file.id === params.row.id);
    const fileStatus = getFileProcessingStatus(file);
    if (fileStatus === 'uploaded') {
      return (
        <div className={'w-full h-full py-[16px] px-[0px]'}>
          <div
            className={'w-full h-full flex flex-row rounded-[8px] animate-pulsate'}
            style={{
              background: 'linear-gradient(90deg, rgba(255, 241, 102, 0.20) 0%, rgba(255, 241, 102, 0.40) 100%)',
            }}></div>
        </div>
      );
    }
    return <div className={'text-tc-secondary overflow-hidden text-ellipsis'}>{params.value}</div>;
  };

  const renderAssociatedRecords = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const file = files.find(file => file.id === params.row.id);
    const fileStatus = getFileProcessingStatus(file);
    if (fileStatus === 'uploaded') {
      return (
        <div className={'w-full h-full py-[16px] px-[0px]'}>
          <div
            className={'w-full h-full flex flex-row rounded-[8px] animate-pulsate'}
            style={{
              background: 'linear-gradient(90deg, rgba(255, 241, 102, 0.20) 0%, rgba(255, 241, 102, 0.40) 100%)',
            }}></div>
        </div>
      );
    }

    return (
      <div className={'h-full w-full flex flex-row items-center gap-[10px]'}>
        {params.value.map((record: string, index: number) => {
          return (
            <div key={index} className={'text-tc-primary text-body p-[4px] rounded-[32px] border-[1px] border-purple-200'}>
              {capitalize(record)}
            </div>
          );
        })}
      </div>
    );
  };

  const onRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
    selectDocument(params.row.id);
  };

	const getAssociatedRecords = (file: FilesWithAssurances): string[] => {
		// get the material and supplier names
		const materialNames = file.attributeAssurances
			.map(assurance => {
				return get(assurance, 'material.name', '');
			})
			.filter(name => name !== '');
		const supplierNames = file.attributeAssurances
			.map(assurance => {
				return get(assurance, 'organizationFacility.name', '');
			})
			.filter(name => name !== '');
		return [...materialNames, ...supplierNames];
	};

	const rows = files
		.map(file => {
			const effectiveEndDate = getEffectiveEndDate(file);
			const sustainabilityAttribute = get(file.attributeAssurances, '[0].sustainabilityAttribute.name', '');
			return {
				id: file.id,
				name: file.originalName,
				uploaded: new Date(file.createdAt),
				status: getDateActiveStatus(effectiveEndDate),
				expiration: effectiveEndDate ? addTZOffset(effectiveEndDate) : new Date(0),
				type: file.type,
				sustainability_attribute: sustainabilityAttribute,
				associated_records: getAssociatedRecords(file),
        expiration_date: effectiveEndDate,
			};
		})
		.sort((a, b) => {
			return a.id.localeCompare(b.id);
		});

	const allAssociatedRecords = uniqWith(files.map(file => getAssociatedRecords(file)).flat(), (a, b) => a === b);

  const uniqFileTypes = uniqWith(files.map(file => startCase(lowerCase(file.type.replace(/_/g, ' ')))), (a, b) => a === b);

	const tableRows: GridValidRowModel[] = rows;

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
			minWidth: 200,
      renderCell: renderName,
		},
		{
			field: 'uploaded',
			headerName: 'Uploaded',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			type: 'date',
			width: 150,
			renderCell: renderUploadDate,
		},
		{
			field: 'status',
			headerName: 'Status',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			width: 100,
			type: 'singleSelect',
			valueOptions: toArray(ClaimStatus),
			renderCell: renderStatus,
		},
		{
			field: 'expiration',
			headerName: 'Expiration',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			type: 'date',
			width: 100,
			renderCell: renderDate,
		},
		{
			field: 'type',
			headerName: 'Type',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			width: 100,
			type: 'singleSelect',
      valueGetter: (value: string) => {
        return startCase(lowerCase(value.replace(/_/g, ' ')));
      },
      valueFormatter: (value: string) => {
        return startCase(lowerCase(value.replace(/_/g, ' ')));
      },
      valueOptions: uniqFileTypes,
      renderCell: renderType,
		},
		{
			field: 'sustainability_attribute',
			headerName: 'Sustainability Attribute',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			type: 'singleSelect',
      flex: 1,
			minWidth: 200,
			valueOptions: sustainabilityAttributes.map(attribute => attribute.name),
      renderCell: renderType,
		},
		{
			field: 'associated_records',
			headerName: 'Associated Records',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 300,
			type: 'singleSelect',
			valueOptions: toArray(allAssociatedRecords),
			renderCell: renderAssociatedRecords,
			sortComparator: listSortComparator,
			filterOperators: listFilterOperators,
		},
	];

	logBrowser('DocumentsTable', 'info', {
		files,
		sustainabilityAttributes,
		selectDocument,
	});

	return (
		<div className={'w-full'}>
			<DataGrid
				rows={tableRows}
				columns={columns}
				rowHeight={55}
				getRowClassName={() => {
					return 'text-tc-primary cursor-pointer';
				}}
				className={'text-tc-primary border-[2px] rounded-[2px] border-gray-30 bg-transparent w-full h-auto'}
				sx={{
					'--DataGrid-overlayHeight': '300px',
					'--DataGrid-rowBorderColor': HexColors.gray[30],
					'& .MuiTablePagination-root': {
						color: HexColors.tc.primary,
					},
					'& .MuiDataGrid-withBorderColor': {
						borderColor: HexColors.gray[30],
					},
					'& .MuiDataGrid-columnHeaderTitle': {
						fontWeight: 'bold',
					},
					'& .MuiDataGrid-cell:focus': {
						outline: 'none',
					},
					'& .MuiDataGrid-cell:focus-within': {
						outline: 'none',
					},
					'& .MuiDataGrid-columnHeader:focus': {
						outline: 'none',
					},
					'& .MuiDataGrid-columnHeader:focus-within': {
						outline: 'none',
					},
				}}
				slotProps={{
					filterPanel: {
						sx: {
							'& .MuiInput-input': {
								backgroundColor: 'transparent',
								fontFamily: 'Inter',
								fontSize: '14px',
								padding: '4px 0px 5px',
								height: '32px',
							},
							'& .MuiDataGrid-filterFormColumnInput': {
								backgroundColor: 'transparent',
							},
						},
					},
				}}
				columnHeaderHeight={55}
				onRowClick={onRowClick}
				autoHeight={true}
				slots={{
					noRowsOverlay: MUIDataGridNoRowsOverlay,
				}}
        initialState={{
          sorting: {
            sortModel: [{ field: 'uploaded', sort: 'desc' }],
          },
        }}
			/>
		</div>
	);
};

export const DocumentsTable = withErrorBoundary(_DocumentsTable, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DocumentsTable: ', error);
	},
});
