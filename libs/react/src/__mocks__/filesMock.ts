import { Files, FilesWithAssurances } from '@coldpbc/interfaces';
import { addDays } from 'date-fns';

export function getAllFilesMock() {
  return [
    {
      id: 'clrl1562j0009mgk60trjvcyy',
      object: 'assistant.file',
      assistant_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      bucket: 'cold-api-uploaded-files',
      key: 'staging/org_cAD7FM8ONewFumnY/qaalib.farah@coldclimate.com/wordpress-pdf-invoice-plugin-sample.pdf',
      original_name: 'wordpress-pdf-invoice-plugin-sample.pdf',
      checksum: 'd41d8cd98f00b204e9800998ecf8427e',
      organization_id: 'org_cAD7FM8ONewFumnY',
      openai_assistant_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      openai_file_id: 'file-ARQyPWCo7Li29GPbPL2bpJcf',
      integration_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      mimetype: 'application/pdf',
      size: 43627,
      acl: 'private',
      contentType: 'application/pdf',
      encoding: '7bit',
      fieldname: 'file',
      location: 'https://cold-api-uploaded-files.s3.us-east-1.amazonaws.com/staging/org_cAD7FM8ONewFumnY/qaalib.farah%40coldclimate.com/wordpress-pdf-invoice-plugin-sample.pdf',
      versionId: 'pJ2fIdrMpb7lgZecDuLg2z2vfiHX249n',
      updated_at: '2024-05-01T20:00:00.000Z',
      created_at: '2024-05-01T20:00:00.000Z',
    },
    {
      id: 'clrl0wzkr0007mgk6uncv7u8k',
      object: 'assistant.file',
      assistant_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      bucket: 'cold-api-uploaded-files',
      key: 'staging/org_cAD7FM8ONewFumnY/qaalib.farah@coldclimate.com/sample.pdf',
      original_name: 'sample.pdf',
      checksum: 'd41d8cd98f00b204e9800998ecf8427e',
      organization_id: 'org_cAD7FM8ONewFumnY',
      openai_assistant_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      openai_file_id: 'file-OUw0zSDm8d6KDWwxXWESU7tn',
      integration_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      mimetype: 'application/pdf',
      size: 357602,
      acl: 'private',
      contentType: 'application/pdf',
      encoding: '7bit',
      fieldname: 'file',
      location: 'https://cold-api-uploaded-files.s3.us-east-1.amazonaws.com/staging/org_cAD7FM8ONewFumnY/qaalib.farah%40coldclimate.com/sample.pdf',
      versionId: '3PF2iN17HgJuD4.o5RCT3xWmVO2rMKCa',
      updated_at: '2024-04-29T20:00:00.000Z',
      created_at: '2024-04-29T20:00:00.000Z',
    },
  ];
}

export function getFilesWithCertificateClaimsMock(): Files[] {
  return [
    {
      id: '1',
      original_name: 'PFAS-Test Certificate.pdf',
      effective_start_date: addDays(new Date(), 5).toISOString(),
      effective_end_date: addDays(new Date(), 5).toISOString(),
      type: 'CERTIFICATE',
      organization_claims: [],
    },
    {
      id: '2',
      original_name: 'Lead-Test Certificate.pdf',
      effective_start_date: null,
      effective_end_date: null,
      type: 'CERTIFICATE',
      organization_claims: [],
    },
    {
      id: '3',
      original_name: 'phthalate Certificate.pdf',
      effective_start_date: null,
      effective_end_date: null,
      type: 'CERTIFICATE',
      organization_claims: [],
    },
    {
      id: '4',
      original_name: 'bluesign Certificate without date.pdf',
      effective_start_date: null,
      effective_end_date: null,
      type: 'CERTIFICATE',
      organization_claims: [],
    },
    {
      id: '5',
      original_name: 'bluesign Certificate expiring soon.pdf',
      effective_start_date: addDays(new Date(), 5).toISOString(),
      effective_end_date: addDays(new Date(), 5).toISOString(),
      type: 'CERTIFICATE',
      organization_claims: [],
    },
    {
      id: '6',
      original_name: 'PFAS-Test Certificate Want, Inc.pdf',
      effective_start_date: addDays(new Date(), 70).toISOString(),
      effective_end_date: addDays(new Date(), 70).toISOString(),
      type: 'CERTIFICATE',
      organization_claims: [],
    },
  ];
}

