import { addDays, subDays } from 'date-fns';
import { getClaimsMock, getClaimsMockByName } from './claimsMock';
import { SuppliersWithAssurances, SuppliersWithCertifications } from '@coldpbc/interfaces';

export const getSupplierWithCertificationClaimsMock = (): SuppliersWithCertifications[] => {
  const certifications = getClaimsMock();
  return [
    {
      id: '1',
      name: 'VietWear Garments Co., Ltd.',
      address_line_1: '',
      address_line_2: '',
      city: '',
      country: 'Vietnam',
      organization_claims: [
        {
          id: '1',
          claim: getClaimsMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '2',
          claim: getClaimsMockByName('Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate',
            effective_start_date: null,
            effective_end_date: null,
            type: 'Certificate',
          },
        },
        {
          id: '3',
          claim: getClaimsMockByName('phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate',
            effective_start_date: null,
            effective_end_date: null,
            type: 'Certificate',
          },
        },
        {
          id: '4',
          claim: getClaimsMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate expired 1',
            effective_start_date: subDays(new Date(), 5).toISOString(),
            effective_end_date: subDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '5',
          claim: getClaimsMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate active',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '6',
          claim: getClaimsMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate expiring soon',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '6',
          claim: getClaimsMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate expired 2',
            effective_start_date: subDays(new Date(), 7).toISOString(),
            effective_end_date: subDays(new Date(), 8).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '6',
          claim: getClaimsMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate without date',
            effective_start_date: null,
            effective_end_date: null,
            type: 'Certificate',
          },
        },
      ],
    },
    {
      id: '2',
      name: 'Pritt, Inc.',
      address_line_1: '',
      address_line_2: '',
      city: '',
      country: 'China',
      organization_claims: [
        {
          id: '6',
          claim: getClaimsMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Pritt, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '7',
          claim: getClaimsMockByName('phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate Pritt, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
      ],
    },
    {
      id: '3',
      name: 'Smotherman, Inc.',
      address_line_1: '',
      address_line_2: '',
      city: '',
      country: 'Vietnam',
      organization_claims: [
        {
          id: '8',
          claim: getClaimsMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Smotherman, Inc.',
            effective_start_date: addDays(new Date(), 10).toISOString(),
            effective_end_date: addDays(new Date(), 10).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '9',
          claim: getClaimsMockByName('Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Smotherman, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
            type: 'Certificate',
          },
        },
      ],
    },
    {
      id: '4',
      name: 'Menzie, Inc.',
      address_line_1: '',
      address_line_2: '',
      city: '',
      country: 'Vietnam',
      organization_claims: [
        {
          id: '10',
          claim: getClaimsMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Menzie, Inc.',
            effective_start_date: addDays(new Date(), 30).toISOString(),
            effective_end_date: addDays(new Date(), 30).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '11',
          claim: getClaimsMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate Menzie, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
            type: 'Certificate',
          },
        },
      ],
    },
    {
      id: '5',
      name: 'Want, Inc.',
      address_line_1: '',
      address_line_2: '',
      city: '',
      country: 'Vietnam',
      organization_claims: [
        {
          id: '12',
          claim: getClaimsMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Want, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '13',
          claim: getClaimsMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate Want, Inc.',
            effective_start_date: subDays(new Date(), 3).toISOString(),
            effective_end_date: subDays(new Date(), 3).toISOString(),
            type: 'Certificate',
          },
        },
      ],
    },
    {
      id: '6',
      name: 'Tattershall, Inc.',
      address_line_1: '',
      address_line_2: '',
      city: '',
      country: 'Vietnam',
      organization_claims: [
        {
          id: '14',
          claim: getClaimsMockByName('Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Tattershall, Inc.',
            effective_start_date: subDays(new Date(), 30).toISOString(),
            effective_end_date: subDays(new Date(), 30).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '15',
          claim: getClaimsMockByName('phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate Tattershall, Inc.',
            effective_start_date: subDays(new Date(), 3).toISOString(),
            effective_end_date: subDays(new Date(), 3).toISOString(),
            type: 'Certificate',
          },
        },
      ],
    },
    {
      id: '7',
      name: 'Panek, Inc.',
      address_line_1: '',
      address_line_2: '',
      city: '',
      country: 'Vietnam',
      organization_claims: [
        {
          id: '16',
          claim: getClaimsMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Panek, Inc.',
            effective_start_date: addDays(new Date(), 60).toISOString(),
            effective_end_date: addDays(new Date(), 60).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '17',
          claim: getClaimsMockByName('Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Panek, Inc.',
            effective_start_date: addDays(new Date(), 30).toISOString(),
            effective_end_date: addDays(new Date(), 30).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '18',
          claim: getClaimsMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate Panek, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
            type: 'Certificate',
          },
        },
      ],
    },
    {
      id: '8',
      name: 'Faul, Inc.',
      address_line_1: '',
      address_line_2: '',
      city: '',
      country: 'Vietnam',
      organization_claims: [
        {
          id: '19',
          claim: getClaimsMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Faul, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '20',
          claim: getClaimsMockByName('Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Faul, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '21',
          claim: getClaimsMockByName('phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate Faul, Inc.',
            effective_start_date: null,
            effective_end_date: null,
            type: 'Certificate',
          },
        },
        {
          id: '22',
          claim: getClaimsMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate Faul, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
            type: 'Certificate',
          },
        },
      ],
    },
    {
      id: '9',
      name: 'Hushon, Inc.',
      address_line_1: '',
      address_line_2: '',
      city: '',
      country: 'Vietnam',
      organization_claims: [
        {
          id: '23',
          claim: getClaimsMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Hushon, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '24',
          claim: getClaimsMockByName('Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Hushon, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '25',
          claim: getClaimsMockByName('phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate Hushon, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '26',
          claim: getClaimsMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate Hushon, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
            type: 'Certificate',
          },
        },
      ],
    },
    {
      id: '10',
      name: 'Supplier Alpha',
      address_line_1: '',
      address_line_2: '',
      city: '',
      country: 'US',
      organization_claims: [],
    },
  ];
};

export const getSupplierMockByName = (name: string) => {
  return getSupplierWithCertificationClaimsMock().find(supplier => supplier.name === name) || getSupplierWithCertificationClaimsMock()[0];
};

export const getSupplierMockById = (id: string) => {
  return getSupplierWithCertificationClaimsMock().find(supplier => supplier.id === id) || getSupplierWithCertificationClaimsMock()[0];
};

export const getSupplierMocks = (): SuppliersWithAssurances[] => {
  return [
    {
      id: '1',
      name: 'VietWear Garments Co., Ltd.',
      supplierTier: 1,
      country: 'Vietnam',
      attributeAssurances: [
        {
          id: '1',
          sustainabilityAttribute: {
            id: '1',
            name: 'PFAS-Test',
          },
        },
      ],
      materialSuppliers: [],
      products: [
        {
            id: '1',
            name: 'T-shirt',
        }
      ]
    },
    {
      id: '2',
      name: 'Pritt, Inc.',
      country: 'China',
      supplierTier: 1,
      attributeAssurances: [
        {
          id: '2',
          sustainabilityAttribute: {
            id: '2',
            name: 'Lead-Test',
          },
        },
        {
          id: '3',
          sustainabilityAttribute: {
            id: '3',
            name: 'phthalate',
          },
        },
      ],
      materialSuppliers: [
        {
          material: {
            name: 'Cotton',
          },
        },
        {
          material: {
            name: 'Polyester',
          },
        },
      ],
      products: [
        {
            id: '2',
            name: 'Pants',
        }
      ]
    },
    {
      id: '3',
      name: 'Smotherman, Inc.',
      country: 'Vietnam',
      supplierTier: 2,
      attributeAssurances: [
        {
          id: '4',
          sustainabilityAttribute: {
            id: '4',
            name: 'bluesign',
          },
        },
        {
          id: '5',
          sustainabilityAttribute: {
            id: '5',
            name: 'Lead-Test',
          },
        },
      ],
      materialSuppliers: [
        {
          material: {
            name: 'Cotton',
          },
        },
        {
          material: {
            name: 'Polyester',
          },
        },
      ],
      products: [],
    },
    {
      id: '4',
      name: 'Menzie, Inc.',
      country: 'Vietnam',
      supplierTier: 2,
      attributeAssurances: [
        {
          id: '6',
          sustainabilityAttribute: {
            id: '6',
            name: 'PFAS-Test',
          },
        },
        {
          id: '7',
          sustainabilityAttribute: {
            id: '7',
            name: 'bluesign',
          },
        },
      ],
      materialSuppliers: [
        {
          material: {
            name: 'Cotton',
          },
        },
        {
          material: {
            name: 'Polyester',
          },
        },
      ],
      products: []
    },
    {
      id: '5',
      name: 'Want, Inc.',
      country: 'Vietnam',
      supplierTier: 2,
      attributeAssurances: [
        {
          id: '8',
          sustainabilityAttribute: {
            id: '8',
            name: 'PFAS-Test',
          },
        },
        {
          id: '9',
          sustainabilityAttribute: {
            id: '9',
            name: 'bluesign',
          },
        },
      ],
      materialSuppliers: [
        {
          material: {
            name: 'Cotton',
          },
        },
        {
          material: {
            name: 'Polyester',
          },
        },
      ],
      products: []
    },
    {
      id: '6',
      name: 'Tattershall, Inc.',
      country: 'Vietnam',
      supplierTier: 2,
      attributeAssurances: [
        {
          id: '10',
          sustainabilityAttribute: {
            id: '10',
            name: 'Lead-Test',
          },
        },
        {
          id: '11',
          sustainabilityAttribute: {
            id: '11',
            name: 'phthalate',
          },
        },
      ],
      materialSuppliers: [
        {
          material: {
            name: 'Cotton',
          },
        },
        {
          material: {
            name: 'Polyester',
          },
        },
      ],
      products: []
    },
    {
      id: '7',
      name: 'Panek, Inc.',
      country: 'Vietnam',
      supplierTier: 1,
      attributeAssurances: [
        {
          id: '12',
          sustainabilityAttribute: {
            id: '12',
            name: 'PFAS-Test',
          },
        },
        {
          id: '13',
          sustainabilityAttribute: {
            id: '13',
            name: 'Lead-Test',
          },
        },
      ],
      materialSuppliers: [],
      products: [
        {
            id: '7',
            name: 'Dress',
        }
      ]
    },
    {
      id: '8',
      name: 'Faul, Inc.',
      country: 'Vietnam',
      supplierTier: 1,
      attributeAssurances: [
        {
          id: '14',
          sustainabilityAttribute: {
            id: '14',
            name: 'PFAS-Test',
          },
        },
        {
          id: '15',
          sustainabilityAttribute: {
            id: '15',
            name: 'Lead-Test',
          },
        },
      ],
      materialSuppliers: [
        {
          material: {
            name: 'Cotton',
          },
        },
        {
          material: {
            name: 'Polyester',
          },
        },
      ],
      products: [
        {
          id: '8',
          name: 'Skirt',
        }
      ]
    },
    {
      id: '9',
      name: 'Hushon, Inc.',
      country: 'Vietnam',
      supplierTier: 1,
      attributeAssurances: [],
      materialSuppliers: [],
      products: [
        {
          id: '9',
          name: 'Hat',
        }
      ]
    },
    {
      id: '10',
      name: 'Supplier Alpha',
      country: 'US',
      supplierTier: 2,
      attributeAssurances: [],
      materialSuppliers: [],
      products: [
        {
          id: '10',
          name: 'Shoes',
        }
      ]
    },
  ];
};
