import {BaseButton, ErrorFallback, getMaterialRows, getProductRows} from '@coldpbc/components'
import {EntityLevel} from '@coldpbc/enums';
import {ColdApolloContext} from '@coldpbc/providers';
import React, {useContext, useState} from "react";
import {useAddToastMessage, useAuth0Wrapper, useColdContext} from "@coldpbc/hooks";
import {queries} from "@coldpbc/lib";
import {ConfigOptions, download, generateCsv} from 'export-to-csv';
import {GridApiPro, GridValueFormatter,} from "@mui/x-data-grid-pro";
import {useFlags} from "launchdarkly-react-client-sdk";
import {withErrorBoundary} from "react-error-boundary";
import {ToastMessage} from "@coldpbc/interfaces";

export const _EntityExport = (props: {
  entityLevel: EntityLevel;
  gridAPI: GridApiPro | null;
}) => {
  const ldFlags = useFlags()
  const {logBrowser} = useColdContext()
  const {addToastMessage} = useAddToastMessage();
  const {entityLevel, gridAPI } = props;
  const {orgId} = useAuth0Wrapper()
  const [exporting, setExporting] = useState<boolean>(false);
  const { client } = useContext(ColdApolloContext);

  const checkResponse = (response: any) => {
    if (response.error || response.errors) {
      logBrowser(
        'Error fetching graphql data for export',
        'error', {
          error: response.error,
          errors: response.errors,
          orgId,
          entityLevel: entityLevel,
        });
      throw new Error('Error fetching graphql data for export');
    }
  }

  const exportEntities = async () => {
    if (!gridAPI || !client) return;

    try {
      setExporting(true);

      // Get current grid state
      const filterModel = gridAPI.state.filter.filterModel
      const sortModel = gridAPI.state.sorting.sortModel
      const columnVisibilityModel = gridAPI.state.columns.columnVisibilityModel;

      const allColumns = gridAPI.getAllColumns();
      const columnFields: string[] = [];
      const columnHeaders: string[] = [];

      allColumns.forEach(column => {
        if (column.headerName && columnVisibilityModel[column.field] !== false) {
          columnFields.push(column.field);
          columnHeaders.push(column.headerName);
        }
      });

      // Build filter from search query
      const searchQuery = filterModel.quickFilterValues?.join(' ') || '';
      let filter: any = {
        organization: {
          id: orgId,
        }
      }
      if(searchQuery) {
        filter = {
          ...filter,
          name_ilike: `%${searchQuery}%`
        }
      }

      // Build order by from sort model
      const orderBy = sortModel.length ? {
        [sortModel[0].field]: sortModel[0].sort === 'asc' ? 'ASC' : 'DESC'
      } : undefined;

      const response = await client.query({
        query: queries[entityLevel === EntityLevel.PRODUCT ? 'GET_PAGINATED_PRODUCTS_FOR_ORG' : 'GET_PAGINATED_MATERIALS_FOR_ORG'],
        variables: {
          filter,
          pagination: {
            orderBy,
          }
        }
      });

      checkResponse(response);

      let data: any[] = [];
      if ('products' in response.data) {
        data = getProductRows(response.data.products, ldFlags)
      } else if ('materials' in response.data) {
        data = getMaterialRows(response.data.materials)
      }

      const formattedData = data.map(row => {
        // Create an array of values in the correct order
        return columnFields.reduce((acc, field, index) => {
          const column = gridAPI.getColumn(field);
          let value = row[field];

          if (column?.valueFormatter) {
            value = (column.valueFormatter as GridValueFormatter<typeof value, typeof row>)(
              // @ts-ignore
              value,
              row,
              column,
              gridAPI
            );
          }

          // Use the header name as the key
          acc[columnHeaders[index]] = value;
          return acc;
        }, {} as Record<string, any>);
      });

      const options: ConfigOptions = {
        fieldSeparator: ',',
        quoteStrings: true,
        decimalSeparator: '.',
        showTitle: false,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true, // Change this to true since we're using header names as keys
        filename: `${entityLevel.toLowerCase()}_export_${new Date().toISOString()}`
      };

      const csv = generateCsv(options)(formattedData);
      download(options)(csv);
      logBrowser(
        'CSV exported successfully',
        'info',
        {
          count: formattedData.length,
          entityLevel,
          orgId,
        }
      )
      await addToastMessage({
        type: ToastMessage.SUCCESS,
        message: 'CSV exported successfully',
      })
    } catch (error) {
      logBrowser(
        'Error getting data ready for export',
        'error', {
          error: error,
          entityLevel,
          orgId,
        }, error);
      await addToastMessage({
        type: ToastMessage.FAILURE,
        message: 'Error exporting data',
      })
    } finally {
      setExporting(false);
    }
  };

  return (
    <BaseButton
      label={'Export'}
      loading={exporting}
      onClick={exportEntities}
      disabled={exporting || !gridAPI?.state}
      className={'h-[40px]'}
    />
  );
};

export const EntityExport = withErrorBoundary(_EntityExport, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in EntityExport: ', error);
  },
});
