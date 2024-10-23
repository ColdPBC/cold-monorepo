import { EmissionPayload } from '@coldpbc/interfaces';

export const getDefaultEmissionMock = (): EmissionPayload => {
	return [
		{
			facility_id: '1000',
			facility_name: 'Headquarters',
			periods: [
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2022,
					emissions: [
						{
							scope: {
								ghg_category: 1,
								ghg_subcategory: 0,
							},
							activities: [
								{
									name: 'natural gas, high pressure',
									tco2e: 1.56,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 1,
							},
							activities: [
								{
									name: 'Business services: consulting, photography, marketing, etc',
									tco2e: 154.2,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 2,
							},
							activities: [
								{
									name: 'Construction work',
									tco2e: 12.43,
								},
								{
									name: 'Radio and television equipment: cameras, recording equipment, microphones',
									tco2e: 0.56,
								},
								{
									name: 'Other machinery and equipment',
									tco2e: 6.34,
								},
								{
									name: 'Electronics',
									tco2e: 2.23,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 3.23,
								},
								{
									name: 'natural gas, high pressure',
									tco2e: 0.43,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 6,
							},
							activities: [
								{
									name: 'Hotel and restaurant services',
									tco2e: 27.34,
								},
								{
									name: 'Air transport services',
									tco2e: 214.34,
								},
								{
									name: 'Land travel: trains, taxis, rideshare, car rental',
									tco2e: 8.67,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 7,
							},
							activities: [
								{
									name: 'transport, passenger, motor scooter',
									tco2e: 3.56,
								},
								{
									name: 'transport, passenger, bicycle',
									tco2e: 0.3,
								},
								{
									name: 'transport, passenger car',
									tco2e: 54.32,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 9,
							},
							activities: [
								{
									name: 'Air transport services',
									tco2e: 236.5,
								},
								{
									name: 'Other land transportation services',
									tco2e: 287.32,
								},
								{
									name: 'Sea and coastal water transportation services',
									tco2e: 23.56,
								},
							],
						},
					],
				},
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2023,
					emissions: [
						{
							scope: {
								ghg_category: 1,
								ghg_subcategory: 0,
							},
							activities: [
								{
									name: 'natural gas, high pressure',
									tco2e: 1.39,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 1,
							},
							activities: [
								{
									name: 'Business services: consulting, photography, marketing, etc',
									tco2e: 38.54,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 2,
							},
							activities: [
								{
									name: 'Construction work',
									tco2e: 3.81,
								},
								{
									name: 'Radio and television equipment: cameras, recording equipment, microphones',
									tco2e: 0.55,
								},
								{
									name: 'Other machinery and equipment',
									tco2e: 5.6,
								},
								{
									name: 'Electronics',
									tco2e: 1.83,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 0.77,
								},
								{
									name: 'natural gas, high pressure',
									tco2e: 0.31,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 6,
							},
							activities: [
								{
									name: 'Hotel and restaurant services',
									tco2e: 18.3,
								},
								{
									name: 'Air transport services',
									tco2e: 138.67,
								},
								{
									name: 'Land travel: trains, taxis, rideshare, car rental',
									tco2e: 2.92,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 7,
							},
							activities: [
								{
									name: 'transport, passenger, motor scooter',
									tco2e: 1.21,
								},
								{
									name: 'transport, passenger, bicycle',
									tco2e: 0.32,
								},
								{
									name: 'transport, passenger car',
									tco2e: 55.29,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 9,
							},
							activities: [
								{
									name: 'Air transport services',
									tco2e: 139.01,
								},
								{
									name: 'Other land transportation services',
									tco2e: 303.85,
								},
								{
									name: 'Sea and coastal water transportation services',
									tco2e: 14.09,
								},
							],
						},
					],
				},
			],
		},
		{
			facility_id: '1001',
			facility_name: 'Miami Retail',
			periods: [
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2022,
					emissions: [
						{
							scope: {
								ghg_category: 2,
								ghg_subcategory: 0,
							},
							activities: [
								{
									name: 'Direct emissions from electricity, average grid mix',
									tco2e: 2.11,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, average grid mix',
									tco2e: 0.45,
								},
							],
						},
					],
				},
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2023,
					emissions: [
						{
							scope: {
								ghg_category: 2,
								ghg_subcategory: 0,
							},
							activities: [
								{
									name: 'Direct emissions from electricity, average grid mix',
									tco2e: 1.4,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, average grid mix',
									tco2e: 0.33,
								},
							],
						},
					],
				},
			],
		},
		{
			facility_id: '1002',
			facility_name: 'Seattle Retail',
			periods: [
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2022,
					emissions: [
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 0.14,
								},
							],
						},
					],
				},
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2023,
					emissions: [
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 0.13,
								},
							],
						},
					],
				},
			],
		},
		{
			facility_id: '1003',
			facility_name: 'Manufacturer Alpha',
			periods: [
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2022,
					emissions: [
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 1,
							},
							activities: [
								{
									name: 'Chemical additives and blending components',
									tco2e: 2.43,
								},
								{
									name: 'Books, pamphlets, posters, and printed packaging',
									tco2e: 132.6,
								},
								{
									name: 'Plastic products, including polyester and nylon products',
									tco2e: 1843.23,
								},
								{
									name: 'Rubber products',
									tco2e: 233.2,
								},
								{
									name: 'Iron and steel products',
									tco2e: 240.23,
								},
								{
									name: 'Aluminum products',
									tco2e: 150.8,
								},
								{
									name: 'steel, chromium steel 18/8',
									tco2e: 23.9,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 15.23,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 4,
							},
							activities: [
								{
									name: 'Other land transportation services',
									tco2e: 175.6,
								},
								{
									name: 'Sea and coastal water transportation services',
									tco2e: 678.87,
								},
								{
									name: 'Air transport services',
									tco2e: 235.45,
								},
							],
						},
					],
				},
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2023,
					emissions: [
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 1,
							},
							activities: [
								{
									name: 'Chemical additives and blending components',
									tco2e: 2.72,
								},
								{
									name: 'Books, pamphlets, posters, and printed packaging',
									tco2e: 50.08,
								},
								{
									name: 'Plastic products, including polyester and nylon products',
									tco2e: 1440.39,
								},
								{
									name: 'Rubber products',
									tco2e: 121.43,
								},
								{
									name: 'Iron and steel products',
									tco2e: 102.1,
								},
								{
									name: 'Aluminum products',
									tco2e: 114.68,
								},
								{
									name: 'steel, chromium steel 18/8',
									tco2e: 11.69,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 8.54,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 4,
							},
							activities: [
								{
									name: 'Other land transportation services',
									tco2e: 66.04,
								},
								{
									name: 'Sea and coastal water transportation services',
									tco2e: 525.02,
								},
								{
									name: 'Air transport services',
									tco2e: 135.41,
								},
							],
						},
					],
				},
			],
		},
		{
			facility_id: '1004',
			facility_name: 'Warehouse Beta',
			periods: [
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2022,
					emissions: [
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 1,
							},
							activities: [
								{
									name: 'Direct emissions from electricity, average grid mix',
									tco2e: 2.21,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, average grid mix',
									tco2e: 0.34,
								},
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 1.65,
								},
							],
						},
					],
				},
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2023,
					emissions: [
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 1,
							},
							activities: [
								{
									name: 'Direct emissions from electricity, average grid mix',
									tco2e: 1.16,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, average grid mix',
									tco2e: 0.19,
								},
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 1.12,
								},
							],
						},
					],
				},
			],
		},
	];
};

