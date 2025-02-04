import { ColdIcon, DEFAULT_GRID_COL_DEF, MainContent, MuiDataGrid } from '@coldpbc/components';
import { useAuth0Wrapper, useColdContext, useGraphQLSWR } from '@coldpbc/hooks';
import { UploadsQuery } from '@coldpbc/interfaces';
import { get, toArray } from 'lodash';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { format } from 'date-fns';
import React from 'react';
import { DocumentTypes, IconNames, ProcessingStatus } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';
import { formatScreamingSnakeCase } from '@coldpbc/lib';

export const UploadsPage = () => {
  const {logBrowser} = useColdContext();
  const { orgId } = useAuth0Wrapper();

  const uploadsQuery = useGraphQLSWR<{
      organizationFiles: UploadsQuery[];
    }>('GET_ALL_UPLOADS', {
      filter: {
        organization: {
          id: orgId,
        },
        visible: true,
      },
    })

  const renderDate = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    let dateString = '--';
    if (new Date(params.value).getTime() !== new Date(0).getTime()) {
      dateString = format(new Date(params.value), 'M/d/yy h:mm a');
    }
    return (
      <div data-chromatic="ignore" className={'w-full h-full flex flex-row justify-start items-center text-body text-tc-secondary'}>
        {dateString}
      </div>
    );
  };

  const renderStatus = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    switch (params.value as ProcessingStatus) {
      case ProcessingStatus.IMPORT_COMPLETE:
        return (
          <div data-chromatic="ignore" className={'w-full h-full flex flex-row justify-start items-center text-body text-green-200'}>
            <ColdIcon
              name={IconNames.ColdCheckIcon}
              color={HexColors.green['200']}
              className={'w-6 h-6'}
              />
            Import Complete
          </div>
        );
      case ProcessingStatus.PROCESSING_ERROR:
        return (
          <div data-chromatic="ignore" className={'w-full h-full flex flex-row justify-start items-center text-body text-red-100'}>
            <ColdIcon
              name={IconNames.ColdDangerIcon}
              color={HexColors.red['100']}
              className={'w-6 h-6'}
            />
            Error Processing
          </div>
        );
      case ProcessingStatus.MANUAL_REVIEW:
        return (
          <div data-chromatic="ignore" className={'w-full h-full flex flex-row justify-start items-center text-body text-lightblue-100'}>
            <ColdIcon
              name={IconNames.ColdRightArrowIcon}
              color={HexColors.lightblue['100']}
              className={'w-6 h-6'}
            />
            Sent To Support Team
          </div>
        );
      case ProcessingStatus.AI_PROCESSING:
        return (
          <div data-chromatic="ignore" className={'w-full h-full flex flex-row justify-start items-center text-body text-yellow-100'}>
            <div className={'p-1 w-6 h-6 flex items-center justify-center'}>
              <ColdIcon
                name={IconNames.ColdAiIcon}
                color={HexColors.yellow['100']}
                className={'w-5 h-5'}
              />
            </div>
            Cold AI Processing
          </div>
        );
      default: return null;
    }
  }

  const error = get(uploadsQuery, 'data.error', null);
  if(error){
    logBrowser(
      'Getting Uploads Error',
      'error',
      {
        error: error
      },
      error
    );
  }

  const fileTypes = Object.values(DocumentTypes).map((type) =>
    formatScreamingSnakeCase(type)
  )

  const statuses = toArray(ProcessingStatus).map((status) =>
    formatScreamingSnakeCase(status)
  )

  const files = get(uploadsQuery, 'data.data.organizationFiles', []).map((file) => ({
    id: file.id,
    name: file.originalName,
    type: formatScreamingSnakeCase(file.type),
    uploaded: file.createdAt,
    status: file.processingStatus || 'MANUAL_REVIEW'
  }));

  logBrowser(
    'Uploads Page',
    'info',
    {
      uploads: files,
      uploadsQuery: uploadsQuery
    }
  )

  const columns: GridColDef[] = [
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'name',
      headerName: 'Name',
      cellClassName: 'text-tc-primary text-body'
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'type',
      headerName: 'Import Type',
      type: 'singleSelect',
      valueOptions: fileTypes,
      cellClassName: 'text-tc-secondary text-body'
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'uploaded',
      headerName: 'Uploaded',
      renderCell: renderDate,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'status',
      headerName: 'Status',
      cellClassName: 'text-body',
      renderCell: renderStatus,
      minWidth: 218,
      type: 'singleSelect',
      valueOptions: statuses,
      valueFormatter: (value: string) => {
        return formatScreamingSnakeCase(value);
      },
    },
  ]

  return (
    <MainContent
      title = { 'Uploads' }
      isLoading={uploadsQuery.isLoading}
      className={'w-[calc(100%-100px)]'}
    >
      <MuiDataGrid
        rows={files}
        columns={columns}
        disableRowSelectionOnClick
      />
    </MainContent>
  )
};
