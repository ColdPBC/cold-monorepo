import { addDays, subDays } from 'date-fns';
import { getCertificationsMock } from './claimsMock';
import { Suppliers } from '@coldpbc/interfaces';

export const getSupplierWithCertificationClaimsMock = (): Suppliers[] => {
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
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate',
            effective_start_date: null,
            effective_end_date: null,
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate',
            effective_start_date: null,
            effective_end_date: null,
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate',
            effective_start_date: subDays(new Date(), 5).toISOString(),
            effective_end_date: subDays(new Date(), 5).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate active',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
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
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Pritt, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate Pritt, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
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
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Smotherman, Inc.',
            effective_start_date: addDays(new Date(), 10).toISOString(),
            effective_end_date: addDays(new Date(), 10).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Smotherman, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
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
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Menzie, Inc.',
            effective_start_date: addDays(new Date(), 30).toISOString(),
            effective_end_date: addDays(new Date(), 30).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate Menzie, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
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
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Want, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate Want, Inc.',
            effective_start_date: subDays(new Date(), 3).toISOString(),
            effective_end_date: subDays(new Date(), 3).toISOString(),
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
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Tattershall, Inc.',
            effective_start_date: subDays(new Date(), 30).toISOString(),
            effective_end_date: subDays(new Date(), 30).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate Tattershall, Inc.',
            effective_start_date: subDays(new Date(), 3).toISOString(),
            effective_end_date: subDays(new Date(), 3).toISOString(),
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
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Panek, Inc.',
            effective_start_date: addDays(new Date(), 60).toISOString(),
            effective_end_date: addDays(new Date(), 60).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Panek, Inc.',
            effective_start_date: addDays(new Date(), 30).toISOString(),
            effective_end_date: addDays(new Date(), 30).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate Panek, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
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
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Faul, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Faul, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate Faul, Inc.',
            effective_start_date: null,
            effective_end_date: null,
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate Faul, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
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
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          organization_file: {
            original_name: 'PFAS-Test Certificate Hushon, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          organization_file: {
            original_name: 'Lead-Test Certificate Hushon, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'phthalate'),
          organization_file: {
            original_name: 'phthalate Certificate Hushon, Inc.',
            effective_start_date: addDays(new Date(), 5).toISOString(),
            effective_end_date: addDays(new Date(), 5).toISOString(),
          },
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          organization_file: {
            original_name: 'bluesign Certificate Hushon, Inc.',
            effective_start_date: addDays(new Date(), 70).toISOString(),
            effective_end_date: addDays(new Date(), 70).toISOString(),
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