export const getSingleYearsEmissionMock = (): EmissionPayload => {
	return [
		{
			facility_id: '1000',
			facility_name: 'Headquarters',
			periods: [
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2023,
					emissions: [
						{
							scope: {
								ghg_category: 1,
								ghg_subcategory: 0,
							},
							activities: [
								{
									name: 'natural gas, high pressure',
									tco2e: 1.39,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 1,
							},
							activities: [
								{
									name: 'Business services: consulting, photography, marketing, etc',
									tco2e: 38.54,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 2,
							},
							activities: [
								{
									name: 'Construction work',
									tco2e: 3.81,
								},
								{
									name: 'Radio and television equipment: cameras, recording equipment, microphones',
									tco2e: 0.55,
								},
								{
									name: 'Other machinery and equipment',
									tco2e: 5.6,
								},
								{
									name: 'Electronics',
									tco2e: 1.83,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 0.77,
								},
								{
									name: 'natural gas, high pressure',
									tco2e: 0.31,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 6,
							},
							activities: [
								{
									name: 'Hotel and restaurant services',
									tco2e: 18.3,
								},
								{
									name: 'Air transport services',
									tco2e: 138.67,
								},
								{
									name: 'Land travel: trains, taxis, rideshare, car rental',
									tco2e: 2.92,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 7,
							},
							activities: [
								{
									name: 'transport, passenger, motor scooter',
									tco2e: 1.21,
								},
								{
									name: 'transport, passenger, bicycle',
									tco2e: 0.32,
								},
								{
									name: 'transport, passenger car',
									tco2e: 55.29,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 9,
							},
							activities: [
								{
									name: 'Air transport services',
									tco2e: 139.01,
								},
								{
									name: 'Other land transportation services',
									tco2e: 303.85,
								},
								{
									name: 'Sea and coastal water transportation services',
									tco2e: 14.09,
								},
							],
						},
					],
				},
			],
		},
		{
			facility_id: '1001',
			facility_name: 'Miami Retail',
			periods: [
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2023,
					emissions: [
						{
							scope: {
								ghg_category: 2,
								ghg_subcategory: 0,
							},
							activities: [
								{
									name: 'Direct emissions from electricity, average grid mix',
									tco2e: 1.4,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, average grid mix',
									tco2e: 0.33,
								},
							],
						},
					],
				},
			],
		},
		{
			facility_id: '1002',
			facility_name: 'Seattle Retail',
			periods: [
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2023,
					emissions: [
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 0.13,
								},
							],
						},
					],
				},
			],
		},
		{
			facility_id: '1003',
			facility_name: 'Manufacturer Alpha',
			periods: [
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2023,
					emissions: [
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 1,
							},
							activities: [
								{
									name: 'Chemical additives and blending components',
									tco2e: 2.72,
								},
								{
									name: 'Books, pamphlets, posters, and printed packaging',
									tco2e: 50.08,
								},
								{
									name: 'Plastic products, including polyester and nylon products',
									tco2e: 1440.39,
								},
								{
									name: 'Rubber products',
									tco2e: 121.43,
								},
								{
									name: 'Iron and steel products',
									tco2e: 102.1,
								},
								{
									name: 'Aluminum products',
									tco2e: 114.68,
								},
								{
									name: 'steel, chromium steel 18/8',
									tco2e: 11.69,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 8.54,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 4,
							},
							activities: [
								{
									name: 'Other land transportation services',
									tco2e: 66.04,
								},
								{
									name: 'Sea and coastal water transportation services',
									tco2e: 525.02,
								},
								{
									name: 'Air transport services',
									tco2e: 135.41,
								},
							],
						},
					],
				},
			],
		},
		{
			facility_id: '1004',
			facility_name: 'Warehouse Beta',
			periods: [
				{
					id: 'foot_pebf5r0cti8m5wtl',
					facility_id: 'ofac_t0c98kgcv8a4c7x6',
					organization_id: 'org_g2zzR5rwTKVAIwCn',
					created_at: '2024-04-09T19:01:15.775Z',
					updated_at: '2024-04-09T19:01:15.772Z',
					type: 'year',
					value: 2023,
					emissions: [
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 1,
							},
							activities: [
								{
									name: 'Direct emissions from electricity, average grid mix',
									tco2e: 1.16,
								},
							],
						},
						{
							scope: {
								ghg_category: 3,
								ghg_subcategory: 3,
							},
							activities: [
								{
									name: 'Indirect emissions from electricity, average grid mix',
									tco2e: 0.19,
								},
								{
									name: 'Indirect emissions from electricity, photovoltaic',
									tco2e: 1.12,
								},
							],
						},
					],
				},
			],
		},
	];
};
