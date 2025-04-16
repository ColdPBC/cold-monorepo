import {
  getGridSingleSelectOperators,
  GridCellParams,
  GridColDef,
  GridComparatorFn,
  GridFilterItem
} from '@mui/x-data-grid-pro';
import {isEmpty, toArray} from 'lodash';

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

export const translateFilterOperator = (field: string, operator: string, value: any) => {

  // check if the operator is empty and the operator is not isEmpty or isNotEmpty
  if((!value || isEmpty(value)) && operator !== 'isEmpty' && operator !== 'isNotEmpty') {
    return null
  }

  const operatorMap = {
    equals: '',
    doesNotEqual: '_ne',
    contains: '_ilike',
    startsWith: '_ilike',
    endsWith: '_ilike',
    isEmpty: '_null',
    isNotEmpty: '_notnull',
    notEquals: '_ne',
    greaterThan: '_gt',
    greaterThanOrEqual: '_gte',
    lessThan: '_lt',
    lessThanOrEqual: '_lte',
    isAnyOf: '_in',
    doesNotContain: '_ne',
  };

  // If the operator isn't in our map, return null
  if (!operatorMap.hasOwnProperty(operator)) {
    console.warn(`Unsupported operator: ${operator}`);
    return null;
  }

  // Special handling for various operators
  switch (operator) {
    case 'isEmpty':
      return { [`${field}${operatorMap[operator]}`]: true };

    case 'isNotEmpty':
      return { [`${field}${operatorMap[operator]}`]: true };

    case 'contains':
      return { [`${field}${operatorMap[operator]}`]: `%${value}%` };

    // this is work around because graphweaver does not have a nilike suffix
    case 'doesNotContain':
      return { [`${field}_nin`]: [`%${value}%`] };

    case 'startsWith':
      return { [`${field}${operatorMap[operator]}`]: `${value}%` };

    case 'endsWith':
      return { [`${field}${operatorMap[operator]}`]: `%${value}` };

    case 'isAnyOf':
      return { [`${field}${operatorMap[operator]}`]: value };

    default:
      // For direct matches and other operators
      return { [`${field}${operatorMap[operator]}`]: value };
  }
};