export function getFilesWithoutAssurances(): FilesWithAssurances[] {
  return [
    {
      id: '1',
      originalName: 'PFAS-Test Certificate.pdf',
      createdAt: '2024-05-01T20:00:00.000Z',
      type: 'OTHER',
      attributeAssurances: [],
      metadata: null,
    },
    {
      id: '2',
      originalName: 'PFAS-Test Certificate.pdf',
      createdAt: '2024-05-02T20:00:00.000Z',
      type: 'OTHER',
      attributeAssurances: [],
      metadata: null,
    },
    {
      id: '3',
      originalName: 'PFAS-Test Certificate.pdf',
      createdAt: '2024-05-03T20:00:00.000Z',
      type: 'OTHER',
      attributeAssurances: [],
      metadata: null,
    },
  ];
}

export function getFilesWithAssurances(): FilesWithAssurances[] {
  return [
    {
      id: '1',
      originalName: 'PFAS-Test Certificate.pdf',
      createdAt: '2024-05-01T20:00:00.000Z',
      type: 'CERTIFICATE',
      attributeAssurances: [
        {
          id: '1',
          effectiveStartDate: addDays(new Date(), 1).toISOString(),
          effectiveEndDate: addDays(new Date(), 70).toISOString(),
          sustainabilityAttribute: {
            id: '6',
            name: 'PFAS',
            level: 'SUPPLIER',
          },
          organizationFacility: {
            id: '1',
            name: 'Supplier',
            country: 'US',
            supplierTier: 2,
            materialSuppliers: [
              {
                material: {
                  id: '1',
                  name: 'Material',
                },
              },
            ],
          },
          material: null,
          product: null,
        },
      ],
      metadata: {
        summary: 'This is a summary',
        effective_end_date: null,
        effective_start_date: null,
        status: 'ai_extracted',
        certificate_number: 'CU1077874GRS-2023-00051776',
      },
    },
    {
      id: '2',
      originalName: 'Lead-Test Certificate.pdf',
      createdAt: '2024-05-01T20:00:00.000Z',
      type: 'STATEMENT',
      attributeAssurances: [
        {
          id: '2',
          effectiveStartDate: addDays(new Date(), 1).toISOString(),
          effectiveEndDate: addDays(new Date(), 70).toISOString(),
          sustainabilityAttribute: {
            id: '4',
            name: 'bluesign',
            level: 'MATERIAL',
          },
          material: {
            id: '1',
            name: 'Material 1',
            materialSuppliers: [
              {
                organizationFacility: {
                  id: '1',
                  name: 'Supplier',
                  supplierTier: 2,
                },
              },
            ],
          },
          organizationFacility: null,
          product: null,
        },
        {
          id: '3',
          effectiveStartDate: addDays(new Date(), 1).toISOString(),
          effectiveEndDate: addDays(new Date(), 70).toISOString(),
          sustainabilityAttribute: {
            id: '4',
            name: 'bluesign',
            level: 'MATERIAL',
          },
          material: {
            id: '2',
            name: 'Material 2',
            materialSuppliers: [
              {
                organizationFacility: {
                  id: '1',
                  name: 'Supplier',
                  supplierTier: 1,
                },
              },
            ],
          },
          organizationFacility: null,
          product: null,
        },
      ],
      metadata: {
        summary: 'This is a summary',
        effective_end_date: null,
        effective_start_date: null,
        status: 'ai_extracted',
        certificate_number: 'CU1077874GRS-2023-00051776',
      },
    },
  ];
}

