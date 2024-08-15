import { Claims, SuppliersClaimNamesPayload } from '@coldpbc/interfaces';

export const getSupplierClaimsMock = (): SuppliersClaimNamesPayload[] => {
  return getClaimsMock()
    .filter(cert => {
      return cert.level === 'Supplier';
    })
    .map(certification => {
      return {
        claim_name: certification.name,
      };
    });
};

export const getClaimsMock = (): Claims[] => {
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

export const getClaimsMockByName = (name: string): Claims => {
  return getClaimsMock().find(cert => cert.name === name) || getClaimsMock()[0];
};
