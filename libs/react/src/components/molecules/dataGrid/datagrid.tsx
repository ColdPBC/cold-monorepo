import React from "react";
import { Table } from "flowbite-react";
import useSWR from "swr";
import { ColorNames } from '../../../enums/colors';
import { Spinner } from '../../atoms/spinner/spinner';
import { GlobalSizes } from '../../../enums/sizes';
import { TableActions } from './actions/tableActions';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { flowbiteThemeOverride } from '../../../themes/flowbiteThemeOverride';
import { cloneDeep } from "lodash";
import { getAccessToken } from '../../../hooks/useCookies';

export interface DatagridProps {
  definitionURL: string;
  items: any;
  fetcher?: ( ...args: any[] ) => Promise<any>;
}

export const Datagrid = (props: DatagridProps) => {
  const items = props.items;
  const definitionURL = props.definitionURL || "/form-definitions/datagrid";
  const { data, error, isLoading }: {data: any, error: any, isLoading: boolean} = useSWR(
    [`${definitionURL}`, "GET"],
    axiosFetcher
  );

  const getTableRowCellItem = (key: string, item: any) => {
    if (key === "actions") {
      return <TableActions actions={item} />;
    } else {
      return item;
    }
  };

  const getHeaderCellClassName = (index: number) => {
    let className = "";
    if (data.definition.items[index]["size"]) {
      className += `${data.definition.items[index]["size"]} `;
    }
    if (data.definition.items[index]["headerStyle"]) {
      className += `${data.definition.items[index]["headerStyle"]} `;
    }
    return className;
  };

  const getBodyCellClassName = (index: number) => {
    let className = "";
    if (data.definition.items[index]["size"]) {
      className += `${data.definition.items[index]["size"]} `;
    }
    if (data.definition.items[index]["cellStyle"]) {
      className += `${data.definition.items[index]["cellStyle"]} `;
    }
    return className;
  };

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading) {
    return (
      <div className="w-full h-full grid content-center">
        <Spinner size={GlobalSizes.medium} color={ColorNames.primary} />
      </div>
    );
  }

  const getClassNames = (theme: any) => {
    const customTheme = cloneDeep(theme);
  };

  if (data && data.definition?.items) {
    return (
      <Table className="" theme={flowbiteThemeOverride.table}>
        <Table.Head className="" theme={flowbiteThemeOverride.table.head}>
          {data?.definition?.items?.map((column: any, index: number) => {
              return (
                <Table.HeadCell
                  key={index}
                  className={`${getHeaderCellClassName(index)}`}
                  theme={flowbiteThemeOverride.table.head.cell}
                >
                  {column.hideTitle ? (
                    <span className="sr-only">{column.headerTitle}</span>
                  ) : (
                    column.headerTitle
                  )}
                </Table.HeadCell>
              );
            })}
        </Table.Head>
        <Table.Body
          className="divide-y"
          theme={flowbiteThemeOverride.table.body}
        >
          {items.map((row: any, rowIndex: number) => {
            {
              return (
                <Table.Row key={`${row + " " + rowIndex}`} className="">
                  {Object.keys(row).map((key, index) => {
                    return (
                      <Table.Cell
                        key={`${key + " " + rowIndex}`}
                        className={`${getBodyCellClassName(index)}`}
                        theme={flowbiteThemeOverride.table.body.cell}
                      >
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
