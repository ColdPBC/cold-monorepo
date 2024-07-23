import { Certifications } from '@coldpbc/interfaces';

export const getClaimsMock = () => {
  return [
    {
      name: 'pfas',
      label: 'PFAS-Test',
    },
    {
      name: 'lead',
      label: 'Lead-Test',
    },
    {
      name: 'phthalate',
      label: 'Phthalate-Test',
    },
    {
      name: 'bluesign',
      label: 'Bluesign',
    },
  ];
};

export const getCertificationsMock = (): Certifications[] => {
  return [
    {
      id: '1',
      name: 'PFAS-Test',
      level: 'Supplier',
      type: 'TEST',
    },
    {
      id: '2',
      name: 'Lead-Test',
      level: 'Supplier',
      type: 'TEST',
    },
    {
      id: '3',
      name: 'phthalate',
      level: 'Supplier',
      type: 'TEST',
    },
    {
      id: '4',
      name: 'bluesign',
      level: 'Supplier',
      type: 'TEST',
    },
  ];
};
