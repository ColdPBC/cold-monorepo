import {
  GridCallbackDetails,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridTreeNodeWithRender,
  GridValidRowModel,
  MuiEvent
} from '@mui/x-data-grid-pro';
import {ClaimStatus, IconNames, ProcessingStatus} from '@coldpbc/enums';
import {BubbleList, ColdIcon, ErrorFallback, MuiDataGrid, SustainabilityAttributeColumn} from '@coldpbc/components';
import {HexColors} from '@coldpbc/themes';
import {differenceInDays, format} from 'date-fns';
import {get, toArray, uniq, uniqWith} from 'lodash';
import React from 'react';
import {FilesWithAssurances, SustainabilityAttributeWithoutAssurances} from '@coldpbc/interfaces';
import {
  addTZOffset,
  formatScreamingSnakeCase,
  getDateActiveStatus,
  getEffectiveEndDate,
  getFileProcessingStatus,
  listFilterOperators,
  listSortComparator,
} from '@coldpbc/lib';
import {withErrorBoundary} from 'react-error-boundary';
import {useColdContext} from '@coldpbc/hooks';
import {twMerge} from 'tailwind-merge';

const _DocumentsTable = (props: { files: FilesWithAssurances[]; selectDocument: (id: string) => void }) => {
	const { files, selectDocument } = props;
	const { logBrowser } = useColdContext();

  const renderName = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const file = files.find(file => file.id === params.row.id);
    const fileStatus = getFileProcessingStatus(file);
    return <div className={'flex items-center justify-start gap-1'}>
      {fileStatus === ProcessingStatus.AI_PROCESSING ? <span role={'img'} aria-label={'Sparkles emoji'}>✨</span> : null}
      <span className={'overflow-hidden text-ellipsis whitespace-nowrap text-tc-primary font-bold'}>{params.value}</span>
    </div>;
  };

  const renderUploadDate = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    let dateString = '--';
    if (params.value.getTime() !== new Date(0).getTime()) {
      dateString = format(new Date(params.value), 'M/d/yy h:mm a');
    }
    return (
      <div data-chromatic="ignore" className={'w-full h-full flex flex-row justify-start items-center text-tc-secondary'}>
        {dateString}
      </div>
    );
  };

  const renderStatus = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
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
  };

  const renderDate = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
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
    return <div className={'text-tc-secondary overflow-hidden text-ellipsis'}>{params.value}</div>;
  };

  const renderSustainabilityAttribute = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    return <SustainabilityAttributeColumn sustainabilityAttribute={params.value as SustainabilityAttributeWithoutAssurances | null} />;
  };

  const renderAssociatedRecords = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    return <BubbleList values={params.value as string[]} color={HexColors.purple["200"]} />
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
    const productNames = file.attributeAssurances
      .map(assurance => {
        return get(assurance, 'product.name', '');
      })
      .filter(name => name !== '');
		return uniq([...materialNames, ...supplierNames, ...productNames]);
	};

	const rows = files
		.map(file => {
			const effectiveEndDate = getEffectiveEndDate(file);
			const sustainabilityAttribute = get(file.attributeAssurances, '[0].sustainabilityAttribute', null)
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

  const uniqFileTypes = uniqWith(files.map(file => formatScreamingSnakeCase(file.type), (a, b) => a === b));

  const uniqSustainabilityAttributes = uniqWith(files.map(file => file.attributeAssurances.map(assurance => get(assurance, 'sustainabilityAttribute.name', ''))).flat()).filter(
    value => value !== '',
  );

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
        return formatScreamingSnakeCase(value);
      },
      valueFormatter: (value: string) => {
        return formatScreamingSnakeCase(value);
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
			valueOptions: uniqSustainabilityAttributes,
      valueFormatter: (value: any) => {
        return value ? get(value, 'name') : "";
      },
      renderCell: renderSustainabilityAttribute,
		},
		{
			field: 'associated_records',
			headerName: 'Associated Records',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			type: 'singleSelect',
			valueOptions: toArray(allAssociatedRecords),
      renderCell: renderAssociatedRecords,
      minWidth: 350,
      flex: 1,
			sortComparator: listSortComparator,
			filterOperators: listFilterOperators,
		},
	];

	logBrowser('DocumentsTable', 'info', {
		files,
		selectDocument,
	});

	return (
		<div className={'w-full'}>
			<MuiDataGrid
				rows={tableRows}
				columns={columns}
				rowHeight={58}
        getRowClassName={() => {
          return 'text-tc-secondary cursor-pointer';
        }}
				columnHeaderHeight={55}
				onRowClick={onRowClick}
				autoHeight={true}
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
