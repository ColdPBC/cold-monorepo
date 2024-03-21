import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { ColorNames, ErrorType, GlobalSizes } from '@coldpbc/enums';
import { Spinner } from '@coldpbc/components';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useColdContext } from '@coldpbc/hooks';
import { darkTableTheme } from '@coldpbc/themes';

export interface DatagridInterface {
  definitionURL: string;
  items: any;
  fetcher?: (...args: any[]) => Promise<any>;
  'data-testid'?: string;
}

export const Datagrid = () => {
  const items = props.items;
  const definitionURL = props.definitionURL || '/components/datagrid';
  const { data, error, isLoading }: { data: any; error: any; isLoading: boolean } = useSWR([`${definitionURL}`, 'GET'], axiosFetcher);
  const { logError } = useColdContext();

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

  return (
    <Table>
      <TableHead>
        <TableRow>
          {data?.definition?.items?.map((column: any, index: number) => {
            return (
              <TableHeader key={index} className={`${getHeaderCellClassName(index)}`}>
                {column.hideTitle ? <span className="sr-only">{column.headerTitle}</span> : column.headerTitle}
              </TableHeader>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.handle}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-zinc-500">{user.access}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
