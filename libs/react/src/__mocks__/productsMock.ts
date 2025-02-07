import { ProductsQuery } from '@coldpbc/interfaces';
import { EntityLevel } from '@coldpbc/enums';
import { addDays } from 'date-fns';

export const getProductsMock = (): ProductsQuery[] => {
	return [
		{
			id: 'op_wvjr8v3tdzk6j3wl2x8a26bw',
			name: 'Product 1',
			metadata: null,
			seasonCode: 'Fall2024',
			upcCode: '123456789',
			brandProductId: '123456789',
			supplierProductId: '123456789',
			description: 'Description 1',
			productCategory: 'Product Category 1',
			productSubcategory: 'Product Subcategory 1',
			productMaterials: [
				{
					id: 'opm_qf5x197buxezns68tbgbs37h',
          yield: null,
          unitOfMeasure: null,
          weight: 5,
					material: {
						id: 'mat_xyqmz0hdf1p8p26wg3d5ju97',
						name: 'Material 15',
            materialCategory: null,
            materialSubcategory: null,
            emissionsFactor: 11.2,
						materialSuppliers: [
							{
								id: 'matsup_ty7un10erbcr9ruvuwye02e6',
								organizationFacility: {
									id: 'ofac_f20621xztckbtqirkjlc7qgy',
									name: 'Global Apparel Ltd.',
								},
							},
						],
						attributeAssurances: [],
            materialClassification: {
              id: 'matclass_1',
              name: 'Insulation Material',
            }
					},
				},
				{
					id: 'opm_zt3p4bfsa3ub3rxfe8witshb',
          yield: null,
          unitOfMeasure: null,
          weight: 5,
					material: {
						id: 'mat_beq7hd4e7efg5vzrzpp1xcb9',
						name: 'Material 7',
            materialCategory: null,
            materialSubcategory: null,
            emissionsFactor: 2,
						materialSuppliers: [
							{
								id: 'msup_mvldtl3a1y1y27i6dpuz7qs2',
								organizationFacility: {
									id: 'ofac_zhgx5abrfsxx39nb5cc18nr9',
									name: 'Kerluke - Armstrong',
								},
							},
						],
						attributeAssurances: [
							{
								id: '381c0b18-d9df-4734-84b8-d30e95ef454c',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '58421269-225a-4736-acdd-9acd7b4a1147',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Down+Codex.png',
									name: 'Down Codex',
								},
							},
							{
								id: 'ded47c4c-8706-4db3-8716-ae4b3f891b67',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '7cb028eb-bafe-4dd3-b11a-dddaa535b807',
									level: EntityLevel.SUPPLIER,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/SMETA+Audit.png',
									name: 'SMETA Audit (Sedex Members Ethical Trade Audit)',
								},
							},
							{
								id: 'c43b195d-75ad-4a87-8d20-e47ea16d409e',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: 'ccac80fd-2c4a-4ca0-aec3-989b615461c0',
									level: EntityLevel.ORGANIZATION,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Green+Button.png',
									name: 'Green Button',
								},
							},
						],
            materialClassification: {
              id: 'matclass_2',
              name: 'Leather',
            }
					},
				},
				{
					id: 'opm_pwrhpxj9xkrxprxol7k54gr4',
          yield: null,
          unitOfMeasure: null,
          weight: 2,
					material: {
						id: 'mat_x0x7th2m41zdgahmrbt9t58c',
						name: 'Material 9',
            materialCategory: null,
            materialSubcategory: null,
            emissionsFactor: 5,
						materialSuppliers: [
							{
								id: 'msup_v1092i9nodjiixmgf1ze4zfm',
								organizationFacility: {
									id: 'ofac_zhgx5abrfsxx39nb5cc18nr9',
									name: 'Kerluke - Armstrong',
								},
							},
						],
						attributeAssurances: [
							{
								id: '7610a434-cb02-4206-83ca-75632fa1dc6e',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '9d148721-1bf0-4e6f-bf7e-d037a30b8718',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'Arylamines',
								},
							},
							{
								id: '0e9b422d-089a-4b68-955c-37af2d1ee5d1',
								effectiveEndDate: addDays(new Date(), 75).toISOString(),
								organizationFile: {
									id: 'f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b',
								},
								sustainabilityAttribute: {
									id: '6fc74c15-cf95-4a4a-95ae-4f0f0eb3c401',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'AP & APEO',
								},
							},
							{
								id: 'cef5715c-8015-400a-9c35-97a8b34729a9',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: 'da1bcee4-5118-4dc6-9fa5-cdec1e26827d',
									level: EntityLevel.ORGANIZATION,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/B-Corp+Certification.png',
									name: 'B-Corp Certification',
								},
							},
						],
            materialClassification: {
              id: 'matclass_3',
              name: 'Coatings and Laminations',
            }
					},
				},
				{
					id: 'opm_lg4rlg979blgkw6k5pezltj3',
          yield: null,
          unitOfMeasure: null,
          weight: 1,
					material: {
						id: 'mat_sdk8wipu9fq5a7ihxhthx5pv',
						name: 'Example Nylon 1234',
            materialCategory: null,
            materialSubcategory: null,
            emissionsFactor: 4,
						materialSuppliers: [
							{
								id: 'msup_i3819gq1c53fygmlcn4qyz8w',
								organizationFacility: {
									id: 'ofac_vd809v326es9yz3rygkeb14f',
									name: 'Supplier Delta',
								},
							},
						],
						attributeAssurances: [
							{
								id: '0a16a219-8d92-43fe-9bde-1e2d1fae78bd',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '59b67578-91b6-407f-8531-9e9b4a3f65ab',
									level: EntityLevel.SUPPLIER,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/BEPI.png',
									name: 'BEPI (Business Environmental Performance Initiative)',
								},
							},
							{
								id: 'ada81b21-1006-4f1b-b429-2dd9fb90f466',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: 'c98cf2c7-961f-4301-ab91-d12334790376',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Better+Cotton+Iniative.png',
									name: 'Better Cotton Initiative',
								},
							},
							{
								id: '57ce4aad-9f75-44dc-b5d4-f7d715ebf4d2',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '336712cf-eead-4c51-87f1-263bcc636511',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'Bio-based Synthetics',
								},
							},
							{
								id: '56c1a108-6d01-4d04-aa9b-76ededb1fb39',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '20218086-90ff-4cb4-a35e-4aefe347f5fa',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Blue+Angel.png',
									name: 'Blue Angel',
								},
							},
						],
            materialClassification: {
              id: 'matclass_4',
              name: 'Metals',
            },
					},
				},
			],
			attributeAssurances: [],
			organizationFacility: {
				id: 'ofac_wxxekywiila10puwj2j7gmwg',
				name: 'Supplier 10',
				attributeAssurances: [
					{
						id: 'attrass_pqj06e5cxf2bhjgcd2cvxa0y',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: '24fd9960-7e35-45a1-8075-f99f2d841de6',
							level: EntityLevel.SUPPLIER,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/ZDHC.png',
							name: 'ZDHC MRSL (Zero Discharge of Hazardous Chemicals Manufacturing Restricted Substances List)',
						},
					},
					{
						id: 'attrass_qxgamdkpkzexmae480xh6gjg',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: '6fc74c15-cf95-4a4a-95ae-4f0f0eb3c401',
							level: EntityLevel.MATERIAL,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
							name: 'AP & APEO',
						},
					},
					{
						id: 'attrass_eep8rhf2m7ji1c0cp6phmedo',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: '9d148721-1bf0-4e6f-bf7e-d037a30b8718',
							level: EntityLevel.MATERIAL,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
							name: 'Arylamines',
						},
					},
					{
						id: 'attrass_a3y9s4kyejrktln3vm6g8645',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: 'da1bcee4-5118-4dc6-9fa5-cdec1e26827d',
							level: EntityLevel.ORGANIZATION,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/B-Corp+Certification.png',
							name: 'B-Corp Certification',
						},
					},
				],
			},
		},
		{
			id: 'op_z8c0enfue023uirxi3xyneil',
			name: 'Product 2',
			metadata: null,
			seasonCode: 'Fall2024',
			upcCode: '123456789',
			brandProductId: '123456789',
			supplierProductId: '123456789',
			description:
				'pneumonoultramicroscopicsilicovolcanoconiosis Odio quis eum non ullam voluptatem quas. Aut hic laboriosam nesciunt nisi omnis voluptas expedita. Quos iusto totam doloribus molestiae eum dolores sint ipsam. Maxime fuga neque qui ipsam tempore. Quisquam quia exercitationem voluptatum et earum enim beatae exercitationem quas. Nihil voluptatem maiores vel hic necessitatibus cumque.',
			productCategory: null,
			productSubcategory: 'Product Subcategory 1',
			productMaterials: [
				{
					id: 'opm_kk834waglx0r6cxrb6kjd1lh',
          yield: null,
          unitOfMeasure: null,
          weight: null,
					material: {
						id: 'mat_xyqmz0hdf1p8p26wg3d5ju97',
						name: 'Material 15',
            materialCategory: null,
            materialSubcategory: null,
            emissionsFactor: null,
						materialSuppliers: [
							{
								id: 'matsup_ty7un10erbcr9ruvuwye02e6',
								organizationFacility: {
									id: 'ofac_f20621xztckbtqirkjlc7qgy',
									name: 'Global Apparel Ltd.',
								},
							},
						],
						attributeAssurances: [],
            materialClassification: {
              id: 'matclass_1',
              name: 'Insulation Material',
            },
					},
				},
				{
					id: 'opm_kmubboc9e9q5v003p7xyu9k9',
          yield: null,
          unitOfMeasure: null,
          weight: null,
					material: {
						id: 'mat_u9lckkyqyii41q3by2wdt86i',
						name: 'Material 8',
            materialCategory: null,
            materialSubcategory: null,
            emissionsFactor: null,
						materialSuppliers: [
							{
								id: 'msup_sn673pues18vmk8l1d9jrehp',
								organizationFacility: {
									id: 'ofac_vd809v326es9yz3rygkeb14f',
									name: 'Supplier Delta',
								},
							},
							{
								id: 'msup_qb1t60n4bce506eouvjkri8d',
								organizationFacility: {
									id: 'ofac_ziiewcq7wmehkgcnt6jhb6re',
									name: 'Supplier 6',
								},
							},
						],
						attributeAssurances: [
							{
								id: '96ae4fab-9641-4488-b50e-da998dd786d6',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '6ebfad9b-39de-4ad3-aa45-4af4d2232ba7',
									level: EntityLevel.PRODUCT,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Bluesign+Product.png',
									name: 'Bluesign Product',
								},
							},
							{
								id: '6fbefc76-53d3-446d-bb0e-120a15ba3fce',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: 'e200cb55-51b9-4851-82df-23b467c8aef4',
									level: EntityLevel.ORGANIZATION,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/BSCI.png',
									name: 'BSCI (Business Social Compliance Initiative)',
								},
							},
							{
								id: 'aadc599d-5245-457c-9292-a95a3274322e',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '057a266f-ab44-4b34-876f-14fc3edb92fc',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'BPA',
								},
							},
						],
            materialClassification: {
              id: 'matclass_2',
              name: 'Plastics',
            },
					},
				},
				{
					id: 'opm_w02oqu9ex65qodbglczh0c2e',
          yield: null,
          unitOfMeasure: null,
          weight: null,
					material: {
						id: 'mat_vctuajyeyeuwow0djuxwzb9g',
						name: 'Material 11',
            materialCategory: null,
            materialSubcategory: null,
            emissionsFactor: null,
						materialSuppliers: [
							{
								id: 'matsup_v2uj0x6hlvhqvmv2wqyszpd2',
								organizationFacility: {
									id: 'ofac_c833b42yr2kv52p73oy0nuve',
									name: 'Supplier 15',
								},
							},
							{
								id: 'msup_cs23eebzc4l1zkp1ipkaryup',
								organizationFacility: {
									id: 'ofac_djkh7ccfbm738mkijm69gks8',
									name: 'Supplier 3',
								},
							},
							{
								id: 'matsup_kj0rpuh0v5qap4l32r6f52pa',
								organizationFacility: {
									id: 'ofac_kdy8y6rhyhz3aj6vlxe72798',
									name: 'Supplier 12',
								},
							},
						],
						attributeAssurances: [
							{
								id: '40bf1d37-dba2-45a3-a646-71f94ce6040b',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '9d148721-1bf0-4e6f-bf7e-d037a30b8718',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'Arylamines',
								},
							},
							{
								id: '8ec1e381-c6f6-459a-82e5-f07bbae509b2',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '6fc74c15-cf95-4a4a-95ae-4f0f0eb3c401',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'AP & APEO',
								},
							},
						],
            materialClassification: {
              id: 'matclass_2',
              name: 'Synthetic Leather',
            },
					},
				},
				{
					id: 'opm_j39ropi5u7x0y1qzbme0tygf',
          yield: null,
          unitOfMeasure: null,
          weight: null,
					material: {
						id: 'mat_sdk8wipu9fq5a7ihxhthx5pv',
						name: 'Example Nylon 1234',
            materialCategory: null,
            materialSubcategory: null,
            emissionsFactor: null,
						materialSuppliers: [
							{
								id: 'msup_i3819gq1c53fygmlcn4qyz8w',
								organizationFacility: {
									id: 'ofac_vd809v326es9yz3rygkeb14f',
									name: 'Supplier Delta',
								},
							},
						],
						attributeAssurances: [
							{
								id: '0a16a219-8d92-43fe-9bde-1e2d1fae78bd',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '59b67578-91b6-407f-8531-9e9b4a3f65ab',
									level: EntityLevel.SUPPLIER,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/BEPI.png',
									name: 'BEPI (Business Environmental Performance Initiative)',
								},
							},
							{
								id: 'ada81b21-1006-4f1b-b429-2dd9fb90f466',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: 'c98cf2c7-961f-4301-ab91-d12334790376',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Better+Cotton+Iniative.png',
									name: 'Better Cotton Initiative',
								},
							},
							{
								id: '57ce4aad-9f75-44dc-b5d4-f7d715ebf4d2',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '336712cf-eead-4c51-87f1-263bcc636511',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'Bio-based Synthetics',
								},
							},
							{
								id: '56c1a108-6d01-4d04-aa9b-76ededb1fb39',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '20218086-90ff-4cb4-a35e-4aefe347f5fa',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Blue+Angel.png',
									name: 'Blue Angel',
								},
							},
						],
            materialClassification: {
              id: 'matclass_2',
              name: 'Wood-based Materials',
            },
					},
				},
			],
			attributeAssurances: [],
			organizationFacility: {
				id: 'ofac_wxxekywiila10puwj2j7gmwg',
				name: 'Supplier 10',
				attributeAssurances: [
					{
						id: 'attrass_pqj06e5cxf2bhjgcd2cvxa0y',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: '24fd9960-7e35-45a1-8075-f99f2d841de6',
							level: EntityLevel.SUPPLIER,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/ZDHC.png',
							name: 'ZDHC MRSL (Zero Discharge of Hazardous Chemicals Manufacturing Restricted Substances List)',
						},
					},
					{
						id: 'attrass_qxgamdkpkzexmae480xh6gjg',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: '6fc74c15-cf95-4a4a-95ae-4f0f0eb3c401',
							level: EntityLevel.MATERIAL,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
							name: 'AP & APEO',
						},
					},
					{
						id: 'attrass_eep8rhf2m7ji1c0cp6phmedo',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: '9d148721-1bf0-4e6f-bf7e-d037a30b8718',
							level: EntityLevel.MATERIAL,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
							name: 'Arylamines',
						},
					},
					{
						id: 'attrass_a3y9s4kyejrktln3vm6g8645',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: 'da1bcee4-5118-4dc6-9fa5-cdec1e26827d',
							level: EntityLevel.ORGANIZATION,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/B-Corp+Certification.png',
							name: 'B-Corp Certification',
						},
					},
				],
			},
		},
		{
			id: 'op_c0y7e5zsg09r0kxxlw2ha9cm',
			name: 'Product 3',
			metadata: null,
			seasonCode: 'Fall2024',
			upcCode: '123456789',
			brandProductId: '123456789',
			supplierProductId: '123456789',
			description: 'Description 1',
			productCategory: 'Product Category 1',
			productSubcategory: null,
			productMaterials: [
				{
					id: 'opm_rrnqxqbnp2vlmb8278q0x29f',
          yield: 2,
          unitOfMeasure: 'pcs',
          weight: 300,
					material: {
						id: '5926bb4c-5cbc-4b14-970f-968249444415',
						name: 'Material 1',
            materialCategory: 'Material Category 1',
            materialSubcategory: 'Material Subcategory 1',
            emissionsFactor: 4,
						materialSuppliers: [
							{
								id: 'matsup_ccwa08m14j91q4tjuzgz4zsv',
								organizationFacility: {
									id: 'ofac_kdy8y6rhyhz3aj6vlxe72798',
									name: 'Supplier 12',
								},
							},
						],
						attributeAssurances: [],
            materialClassification: {
              id: 'matclass_5',
              name: 'Foam',
            },
					},
				},
				{
					id: 'opm_ynpia336jl34ar26ikpje5sj',
          yield: 3.3,
          unitOfMeasure: 'm2',
          weight: 2,
					material: {
						id: 'mat_beq7hd4e7efg5vzrzpp1xcb9',
						name: 'Material 7',
            materialCategory: 'Material Category 1',
            materialSubcategory: 'Material Subcategory 2',
            emissionsFactor: 3.5,
						materialSuppliers: [
							{
								id: 'msup_mvldtl3a1y1y27i6dpuz7qs2',
								organizationFacility: {
									id: 'ofac_zhgx5abrfsxx39nb5cc18nr9',
									name: 'Kerluke - Armstrong',
								},
							},
						],
						attributeAssurances: [
							{
								id: '381c0b18-d9df-4734-84b8-d30e95ef454c',
								effectiveEndDate: addDays(new Date(), 50).toISOString(),
								organizationFile: {
									id: 'f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b',
								},
								sustainabilityAttribute: {
									id: '58421269-225a-4736-acdd-9acd7b4a1147',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Down+Codex.png',
									name: 'Down Codex',
								},
							},
							{
								id: 'ded47c4c-8706-4db3-8716-ae4b3f891b67',
								effectiveEndDate: addDays(new Date(), 50).toISOString(),
								organizationFile: {
									id: 'f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b',
								},
								sustainabilityAttribute: {
									id: '7cb028eb-bafe-4dd3-b11a-dddaa535b807',
									level: EntityLevel.SUPPLIER,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/SMETA+Audit.png',
									name: 'SMETA Audit (Sedex Members Ethical Trade Audit)',
								},
							},
							{
								id: 'c43b195d-75ad-4a87-8d20-e47ea16d409e',
								effectiveEndDate: addDays(new Date(), 50).toISOString(),
								organizationFile: {
									id: 'f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b',
								},
								sustainabilityAttribute: {
									id: 'ccac80fd-2c4a-4ca0-aec3-989b615461c0',
									level: EntityLevel.ORGANIZATION,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Green+Button.png',
									name: 'Green Button',
								},
							},
						],
            materialClassification: {
              id: 'matclass_6',
              name: 'Insulation Material',
            },
					},
				},
				{
					id: 'opm_an0ygchf305yo1b2faro7au6',
          yield: 4.6,
          unitOfMeasure: 'm',
          weight: 5.2,
					material: {
						id: 'mat_u9lckkyqyii41q3by2wdt86i',
						name: 'Material 8',
            materialCategory: 'Material Category 2',
            materialSubcategory: 'Material Subcategory 1',
            emissionsFactor: 4.5,
						materialSuppliers: [
							{
								id: 'msup_sn673pues18vmk8l1d9jrehp',
								organizationFacility: {
									id: 'ofac_vd809v326es9yz3rygkeb14f',
									name: 'Supplier Delta',
								},
							},
							{
								id: 'msup_qb1t60n4bce506eouvjkri8d',
								organizationFacility: {
									id: 'ofac_ziiewcq7wmehkgcnt6jhb6re',
									name: 'Supplier 6',
								},
							},
						],
						attributeAssurances: [
							{
								id: '96ae4fab-9641-4488-b50e-da998dd786d6',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '6ebfad9b-39de-4ad3-aa45-4af4d2232ba7',
									level: EntityLevel.PRODUCT,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Bluesign+Product.png',
									name: 'Bluesign Product',
								},
							},
							{
								id: '6fbefc76-53d3-446d-bb0e-120a15ba3fce',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: 'e200cb55-51b9-4851-82df-23b467c8aef4',
									level: EntityLevel.ORGANIZATION,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/BSCI.png',
									name: 'BSCI (Business Social Compliance Initiative)',
								},
							},
							{
								id: 'aadc599d-5245-457c-9292-a95a3274322e',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '057a266f-ab44-4b34-876f-14fc3edb92fc',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'BPA',
								},
							},
						],
            materialClassification: {
              id: 'matclass_7',
              name: 'Plastics',
            },
					},
				},
				{
					id: 'opm_btmrnz0tujog6nq1lf86voyj',
          yield: 3.75,
          unitOfMeasure: 'm',
          weight: 1.1,
					material: {
						id: 'mat_x0x7th2m41zdgahmrbt9t58c',
						name: 'Material 9',
            materialCategory: 'Material Category 1',
            materialSubcategory: 'Material Subcategory 2',
            emissionsFactor: 20.1,
						materialSuppliers: [
							{
								id: 'msup_v1092i9nodjiixmgf1ze4zfm',
								organizationFacility: {
									id: 'ofac_zhgx5abrfsxx39nb5cc18nr9',
									name: 'Kerluke - Armstrong',
								},
							},
						],
						attributeAssurances: [
							{
								id: '7610a434-cb02-4206-83ca-75632fa1dc6e',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '9d148721-1bf0-4e6f-bf7e-d037a30b8718',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'Arylamines',
								},
							},
							{
								id: '0e9b422d-089a-4b68-955c-37af2d1ee5d1',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '6fc74c15-cf95-4a4a-95ae-4f0f0eb3c401',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'AP & APEO',
								},
							},
							{
								id: 'cef5715c-8015-400a-9c35-97a8b34729a9',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: 'da1bcee4-5118-4dc6-9fa5-cdec1e26827d',
									level: EntityLevel.ORGANIZATION,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/B-Corp+Certification.png',
									name: 'B-Corp Certification',
								},
							},
						],
            materialClassification: {
              id: 'matclass_8',
              name: 'Synthetic Leather',
            },
					},
				},
				{
					id: 'opm_eppxah0jo1qm1pcl1ipctlty',
          yield: 2,
          unitOfMeasure: 'pcs',
          weight: 3.4,
					material: {
						id: 'mat_vctuajyeyeuwow0djuxwzb9g',
						name: 'Material 11',
            materialCategory: 'Material Category 2',
            materialSubcategory: 'Material Subcategory 2',
            emissionsFactor: 14.5,
						materialSuppliers: [
							{
								id: 'matsup_v2uj0x6hlvhqvmv2wqyszpd2',
								organizationFacility: {
									id: 'ofac_c833b42yr2kv52p73oy0nuve',
									name: 'Supplier 15',
								},
							},
							{
								id: 'msup_cs23eebzc4l1zkp1ipkaryup',
								organizationFacility: {
									id: 'ofac_djkh7ccfbm738mkijm69gks8',
									name: 'Supplier 3',
								},
							},
							{
								id: 'matsup_kj0rpuh0v5qap4l32r6f52pa',
								organizationFacility: {
									id: 'ofac_kdy8y6rhyhz3aj6vlxe72798',
									name: 'Supplier 12',
								},
							},
						],
						attributeAssurances: [
							{
								id: '40bf1d37-dba2-45a3-a646-71f94ce6040b',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '9d148721-1bf0-4e6f-bf7e-d037a30b8718',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'Arylamines',
								},
							},
							{
								id: '8ec1e381-c6f6-459a-82e5-f07bbae509b2',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '6fc74c15-cf95-4a4a-95ae-4f0f0eb3c401',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'AP & APEO',
								},
							},
						],
            materialClassification: {
              id: 'matclass_8',
              name: 'Wood-based Materials',
            },
					},
				},
				{
					id: 'opm_l30omtgvn91n7bt8jm2aiu57',
          yield: null,
          unitOfMeasure: null,
          weight: null,
					material: {
						id: 'mat_sdk8wipu9fq5a7ihxhthx5pv',
						name: 'Example Nylon 1234',
            materialCategory: 'Material Category 3',
            materialSubcategory: 'Material Subcategory 1',
            emissionsFactor: null,
						materialSuppliers: [
							{
								id: 'msup_i3819gq1c53fygmlcn4qyz8w',
								organizationFacility: {
									id: 'ofac_vd809v326es9yz3rygkeb14f',
									name: 'Supplier Delta',
								},
							},
						],
						attributeAssurances: [
							{
								id: '0a16a219-8d92-43fe-9bde-1e2d1fae78bd',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '59b67578-91b6-407f-8531-9e9b4a3f65ab',
									level: EntityLevel.SUPPLIER,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/BEPI.png',
									name: 'BEPI (Business Environmental Performance Initiative)',
								},
							},
							{
								id: 'ada81b21-1006-4f1b-b429-2dd9fb90f466',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: 'c98cf2c7-961f-4301-ab91-d12334790376',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Better+Cotton+Iniative.png',
									name: 'Better Cotton Initiative',
								},
							},
							{
								id: '57ce4aad-9f75-44dc-b5d4-f7d715ebf4d2',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '336712cf-eead-4c51-87f1-263bcc636511',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
									name: 'Bio-based Synthetics',
								},
							},
							{
								id: '56c1a108-6d01-4d04-aa9b-76ededb1fb39',
								effectiveEndDate: null,
								organizationFile: null,
								sustainabilityAttribute: {
									id: '20218086-90ff-4cb4-a35e-4aefe347f5fa',
									level: EntityLevel.MATERIAL,
									logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Blue+Angel.png',
									name: 'Blue Angel',
								},
							},
						],
            materialClassification: {
              id: 'matclass_9',
              name: 'Synthetic Leather',
            },
					},
				},
			],
			attributeAssurances: [
				{
					id: 'attrass_qtu8uc01hqportfm2cq4vfdi',
					effectiveEndDate: addDays(new Date(), 75).toISOString(),
					organizationFile: {
						id: 'f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b',
					},
					sustainabilityAttribute: {
						id: 'susatr_ctzexktkgpudh39j7fr5v506',
						level: EntityLevel.PRODUCT,
						name: 'Super Duper PFAS Free 2',
					},
				},
			],
			organizationFacility: {
				id: 'ofac_wxxekywiila10puwj2j7gmwg',
				name: 'Supplier 10',
				attributeAssurances: [
					{
						id: 'attrass_pqj06e5cxf2bhjgcd2cvxa0y',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: '24fd9960-7e35-45a1-8075-f99f2d841de6',
							level: EntityLevel.SUPPLIER,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/ZDHC.png',
							name: 'ZDHC MRSL (Zero Discharge of Hazardous Chemicals Manufacturing Restricted Substances List)',
						},
					},
					{
						id: 'attrass_qxgamdkpkzexmae480xh6gjg',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: '6fc74c15-cf95-4a4a-95ae-4f0f0eb3c401',
							level: EntityLevel.MATERIAL,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
							name: 'AP & APEO',
						},
					},
					{
						id: 'attrass_eep8rhf2m7ji1c0cp6phmedo',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: '9d148721-1bf0-4e6f-bf7e-d037a30b8718',
							level: EntityLevel.MATERIAL,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
							name: 'Arylamines',
						},
					},
					{
						id: 'attrass_a3y9s4kyejrktln3vm6g8645',
						effectiveEndDate: null,
						organizationFile: null,
						sustainabilityAttribute: {
							id: 'da1bcee4-5118-4dc6-9fa5-cdec1e26827d',
							level: EntityLevel.ORGANIZATION,
							logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/B-Corp+Certification.png',
							name: 'B-Corp Certification',
						},
					},
				],
			},
		},
	];
};

export const getProductsMockById = (id: string): ProductsQuery | null => {
	return getProductsMock().find(product => product.id === id) || null;
};