export const materialsForAssurancesMock: {
  id: string;
  name: string;
}[] = [
  {
    id: '1',
    name: 'Material 1',
  },
  {
    id: '2',
    name: 'Material 2',
  },
  {
    id: '3',
    name: 'Material 3',
  },
];

export const suppliersForAssurancesMock: {
  id: string;
  name: string;
}[] = [
  {
    id: '1',
    name: 'Supplier 1',
  },
  {
    id: '2',
    name: 'Supplier 2',
  },
  {
    id: '3',
    name: 'Supplier 3',
  },
];

export function getFilesProcessingMock(): FilesWithAssurances[] {
  return [
    {
      id: '1',
      originalName: 'PFAS-Test Certificate.pdf',
      createdAt: '2024-05-01T20:00:00.000Z',
      type: 'SCOPE_CERTIFICATE',
      attributeAssurances: [
        {
          id: '1',
          effectiveStartDate: addDays(new Date(), 1).toISOString(),
          effectiveEndDate: addDays(new Date(), 70).toISOString(),
          sustainabilityAttribute: {
            id: '6',
            name: 'PFAS',
            level: 'SUPPLIER',
          },
          organizationFacility: {
            id: '1',
            name: 'Supplier',
            country: 'US',
            supplierTier: 2,
            materialSuppliers: [
              {
                material: {
                  id: '1',
                  name: 'Material',
                },
              },
            ],
          },
          material: null,
          product: null,
        },
      ],
      metadata: {
        summary: 'This is a summary',
        effective_end_date: null,
        effective_start_date: null,
        status: 'uploaded',
        certificate_number: 'CU1077874GRS-2023-00051776',
      },
    },
    {
      id: '2',
      originalName: 'Lead-Test Certificate.pdf',
      createdAt: '2024-05-01T20:00:00.000Z',
      type: 'CERTIFICATE',
      attributeAssurances: [
        {
          id: '2',
          effectiveStartDate: addDays(new Date(), 1).toISOString(),
          effectiveEndDate: addDays(new Date(), 70).toISOString(),
          sustainabilityAttribute: {
            id: '4',
            name: 'bluesign',
            level: 'MATERIAL',
          },
          material: {
            id: '1',
            name: 'Material 1',
            materialSuppliers: [
              {
                organizationFacility: {
                  id: '1',
                  name: 'Supplier',
                  supplierTier: 2,
                },
              },
            ],
          },
          organizationFacility: null,
          product: null,
        },
        {
          id: '3',
          effectiveStartDate: addDays(new Date(), 1).toISOString(),
          effectiveEndDate: addDays(new Date(), 70).toISOString(),
          sustainabilityAttribute: {
            id: '4',
            name: 'bluesign',
            level: 'MATERIAL',
          },
          material: {
            id: '2',
            name: 'Material 2',
            materialSuppliers: [
              {
                organizationFacility: {
                  id: '1',
                  name: 'Supplier',
                  supplierTier: 1,
                },
              },
            ],
          },
          organizationFacility: null,
          product: null,
        },
      ],
      metadata: {
        summary: 'This is a summary',
        effective_end_date: null,
        effective_start_date: null,
        status: 'uploaded',
        certificate_number: 'CU1077874GRS-2023-00051776',
      },
    },
  ];
}

export function filesProcessedWithDatesMock(): FilesWithAssurances[] {
  return [
    {
      id: '1',
      originalName: 'PFAS-Test Certificate.pdf',
      createdAt: '2024-05-01T20:00:00.000Z',
      type: 'CERTIFICATE',
      attributeAssurances: [],
      metadata: {
        summary: 'This is a summary',
        effective_end_date: '2024-05-01',
        effective_start_date: '2024-05-01',
        status: 'ai_extracted',
        certificate_number: 'CU1077874GRS-2023-00051776',
      },
    },
    {
      id: '2',
      originalName: 'Lead-Test Certificate.pdf',
      createdAt: '2024-05-21T20:00:00.000Z',
      type: 'CERTIFICATE',
      attributeAssurances: [],
      metadata: {
        summary: 'This is a summary',
        effective_end_date: '2024-04-20',
        effective_start_date: '2024-04-20',
        status: 'ai_extracted',
        certificate_number: 'CU1077874GRS-2023-00051776',
      },
    },
  ];
}

