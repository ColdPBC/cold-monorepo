import { createContext } from 'react';

export type ColdEmissionsContextType = {
  data: any;
  selectedYear: number;
  selectedFacility: string;
};

export const ColdEmissionsContext = createContext({
  data: {},
  selectedYear: new Date().getFullYear(),
  selectedFacility: '',
} as ColdEmissionsContextType);
