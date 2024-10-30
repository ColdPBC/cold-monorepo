import { addDays, subDays } from 'date-fns';
import { getClaimsMock, getClaimsMockByName } from './claimsMock';
import { SuppliersWithAssurances, SuppliersWithCertifications } from '@coldpbc/interfaces';
import { EntityLevel } from '@coldpbc/enums';

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
      id: "ofac_rlpejwnhc2d7i3g28ize24rl",
      name: "Supplier Gamma",
      supplierTier: 1,
      country: "US",
      attributeAssurances: [],
      materialSuppliers: [],
      products: [],
    },
    {
      id: "ofac_nhfgwti6s91duov4okyf0b6z",
      name: "KNK",
      supplierTier: 1,
      country: "US",
      attributeAssurances: [],
      materialSuppliers: [],
      products: [],
    },
    {
      id: "ofac_ziiewcq7wmehkgcnt6jhb6re",
      name: "Supplier 6",
      supplierTier: 2,
      country: "US",
      attributeAssurances: [
        {
          id: "8ce77def-b624-4ce4-8b1b-f3ed0d6bd74e",
          effectiveEndDate: null,
          organizationFile: null,
          sustainabilityAttribute: {
            id: "24fd9960-7e35-45a1-8075-f99f2d841de6",
            level: EntityLevel.SUPPLIER,
            logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/ZDHC.png",
            name: "Adherence to ZDHC MRSL",
          },
        },
        {
          id: "16e53094-f98d-4051-9a39-8139e49f6acb",
          effectiveEndDate: addDays(new Date(), 25).toISOString(),
          organizationFile: {
            id: "f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
          },
          sustainabilityAttribute: {
            id: "11739d63-10c6-4849-af49-e6a7f9e59f81",
            level: EntityLevel.PRODUCT,
            name: "Altitude Sports",
          },
        },
        {
          id: "b1a880e6-4c82-4b4d-bd84-cfe354c13129",
          effectiveEndDate: addDays(new Date(), 75).toISOString(),
          organizationFile: {
            id: "f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
          },
          sustainabilityAttribute: {
            id: "9d148721-1bf0-4e6f-bf7e-d037a30b8718",
            level: EntityLevel.MATERIAL,
            name: "Arylamines",
          },
        },
        {
          id: "5505336d-445f-4078-a25a-098f683a4710",
          effectiveEndDate: null,
          organizationFile: null,
          sustainabilityAttribute: {
            id: "da1bcee4-5118-4dc6-9fa5-cdec1e26827d",
            level: EntityLevel.ORGANIZATION,
            name: "B-Corp Certification",
          },
        }
      ],
      materialSuppliers: [
        {
          id: 'abc',
          material: {
            id: 'a',
            name: "Material 10",
            attributeAssurances: [],
          },
        },
        {
          id: 'def',
          material: {
            id: 'b',
            name: "Material 2",
            attributeAssurances: [],
          },
        },
        {
          id: 'ghi',
          material: {
            id: 'c',
            name: "Material 8",
            attributeAssurances: [
              {
                id: "96ae4fab-9641-4488-b50e-da998dd786d6",
                effectiveEndDate: null,
                organizationFile: null,
                sustainabilityAttribute: {
                  id: "6ebfad9b-39de-4ad3-aa45-4af4d2232ba7",
                  level: EntityLevel.PRODUCT,
                  logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Bluesign+Product.png",
                  name: "Bluesign Product",
                },
              },
              {
                id: "6fbefc76-53d3-446d-bb0e-120a15ba3fce",
                effectiveEndDate: null,
                organizationFile: null,
                sustainabilityAttribute: {
                  id: "e200cb55-51b9-4851-82df-23b467c8aef4",
                  level: EntityLevel.ORGANIZATION,
                  name: "BSCI",
                },
              },
              {
                id: "aadc599d-5245-457c-9292-a95a3274322e",
                effectiveEndDate: null,
                organizationFile: null,
                sustainabilityAttribute: {
                  id: "057a266f-ab44-4b34-876f-14fc3edb92fc",
                  level: EntityLevel.MATERIAL,
                  name: "BPA",
                },
              }
            ],
          },
        }
      ],
      products: [],
    },
    {
      id: "ofac_urbq1tb8hrt430fkcgjvet6v",
      name: "Supplier 5",
      supplierTier: 1,
      country: "",
      attributeAssurances: [
        {
          id: "db61726d-69f5-4b61-87ba-673b476cfe82",
          effectiveEndDate: addDays(new Date(), 75).toISOString(),
          organizationFile: {
            id: "f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
          },
          sustainabilityAttribute: {
            id: "d84409f2-e671-42b8-845e-437d941938a0",
            level: EntityLevel.ORGANIZATION,
            name: "1% for the Planet",
          },
        },
        {
          id: "dca7bd7b-b77b-4bb6-a983-70660603c6af",
          effectiveEndDate: null,
          organizationFile: null,
          sustainabilityAttribute: {
            id: "11739d63-10c6-4849-af49-e6a7f9e59f81",
            level: EntityLevel.PRODUCT,
            name: "Altitude Sports",
          },
        },
        {
          id: "569b381b-3173-4b7e-a969-fbed4a2357a2",
          effectiveEndDate: addDays(new Date(), 35).toISOString(),
          organizationFile: {
            id: "f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
          },
          sustainabilityAttribute: {
            id: "24fd9960-7e35-45a1-8075-f99f2d841de6",
            level: EntityLevel.SUPPLIER,
            logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/ZDHC.png",
            name: "Adherence to ZDHC MRSL",
          },
        },
        {
          id: "a2a5b0dd-efce-4040-9cdf-e2e38fa01327",
          effectiveEndDate: null,
          organizationFile: null,
          sustainabilityAttribute: {
            id: "6fc74c15-cf95-4a4a-95ae-4f0f0eb3c401",
            level: EntityLevel.MATERIAL,
            name: "AP & APEO",
          },
        }
      ],
      materialSuppliers: [],
      products: [],
    },
    {
      id: "ofac_ij8qfc31mhiz4l5ku7khi4e2",
      name: "Example Supplier 1234",
      supplierTier: 1,
      country: "USA",
      attributeAssurances: [
        {
          id: "4e764c02-9545-47fc-a93e-c8f7872fd632",
          effectiveEndDate: null,
          organizationFile: null,
          sustainabilityAttribute: {
            id: "a99e4eff-72ee-40f4-a476-0385ac6f52d3",
            level: EntityLevel.SUPPLIER,
            logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Worldwide+Responsible+Accredited+Production.png",
            name: "Worldwide Responsible Accredited Production (WRAP)",
          },
        },
        {
          id: "ee02b9df-3fa2-404b-8da6-233edff6db3a",
          effectiveEndDate: null,
          organizationFile: null,
          sustainabilityAttribute: {
            id: "68d7ad19-f176-4b84-8c80-6bc395569467",
            level: EntityLevel.MATERIAL,
            logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png",
            name: "Global Recycled Standard",
          },
        }
      ],
      materialSuppliers: [],
      products: [],
    },
    {
      id: "ofac_xim58848n1fgxinkl3qzur71",
      name: "Supplier Zeta",
      supplierTier: 2,
      country: "US",
      attributeAssurances: [],
      materialSuppliers: [],
      products: [],
    },
    {
      id: "ofac_r7gn3op6kmfiu8il0pudcq15",
      name: "Coats Phong Phu Co. Ltd.",
      supplierTier: 2,
      country: null,
      attributeAssurances: [],
      materialSuppliers: [],
      products: [],
    },
  ];
};