export function filesWithTooManyRecordsMock(): FilesWithAssurances[] {
  return [
    {
      id: '1',
      originalName: 'PFAS-Test Certificate.pdf',
      createdAt: '2024-05-01T20:00:00.000Z',
      type: 'CERTIFICATE',
      attributeAssurances: [],
      metadata: {
        summary: 'This is a summary',
        effective_end_date: '2024-05-01',
        effective_start_date: '2024-05-01',
        status: 'ai_extracted',
        certificate_number: 'CU1077874GRS-2023-00051776',
      },
    },
    {
      id: '2',
      originalName: 'Lead-Test Certificate.pdf',
      createdAt: '2024-05-21T20:00:00.000Z',
      type: 'CERTIFICATE',
      attributeAssurances: [
        {
          id: '2',
          effectiveStartDate: addDays(new Date(), 1).toISOString(),
          effectiveEndDate: addDays(new Date(), 70).toISOString(),
          sustainabilityAttribute: {
            id: '4',
            name: 'bluesign',
            level: 'MATERIAL',
          },
          material: {
            id: '1',
            name: 'Material 1',
            materialSuppliers: [
              {
                organizationFacility: {
                  id: '1',
                  name: 'Supplier',
                  supplierTier: 2,
                },
              },
            ],
          },
          organizationFacility: null,
          product: null,
        },
        {
          id: '3',
          effectiveStartDate: addDays(new Date(), 1).toISOString(),
          effectiveEndDate: addDays(new Date(), 70).toISOString(),
          sustainabilityAttribute: {
            id: '4',
            name: 'bluesign',
            level: 'MATERIAL',
          },
          material: {
            id: '2',
            name: 'Material 2',
            materialSuppliers: [
              {
                organizationFacility: {
                  id: '1',
                  name: 'Supplier',
                  supplierTier: 1,
                },
              },
            ],
          },
          organizationFacility: null,
          product: null,
        },
        {
          id: '4',
          effectiveStartDate: addDays(new Date(), 1).toISOString(),
          effectiveEndDate: addDays(new Date(), 70).toISOString(),
          sustainabilityAttribute: {
            id: '4',
            name: 'bluesign',
            level: 'MATERIAL',
          },
          material: {
            id: '2',
            name: 'Material 3',
            materialSuppliers: [
              {
                organizationFacility: {
                  id: '1',
                  name: 'Supplier',
                  supplierTier: 1,
                },
              },
            ],
          },
          organizationFacility: null,
          product: null,
        },
        {
          id: '5',
          effectiveStartDate: addDays(new Date(), 1).toISOString(),
          effectiveEndDate: addDays(new Date(), 70).toISOString(),
          sustainabilityAttribute: {
            id: '4',
            name: 'bluesign',
            level: 'MATERIAL',
          },
          material: {
            id: '2',
            name: 'Material 4',
            materialSuppliers: [
              {
                organizationFacility: {
                  id: '1',
                  name: 'Supplier',
                  supplierTier: 1,
                },
              },
            ],
          },
          organizationFacility: null,
          product: null,
        },
      ],
      metadata: {
        summary: 'This is a summary',
        effective_end_date: '2024-04-20',
        effective_start_date: '2024-04-20',
        status: 'ai_extracted',
        certificate_number: 'CU1077874GRS-2023-00051776',
      },
    },
  ];
}

export const getFileTypesMock = (): string[] => {
  return ['CERTIFICATE', 'TEST_REPORT', 'STATEMENT', 'ASSESSMENT', 'PURCHASE_ORDER', 'BILL_OF_MATERIALS', 'POLICY', 'OTHER', 'AUDIT_REPORT', 'SCOPE_CERTIFICATE'];
};

