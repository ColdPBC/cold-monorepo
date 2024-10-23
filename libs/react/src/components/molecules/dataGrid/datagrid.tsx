import React from 'react';
import { Table } from 'flowbite-react';
import useSWR from 'swr';
import { ColorNames } from '../../../enums/colors';
import { Spinner } from '../../atoms/spinner/spinner';
import { GlobalSizes } from '../../../enums/sizes';
import { TableActions } from './actions/tableActions';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { darkTableTheme } from '../../../themes/flowbiteThemeOverride';
import { cloneDeep } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useColdContext } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';

export interface DatagridProps {
	definitionURL: string;
	items: any;
	fetcher?: (...args: any[]) => Promise<any>;
	'data-testid'?: string;
}

const _Datagrid = (props: DatagridProps) => {
	const items = props.items;
	const definitionURL = props.definitionURL || '/components/datagrid';
	const {
		data,
		error,
		isLoading,
	}: {
		data: any;
		error: any;
		isLoading: boolean;
	} = useSWR([`${definitionURL}`, 'GET'], axiosFetcher);
	const { logError } = useColdContext();
	const getTableRowCellItem = (key: string, item: any) => {
		if (key === 'actions') {
			return <TableActions actions={item} />;
		} else {
			return item;
		}
	};

	const getHeaderCellClassName = (index: number) => {
		let className = '';
		if (data.definition.items[index]['size']) {
			className += `${data.definition.items[index]['size']} `;
		}
		if (data.definition.items[index]['headerStyle']) {
			className += `${data.definition.items[index]['headerStyle']} `;
		}
		return className;
	};

	const getBodyCellClassName = (index: number) => {
		let className = '';
		if (data.definition.items[index]['size']) {
			className += `${data.definition.items[index]['size']} `;
		}
		if (data.definition.items[index]['cellStyle']) {
			className += `${data.definition.items[index]['cellStyle']} `;
		}
		return className;
	};

	if (error) {
		logError(error, ErrorType.SWRError);
		return null;
	}

	if (isLoading) {
		return (
			<div className="w-full h-full grid content-center" data-testid={props['data-testid']}>
				<Spinner size={GlobalSizes.medium} color={ColorNames.primary} />
			</div>
		);
	}

	const getClassNames = (theme: any) => {
		const customTheme = cloneDeep(theme);
	};

	if (data && data.definition?.items) {
		return (
			<Table theme={darkTableTheme.table} data-testid={props['data-testid']}>
				<Table.Head className="text-white normal-case">
					{data?.definition?.items?.map((column: any, index: number) => {
						return (
							<Table.HeadCell key={index} className={`${getHeaderCellClassName(index)}`} theme={darkTableTheme.table?.head?.cell}>
								{column.hideTitle ? <span className="sr-only">{column.headerTitle}</span> : column.headerTitle}
							</Table.HeadCell>
						);
					})}
				</Table.Head>
				<Table.Body className="divide-y" theme={darkTableTheme.table?.body}>
					{items.map((row: any, rowIndex: number) => {
						{
							return (
								<Table.Row key={`${row + ' ' + rowIndex}`} theme={darkTableTheme.table?.row}>
									{Object.keys(row).map((key, index) => {
										return (
											<Table.Cell key={`${key + ' ' + rowIndex}`} className={`${getBodyCellClassName(index)}`} theme={darkTableTheme.table?.body?.cell}>
												{getTableRowCellItem(key, row[key])}
											</Table.Cell>
										);
									})}
								</Table.Row>
							);
						}
					})}
				</Table.Body>
			</Table>
		);
	} else {
		return <></>;
	}
};

export const Datagrid = withErrorBoundary(_Datagrid, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in Datagrid: ', error);
	},
});
