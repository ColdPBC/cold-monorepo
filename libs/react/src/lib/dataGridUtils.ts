import { getGridSingleSelectOperators, GridCellParams, GridColDef, GridComparatorFn, GridFilterItem } from '@mui/x-data-grid';
import { toArray } from 'lodash';

export const supplierSortComparator: GridComparatorFn<any> = (suppliers1: any, suppliers2: any) => {
  return suppliers1.length - suppliers2.length;
};

export const tagsFilterOperators = getGridSingleSelectOperators().map(operator => {
  const newOperator = { ...operator };
  const newGetApplyFilterFn = (filterItem: GridFilterItem, column: GridColDef) => {
    if (filterItem.value === undefined) {
      return (params: GridCellParams): boolean => {
        return true;
      };
    }
    if (operator.value === 'isAnyOf') {
      return (params: GridCellParams): boolean => {
        let isOk = true;
        filterItem?.value?.forEach((fv: any) => {
          isOk = isOk && toArray(params).includes(fv);
        });
        return isOk;
      };
    } else if (operator.value === 'isNot') {
      return (params: GridCellParams): boolean => {
        let isOk = true;
        filterItem?.value?.forEach((fv: any) => {
          isOk = isOk && !toArray(params).includes(fv);
        });
        return isOk;
      };
    } else {
      return (params: GridCellParams): boolean => {
        return toArray(params).includes(filterItem.value);
      };
    }
  };
  newOperator.getApplyFilterFn = newGetApplyFilterFn;
  return newOperator;
});
