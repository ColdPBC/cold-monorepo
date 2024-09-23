import { Files, FilesWithAssurances } from '@coldpbc/interfaces';
import { addDays } from 'date-fns';
import {filesProcessedWithDatesMocks} from "./graphql";

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
			type: "CERTIFICATE",
			organization_claims: [],
		},
		{
			id: '2',
			original_name: 'Lead-Test Certificate.pdf',
			effective_start_date: null,
			effective_end_date: null,
			type: "CERTIFICATE",
			organization_claims: [],
		},
		{
			id: '3',
			original_name: 'phthalate Certificate.pdf',
			effective_start_date: null,
			effective_end_date: null,
			type: "CERTIFICATE",
			organization_claims: [],
		},
		{
			id: '4',
			original_name: 'bluesign Certificate without date.pdf',
			effective_start_date: null,
			effective_end_date: null,
			type: "CERTIFICATE",
			organization_claims: [],
		},
		{
			id: '5',
			original_name: 'bluesign Certificate expiring soon.pdf',
			effective_start_date: addDays(new Date(), 5).toISOString(),
			effective_end_date: addDays(new Date(), 5).toISOString(),
			type: "CERTIFICATE",
			organization_claims: [],
		},
		{
			id: '6',
			original_name: 'PFAS-Test Certificate Want, Inc.pdf',
			effective_start_date: addDays(new Date(), 70).toISOString(),
			effective_end_date: addDays(new Date(), 70).toISOString(),
			type: "CERTIFICATE",
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
			type: "OTHER",
			attributeAssurances: [],
			metadata: null,
		},
		{
			id: '2',
			originalName: 'PFAS-Test Certificate.pdf',
			createdAt: '2024-05-02T20:00:00.000Z',
			type: "OTHER",
			attributeAssurances: [],
			metadata: null,
		},
		{
			id: '3',
			originalName: 'PFAS-Test Certificate.pdf',
			createdAt: '2024-05-03T20:00:00.000Z',
			type: "OTHER",
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
			type: "CERTIFICATE",
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
			type: "STATEMENT",
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
			type: "SCOPE_CERTIFICATE",
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
			type: "CERTIFICATE",
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
      type: "CERTIFICATE",
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
      type: "CERTIFICATE",
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

export const getFileTypesMock = (): string[] => {
  return [
    "CERTIFICATE",
    "TEST_REPORT",
    "STATEMENT",
    "ASSESSMENT",
    "PURCHASE_ORDER",
    "BILL_OF_MATERIALS",
    "POLICY",
    "OTHER",
    "AUDIT_REPORT",
    "SCOPE_CERTIFICATE",
  ]
}