export function fileWithProductMocks(): FilesWithAssurances[] {
  return [
    {
      id: 'ofile_ia0wbdn2saqv7emiefqna2wy',
      originalName: '2022 Oeko Certification- YKK.JPG',
      createdAt: '2024-10-09T14:44:09.901Z',
      type: 'CERTIFICATE',
      metadata: null,
      attributeAssurances: [
        {
          id: 'bafdab69-8b15-4d07-9ef5-927cc95e2330',
          effectiveStartDate: '2022-11-02T00:00:00.000Z',
          effectiveEndDate: '2023-12-01T00:00:00.000Z',
          sustainabilityAttribute: {
            id: '4f0941bb-2e80-4f2e-bff5-80aa6dc5957e',
            name: 'Oeko-Tex Standard 100',
            level: 'MATERIAL',
          },
          organizationFacility: null,
          material: null,
          product: null,
        },
        {
          id: 'a6707bd7-fd9d-48ba-a87f-7ae2958ddffd',
          effectiveStartDate: '2023-12-01T00:00:00.000Z',
          effectiveEndDate: '2022-11-02T00:00:00.000Z',
          sustainabilityAttribute: {
            id: '4f0941bb-2e80-4f2e-bff5-80aa6dc5957e',
            name: 'Oeko-Tex Standard 100',
            level: 'MATERIAL',
          },
          organizationFacility: null,
          material: {
            id: '0e9135c9-c91d-45fd-8256-89e1c3fba854',
            name: 'Material 4',
            materialSuppliers: [],
          },
          product: null,
        },
        {
          id: 'attrass_p8lwqc7led1gnapxc908fou3',
          effectiveStartDate: null,
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: 'b6360d28-dfba-4b87-9632-0384ae9635e3',
            name: 'DPP (Digital Product Passport)',
            level: 'PRODUCT',
          },
          organizationFacility: null,
          material: null,
          product: {
            id: 'op_c0y7e5zsg09r0kxxlw2ha9cm',
            name: 'Product 3',
          },
        },
      ],
    },
    {
      id: 'ofile_xtu8n9rqlgko4v1nu8v8v5cg',
      originalName: '2022 Oeko-tex_YKK.JPG',
      createdAt: '2024-07-25T18:37:21.187Z',
      type: 'CERTIFICATE',
      metadata: null,
      attributeAssurances: [
        {
          id: 'c18540d8-0b2d-4bbb-9241-03ad922500ad',
          effectiveStartDate: '2024-09-13T16:03:32.277Z',
          effectiveEndDate: '2025-09-13T16:03:32.277Z',
          sustainabilityAttribute: {
            id: 'c9e8676d-5e48-444f-b788-1b729fdb2d2c',
            name: 'PFAS',
            level: 'MATERIAL',
          },
          organizationFacility: null,
          material: null,
          product: null,
        },
        {
          id: '2af60020-93c5-418b-a523-cedaf3c96ddd',
          effectiveStartDate: null,
          effectiveEndDate: '2023-11-30T00:00:00.000Z',
          sustainabilityAttribute: {
            id: '4f0941bb-2e80-4f2e-bff5-80aa6dc5957e',
            name: 'Oeko-Tex Standard 100',
            level: 'MATERIAL',
          },
          organizationFacility: null,
          material: null,
          product: null,
        },
      ],
    },
    {
      id: 'ofile_pyplz4gbctrf57pu6jlb9dly',
      originalName: 'Bluesign Certificate Yawliamy 2024.05.25.pdf',
      createdAt: '2024-10-09T14:42:13.185Z',
      type: 'CERTIFICATE',
      metadata: null,
      attributeAssurances: [
        {
          id: '946ce554-f598-487b-8cb9-c7bfb3168f9d',
          effectiveStartDate: '2021-07-23T00:00:00.000Z',
          effectiveEndDate: '2024-05-25T00:00:00.000Z',
          sustainabilityAttribute: {
            id: '6ebfad9b-39de-4ad3-aa45-4af4d2232ba7',
            name: 'Bluesign Product',
            level: 'PRODUCT',
          },
          organizationFacility: null,
          material: null,
          product: null,
        },
      ],
    },
    {
      id: 'ofile_pleozu9opqbk1uzeztx9aeyv',
      originalName: 'Polyester JTDQ220829 GRS Certification-KYUNG SEUNG.pdf',
      createdAt: '2024-09-19T22:07:28.458Z',
      type: 'TRANSACTION_CERTIFICATE',
      metadata: null,
      attributeAssurances: [
        {
          id: '841808da-18d2-420d-a9e1-1549deb95c06',
          effectiveStartDate: '2023-09-25T00:00:00.000Z',
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: '68d7ad19-f176-4b84-8c80-6bc395569467',
            name: 'GRS (Global Recycled Standard)',
            level: 'MATERIAL',
          },
          organizationFacility: null,
          material: null,
          product: null,
        },
      ],
    },
    {
      id: 'ofile_rq1c06vea03qm1k9zi6lfuoi',
      originalName: 'RCS_Scope_Certificate_FOAM(1).pdf',
      createdAt: '2024-10-07T14:43:45.056Z',
      type: 'SCOPE_CERTIFICATE',
      metadata: null,
      attributeAssurances: [],
    },
    {
      id: 'ofile_m1mact3hzaocs69bhm6fvcc6',
      originalName: 'RCS_Scope_Certificate_FOAM.pdf',
      createdAt: '2024-10-09T14:43:09.632Z',
      type: 'SCOPE_CERTIFICATE',
      metadata: null,
      attributeAssurances: [
        {
          id: '0f011319-7082-457c-8586-7d3e333c104f',
          effectiveStartDate: '2023-05-01T00:00:00.000Z',
          effectiveEndDate: '2024-04-30T00:00:00.000Z',
          sustainabilityAttribute: {
            id: 'be6fa78a-0794-4604-8ea3-2a801c031ed6',
            name: 'RCS (Recycled Claim Standard)',
            level: 'MATERIAL',
          },
          organizationFacility: null,
          material: null,
          product: null,
        },
        {
          id: 'attrass_igzlo6vki0012ct5cad0hhho',
          effectiveStartDate: null,
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: 'b6360d28-dfba-4b87-9632-0384ae9635e3',
            name: 'DPP (Digital Product Passport)',
            level: 'PRODUCT',
          },
          organizationFacility: {
            id: 'ofac_djkh7ccfbm738mkijm69gks8',
            name: 'Supplier 3',
            country: '',
            supplierTier: 2,
            materialSuppliers: [
              {
                material: {
                  id: 'mat_lc46wgoyozyef8rsial8vl4r',
                  name: 'Material 16',
                },
              },
              {
                material: {
                  id: '2f9a187c-1e2e-4932-aab3-9b9130aec7b3',
                  name: 'Material 3',
                },
              },
              {
                material: {
                  id: 'mat_m5331vcefoiou6oo0w68wwrm',
                  name: 'Material 5',
                },
              },
              {
                material: {
                  id: 'mat_vctuajyeyeuwow0djuxwzb9g',
                  name: 'Material 11',
                },
              },
            ],
          },
          material: {
            id: 'mat_lc46wgoyozyef8rsial8vl4r',
            name: 'Material 16',
            materialSuppliers: [
              {
                organizationFacility: {
                  id: 'ofac_djkh7ccfbm738mkijm69gks8',
                  name: 'Supplier 3',
                  supplierTier: 2,
                },
              },
            ],
          },
          product: null,
        },
        {
          id: 'attrass_prqnudtny55sq5jykk0djfv3',
          effectiveStartDate: null,
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: 'b6360d28-dfba-4b87-9632-0384ae9635e3',
            name: 'DPP (Digital Product Passport)',
            level: 'PRODUCT',
          },
          organizationFacility: {
            id: 'ofac_djkh7ccfbm738mkijm69gks8',
            name: 'Supplier 3',
            country: '',
            supplierTier: 2,
            materialSuppliers: [
              {
                material: {
                  id: 'mat_lc46wgoyozyef8rsial8vl4r',
                  name: 'Material 16',
                },
              },
              {
                material: {
                  id: '2f9a187c-1e2e-4932-aab3-9b9130aec7b3',
                  name: 'Material 3',
                },
              },
              {
                material: {
                  id: 'mat_m5331vcefoiou6oo0w68wwrm',
                  name: 'Material 5',
                },
              },
              {
                material: {
                  id: 'mat_vctuajyeyeuwow0djuxwzb9g',
                  name: 'Material 11',
                },
              },
            ],
          },
          material: {
            id: 'mat_m5331vcefoiou6oo0w68wwrm',
            name: 'Material 5',
            materialSuppliers: [
              {
                organizationFacility: {
                  id: 'ofac_djkh7ccfbm738mkijm69gks8',
                  name: 'Supplier 3',
                  supplierTier: 2,
                },
              },
            ],
          },
          product: null,
        },
        {
          id: 'attrass_a25f29pkdjqtkgg1yjms75zx',
          effectiveStartDate: null,
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: 'b6360d28-dfba-4b87-9632-0384ae9635e3',
            name: 'DPP (Digital Product Passport)',
            level: 'PRODUCT',
          },
          organizationFacility: {
            id: 'ofac_djkh7ccfbm738mkijm69gks8',
            name: 'Supplier 3',
            country: '',
            supplierTier: 2,
            materialSuppliers: [
              {
                material: {
                  id: 'mat_lc46wgoyozyef8rsial8vl4r',
                  name: 'Material 16',
                },
              },
              {
                material: {
                  id: '2f9a187c-1e2e-4932-aab3-9b9130aec7b3',
                  name: 'Material 3',
                },
              },
              {
                material: {
                  id: 'mat_m5331vcefoiou6oo0w68wwrm',
                  name: 'Material 5',
                },
              },
              {
                material: {
                  id: 'mat_vctuajyeyeuwow0djuxwzb9g',
                  name: 'Material 11',
                },
              },
            ],
          },
          material: {
            id: 'mat_vctuajyeyeuwow0djuxwzb9g',
            name: 'Material 11',
            materialSuppliers: [
              {
                organizationFacility: {
                  id: 'ofac_c833b42yr2kv52p73oy0nuve',
                  name: 'Supplier 15',
                  supplierTier: 2,
                },
              },
              {
                organizationFacility: {
                  id: 'ofac_li2sitegjb4f7gvriecw5q8l',
                  name: 'Material 16',
                  supplierTier: 2,
                },
              },
              {
                organizationFacility: {
                  id: 'ofac_djkh7ccfbm738mkijm69gks8',
                  name: 'Supplier 3',
                  supplierTier: 2,
                },
              },
              {
                organizationFacility: {
                  id: 'ofac_kdy8y6rhyhz3aj6vlxe72798',
                  name: 'Supplier 12',
                  supplierTier: 2,
                },
              },
            ],
          },
          product: null,
        },
      ],
    },
    {
      id: 'ofile_jqohnz87bn2fi2es7suhqb48',
      originalName: 'Thread- Oeko-tex Certificate 11-24396 pdf.pdf',
      createdAt: '2024-10-09T14:41:09.808Z',
      type: 'CERTIFICATE',
      metadata: null,
      attributeAssurances: [
        {
          id: '620733ef-5232-4258-9a54-b2a475f10351',
          effectiveStartDate: '2023-06-13T00:00:00.000Z',
          effectiveEndDate: '2023-11-30T00:00:00.000Z',
          sustainabilityAttribute: {
            id: '4f0941bb-2e80-4f2e-bff5-80aa6dc5957e',
            name: 'Oeko-Tex Standard 100',
            level: 'MATERIAL',
          },
          organizationFacility: null,
          material: null,
          product: null,
        },
        {
          id: 'attrass_bse2b9ysfnymaha6xpyjbmsh',
          effectiveStartDate: null,
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: 'b6360d28-dfba-4b87-9632-0384ae9635e3',
            name: 'DPP (Digital Product Passport)',
            level: 'PRODUCT',
          },
          organizationFacility: {
            id: 'ofac_kdy8y6rhyhz3aj6vlxe72798',
            name: 'Supplier 12',
            country: '',
            supplierTier: 2,
            materialSuppliers: [
              {
                material: {
                  id: '5926bb4c-5cbc-4b14-970f-968249444415',
                  name: 'Material 1',
                },
              },
              {
                material: {
                  id: 'mat_bj8zsf2imw9uvjjvk09h7ci0',
                  name: 'Material 10',
                },
              },
              {
                material: {
                  id: 'mat_vctuajyeyeuwow0djuxwzb9g',
                  name: 'Material 11',
                },
              },
            ],
          },
          material: null,
          product: null,
        },
        {
          id: 'attrass_iy6wgrb1j49hqen6mangzt3s',
          effectiveStartDate: null,
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: '5355a00d-5429-40d9-8cb1-56cc6f914fc9',
            name: 'No Intentional PFAS',
            level: 'SUPPLIER',
          },
          organizationFacility: {
            id: 'ofac_wxxekywiila10puwj2j7gmwg',
            name: 'Supplier 10',
            country: '',
            supplierTier: 1,
            materialSuppliers: [],
          },
          material: null,
          product: null,
        },
      ],
    },
    {
      id: 'ofile_ffezz5qutzechtndqr1unl0x',
      originalName: 'WRAP Certificate (Gold) KNK Saigon (1).pdf',
      createdAt: '2024-10-03T15:31:10.439Z',
      type: 'CERTIFICATE',
      metadata: null,
      attributeAssurances: [
        {
          id: '0d52faed-df1d-40e0-8d5c-4c415e37ba8f',
          effectiveStartDate: '2023-01-01T00:00:00.000Z',
          effectiveEndDate: '2023-12-31T00:00:00.000Z',
          sustainabilityAttribute: {
            id: 'a99e4eff-72ee-40f4-a476-0385ac6f52d3',
            name: 'WRAP (Worldwide Responsible Accredited Production)',
            level: 'SUPPLIER',
          },
          organizationFacility: null,
          material: null,
          product: null,
        },
        {
          id: '01fde7fc-458a-42db-bc37-636e7caba7bf',
          effectiveStartDate: '2023-07-10T00:00:00.000Z',
          effectiveEndDate: '2024-07-10T00:00:00.000Z',
          sustainabilityAttribute: {
            id: 'ad8a4599-57e4-43f4-b82f-192de5fce12d',
            name: 'Worldwide Responsible Accredited Production',
            level: 'SUPPLIER',
          },
          organizationFacility: null,
          material: null,
          product: null,
        },
      ],
    },
    {
      id: 'ofile_yjfp7z3b8xpbnh247ltlq23e',
      originalName: 'WRAP Certificate (Gold) KNK Saigon copy.pdf',
      createdAt: '2024-10-09T14:40:36.822Z',
      type: 'CERTIFICATE',
      metadata: null,
      attributeAssurances: [
        {
          id: '9dbd9190-a040-4f98-997a-e7d99436e54b',
          effectiveStartDate: '2023-01-01T00:00:00.000Z',
          effectiveEndDate: '2024-12-31T00:00:00.000Z',
          sustainabilityAttribute: {
            id: 'ad8a4599-57e4-43f4-b82f-192de5fce12d',
            name: 'Worldwide Responsible Accredited Production',
            level: 'SUPPLIER',
          },
          organizationFacility: null,
          material: null,
          product: null,
        },
      ],
    },
  ];
}
