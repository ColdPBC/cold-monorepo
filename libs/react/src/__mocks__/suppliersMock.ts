import { addDays, subDays } from 'date-fns';
import { getCertificationMockByName, getCertificationsMock } from './claimsMock';
import { SuppliersWithCertifications } from '@coldpbc/interfaces';

export const getSupplierWithCertificationClaimsMock = (): SuppliersWithCertifications[] => {
  const certifications = getCertificationsMock();
  return [
    {
      id: '1',
      name: 'VietWear Garments Co., Ltd.',
      address_line_1: '',
      address_line_2: '',
      city: '',
      country: 'Vietnam',
      certification_claims: [
        {
          id: '1',
          certification: getCertificationMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '2',
          certification: getCertificationMockByName('Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate',
            effective_start_date: null,
            effective_end_date: null,
            type: 'Certificate',
          },
        },
        {
          id: '3',
          certification: getCertificationMockByName('phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate',
            effective_start_date: null,
            effective_end_date: null,
            type: 'Certificate',
          },
        },
        {
          id: '4',
          certification: getCertificationMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate expired 1',
            effective_start_date: subDays(new Date(), 5).toISOString(),
            effective_end_date: subDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '5',
          certification: getCertificationMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate active',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '6',
          certification: getCertificationMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate expiring soon',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '6',
          certification: getCertificationMockByName('bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate expired 2',
            effective_start_date: subDays(new Date(), 7).toISOString(),
            effective_end_date: subDays(new Date(), 8).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '6',
          certification: getCertificationMockByName('bluesign'),
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
      certification_claims: [
        {
          id: '6',
          certification: getCertificationMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Pritt, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '7',
          certification: getCertificationMockByName('phthalate'),
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
      certification_claims: [
        {
          id: '8',
          certification: getCertificationMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Smotherman, Inc.',
            effective_start_date: addDays(new Date(), 10).toISOString(),
            effective_end_date: addDays(new Date(), 10).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '9',
          certification: getCertificationMockByName('Lead-Test'),
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
      certification_claims: [
        {
          id: '10',
          certification: getCertificationMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Menzie, Inc.',
            effective_start_date: addDays(new Date(), 30).toISOString(),
            effective_end_date: addDays(new Date(), 30).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '11',
          certification: getCertificationMockByName('bluesign'),
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
      certification_claims: [
        {
          id: '12',
          certification: getCertificationMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Want, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '13',
          certification: getCertificationMockByName('bluesign'),
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
      certification_claims: [
        {
          id: '14',
          certification: getCertificationMockByName('Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Tattershall, Inc.',
            effective_start_date: subDays(new Date(), 30).toISOString(),
            effective_end_date: subDays(new Date(), 30).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '15',
          certification: getCertificationMockByName('phthalate'),
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
      certification_claims: [
        {
          id: '16',
          certification: getCertificationMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Panek, Inc.',
            effective_start_date: addDays(new Date(), 60).toISOString(),
            effective_end_date: addDays(new Date(), 60).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '17',
          certification: getCertificationMockByName('Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Panek, Inc.',
            effective_start_date: addDays(new Date(), 30).toISOString(),
            effective_end_date: addDays(new Date(), 30).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '18',
          certification: getCertificationMockByName('bluesign'),
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
      certification_claims: [
        {
          id: '19',
          certification: getCertificationMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Faul, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '20',
          certification: getCertificationMockByName('Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Faul, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '21',
          certification: getCertificationMockByName('phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate Faul, Inc.',
            effective_start_date: null,
            effective_end_date: null,
            type: 'Certificate',
          },
        },
        {
          id: '22',
          certification: getCertificationMockByName('bluesign'),
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
      certification_claims: [
        {
          id: '23',
          certification: getCertificationMockByName('PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Hushon, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '24',
          certification: getCertificationMockByName('Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Hushon, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '25',
          certification: getCertificationMockByName('phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate Hushon, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
            type: 'Certificate',
          },
        },
        {
          id: '26',
          certification: getCertificationMockByName('bluesign'),
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
      certification_claims: [],
    },
  ];
};

export const getSupplierMockByName = (name: string) => {
  return getSupplierWithCertificationClaimsMock().find(supplier => supplier.name === name) || getSupplierWithCertificationClaimsMock()[0];
};

export const getSupplierMockById = (id: string) => {
  return getSupplierWithCertificationClaimsMock().find(supplier => supplier.id === id) || getSupplierWithCertificationClaimsMock()[0];
};
