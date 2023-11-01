import { NumericFormat } from 'react-number-format';
import numeral from 'numeral';

export const formatTonnes = (value: any) => {
  return numeral(value).format('0,0.0');
};
