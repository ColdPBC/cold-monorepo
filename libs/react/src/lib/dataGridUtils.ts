import { getGridSingleSelectOperators, GridCellParams, GridColDef, GridComparatorFn, GridFilterItem } from '@mui/x-data-grid';
import { toArray } from 'lodash';

export const listSortComparator: GridComparatorFn<any> = (list1: any, list2: any) => {
  return list1.length - list2.length;
};

export const listFilterOperators = getGridSingleSelectOperators().map(operator => {
  const newOperator = { ...operator };
  const newGetApplyFilterFn = (filterItem: GridFilterItem, column: GridColDef) => {
    return (params: GridCellParams): boolean => {
      if (filterItem.value === undefined) {
        return true;
      }
      if (operator.value === 'isAnyOf') {
        let isOk = true;
        filterItem?.value?.forEach((fv: any) => {
          isOk = isOk && toArray(params).includes(fv);
        });
        return isOk;
      } else if (operator.value === 'not') {
        return !toArray(params).includes(filterItem.value);
      } else {
        return toArray(params).includes(filterItem.value);
      }
    };
  };
  newOperator.getApplyFilterFn = newGetApplyFilterFn;
  return newOperator;
});
