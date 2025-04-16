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
    // String operators
    equals: '',               // direct match
    doesNotEqual: '_ne',      // not equals
    contains: '_ilike',       // case-insensitive contains
    doesNotContain: '',       // special handling - we'll use _nin
    startsWith: '_ilike',     // starts with - requires value%
    endsWith: '_ilike',       // ends with - requires %value

    // Number operators (also using the same symbols in filter UI)
    '=': '',                  // equals
    '!=': '_ne',              // not equals
    '>': '_gt',               // greater than
    '>=': '_gte',             // greater than or equal
    '<': '_lt',               // less than
    '<=': '_lte',             // less than or equal
    greaterThan: '_gt',       // alternative name for >
    greaterThanOrEqual: '_gte', // alternative name for >=
    lessThan: '_lt',          // alternative name for <
    lessThanOrEqual: '_lte',  // alternative name for <=

    // Common operators
    isEmpty: '_null',         // field is null
    isNotEmpty: '_notnull',   // field is not null
    isAnyOf: '_in',           // in a list of values

    // Date operators
    is: '',                   // exact date match
    not: '_ne',               // not equals date
    after: '_gt',             // date after
    onOrAfter: '_gte',        // date on or after
    before: '_lt',            // date before
    onOrBefore: '_lte',       // date on or before
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

    // Special handling for doesNotContain - Graphweaver doesn't have a _nilike suffix
    case 'doesNotContain':
      return { [`${field}_nin`]: [`%${value}%`] };

    case 'startsWith':
      return { [`${field}${operatorMap[operator]}`]: `${value}%` };

    case 'endsWith':
      return { [`${field}${operatorMap[operator]}`]: `%${value}` };

    case 'isAnyOf':
      return { [`${field}${operatorMap[operator]}`]: value };

    // Date operators - ensure date formats are properly handled
    case 'is':
    case 'not':
    case 'after':
    case 'onOrAfter':
    case 'before':
    case 'onOrBefore':
      // Convert Date objects to ISO strings if needed
      if (value instanceof Date) {
        value = value.toISOString();
      }
      return { [`${field}${operatorMap[operator]}`]: value };

    // Handle numeric operators with the same symbols in UI
    case '=':
    case '!=':
    case '>':
    case '>=':
    case '<':
    case '<=':
      // Ensure value is a number if possible
      if (typeof value === 'string' && !isNaN(Number(value))) {
        value = Number(value);
      }
      return { [`${field}${operatorMap[operator]}`]: value };

    default:
      // For direct matches and other operators
      return { [`${field}${operatorMap[operator]}`]: value };
  }
};
