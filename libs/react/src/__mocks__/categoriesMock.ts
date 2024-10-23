export function getCategoriesDataMock(): any {
	return {
		description: '2023 Taxonomy',
		name: 'taxonomy_mock',
		definition: {
			cold_score: null,
			categories: {
				company_decarbonization: {
					category_name: 'Company Decarbonization',
					idx: 0,
					subcategories: {
						facilities: {
							subcategory_name: 'Facilities',
							subcategory_description: 'Your facilities footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
							idx: 0,
							journey_score: 25,
							activities: {
								electricity_owned: {
									activity_description: 'Electricity consumption at all company owned facilities',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 13.23,
										},
										'2023': {
											period_type: 'year',
											value: 11.4,
										},
										'2023-q4': {
											period_type: 'quarter',
											value: 3.2,
										},
									},
									activity_name: 'Electricity Owned',
								},
								fuel_owned: {
									activity_description: 'Natural Gas, Propane, and Diesel consumption at all company owned facilities',
									activity_name: 'Fuel Owned',
								},
								electricity_leased: {
									activity_description: 'Electricity consumption at all company leased facilities',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 47,
										},
										'2023': {
											period_type: 'year',
											value: 11.4,
										},
										'2023-q4': {
											period_type: 'quarter',
											value: 3.2,
										},
									},
									activity_name: 'Electricity Leased',
								},
								fuel_leased: {
									activity_description: 'Natural Gas, Propane, and Diesel consumption at all company leased facilities',
									activity_name: 'Fuel Leased',
								},
							},
						},
						travel: {
							subcategory_name: 'Travel',
							subcategory_description: 'Your travel footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
							journey_score: 12,
							idx: 1,
							activities: {
								vehicle_fuel: {
									activity_description: 'Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 90,
										},
										'2023': {
											period_type: 'year',
											value: 11.4,
										},
										'2023-q4': {
											period_type: 'quarter',
											value: 3.2,
										},
									},
									activity_name: 'Vehicle Fuel',
								},
								vehicle_electricity: {
									activity_description: 'Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased',
									activity_name: 'Vehicle Electricity',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 70,
										},
									},
								},
								commuting: {
									activity_description: 'Employee transportation to/from worksite (ICE, EV, bus, train, scooter, bike, walking, etc.) ',
									activity_name: 'Commuting',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 10,
										},
									},
								},
								air_travel: {
									activity_description: 'Business-related air travel, domestic and international. ',
									activity_name: 'Air Travel',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 12,
										},
									},
								},
								other_travel: {
									activity_description: 'Rail, boat, taxi, and car service travel, hotel and boarding costs, food and expenses, etc.',
									activity_name: 'Other Travel',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 45,
										},
									},
								},
							},
						},
						operations: {
							journey_score: 72,
							idx: 2,
							activities: {
								machinery_fuel: {
									activity_description: 'Forklifts, excavators, cranes, other heavy machinery.',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 22,
										},
										'2023': {
											period_type: 'year',
											value: 11.4,
										},
										'2023-q4': {
											period_type: 'quarter',
											value: 3.2,
										},
									},
									activity_name: 'Machinery Fuel',
								},
								machinery_electricity: {
									activity_description: 'Forklifts, excavators, cranes, other heavy machinery. ',
									activity_name: 'Machinery Electricity',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 30,
										},
									},
								},
								cloud_computing: {
									activity_description: 'Server & SaaS usage. ',
									activity_name: 'Cloud Computing',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 42,
										},
									},
								},
								professional_services: {
									activity_description: 'Creative, marketing and communications, consultants, legal, etc. ',
									activity_name: 'Professional Services',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 18,
										},
									},
								},
								business_supplies: {
									activity_description: 'Consumables and single-use items: Inks, papers, napkins & towels, etc.',
									activity_name: 'Business Supplies',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 22,
										},
									},
								},
								business_equipment: {
									activity_description: 'Printers, sinks & toilets, computers, printers, other electronic appliances. ',
									activity_name: 'Business Equipment',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 48,
										},
									},
								},
								furniture: {
									activity_description: 'Furniture for offices, company-owned or leased residences, and other worksites.  ',
									activity_name: 'Furniture',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 8,
										},
									},
								},
							},
							subcategory_name: 'Operations',
							subcategory_description: 'Your operations footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
						},
						product: {
							journey_score: 71,
							idx: 3,
							activities: {
								manufacturing_energy: {
									activity_description: 'Process energy (electric + heat) used for making products.',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 15,
										},
										'2023': {
											period_type: 'year',
											value: 11.4,
										},
										'2023-q4': {
											period_type: 'quarter',
											value: 3.2,
										},
									},
									activity_name: 'Manufacturing Energy',
								},
								materials: {
									activity_description: 'Purchased raw materials and manufactured inputs.',
									activity_name: 'Materials',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 18,
										},
									},
								},
								engineering_and_innovation: {
									activity_description: 'Design new products and services for environmental impact.',
									activity_name: 'Engineering & Innovation',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 30,
										},
									},
								},
								manufacturing_waste: {
									activity_description: 'Reduce production-related materials waste. ',
									activity_name: 'Manufacturing Waste',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 27,
										},
									},
								},
								product_use: {
									activity_description: 'Optimize product use impact through customer education and behavior change.  ',
									activity_name: 'Product Use',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 31,
										},
									},
								},
								packaging_materials: {
									activity_description: 'What raw materials + manufactured products are purchased for packaging. ',
									activity_name: 'Packaging Materials',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 8,
										},
									},
								},
								packaging_disposal: {
									activity_description: 'Consumer disposal of packaging (recycling, composting, trash, etc.) ',
									activity_name: 'Packaging Disposal',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 16,
										},
									},
								},
								upstream_shipping_and_freight: {
									activity_description: 'Movement of materials and manufactured inputs to manufacturing facilities (includes import freight by land, air, or sea).  ',
									activity_name: 'Upstream Shipping',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 24,
										},
									},
								},
								downstream_shipping_and_freight: {
									activity_description: 'Movement of finished product to distributors, retailers, and customers by land, sea, or air.',
									activity_name: 'Downstream Shipping',
									footprint: {
										'2022': {
											period_type: 'year',
											value: 7,
										},
									},
								},
							},
							subcategory_name: 'Product',
							subcategory_description: 'Your product footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
						},
					},
				},
				employee_engagement: {
					category_name: 'Employee Engagement',
					idx: 1,
					subcategories: {
						employee_footprint: {
							journey_score: 100,
							idx: 0,
							activities: {
								home: {
									activity_description:
										'Empower employees to reduce their carbon footprint at home, through energy efficiency, renewable energy, and other reduction opportunities.',
									activity_name: 'Home',
								},
								transport_and_travel: {
									activity_description:
										'Reduce transport and travel-related emissions through public transportation, EVs, personal mobility devices, behavior change, and education. ',
									activity_name: 'Transport And Travel',
								},
								personal_finance: {
									activity_description: 'Steward financial resources to maximize climate impact (401k, investing opportunities, debit/credit cards, etc.) ',
									activity_name: 'Personal Finance',
								},
							},
							subcategory_name: 'Employee Footprint',
							subcategory_description: 'Your employee footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
						},
						employee_activation: {
							journey_score: 33,
							idx: 1,
							activities: {
								workplace: {
									activity_description: 'Enable employees to become climate and environmental leaders in the office/workplace through education and other opportunities. ',
									activity_name: 'Workplace',
								},
								community: {
									activity_description: 'Activate employees for community environmental impact through relevant workshops & education opportunities on material, local issues.  ',
									activity_name: 'Community',
								},
							},
							subcategory_name: 'Employee Activation',
							subcategory_description: 'Your employee activation is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
						},
					},
				},
				climate_leadership: {
					category_name: 'Climate Leadership',
					idx: 2,
					subcategories: {
						internal_alignment: {
							journey_score: 66,
							idx: 0,
							activities: {
								finance: {
									activity_description: 'Climate friendly financial stewardship (banking and investments) and decision making. ',
									activity_name: 'Finance',
								},
								hr: {
									activity_description: 'Drive impact and improve employee retention through strategic environmental personnel management. ',
									activity_name: 'Hr',
								},
								'long-term_planning': {
									activity_description: 'Ensure long-term impact through strategic business planning and executive-level governance. ',
									activity_name: 'Long Term Planning',
								},
								transparency: {
									activity_description: 'Disclosure of environmental performance & stewardship. ',
									activity_name: 'Transparency',
								},
								purchasing: {
									activity_description: 'Ensure environmental impact is prioritized through supplier choice & product selection.  ',
									activity_name: 'Purchasing',
								},
								client_work: {
									activity_description: 'Introducing environmentally friendly choices into work products for clients ',
									activity_name: 'Client Work',
								},
								additional_environmental_issues: {
									activity_description: 'Actions & goals on water, biodiversity, etc.',
									activity_name: 'Additional Environmental Issues',
								},
							},
							subcategory_name: 'Internal Alignment',
							subcategory_description:
								'Your internal alignment footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
						},
						community_impact: {
							journey_score: 36,
							idx: 1,
							activities: {
								collective_action_and_advocacy: {
									activity_description: 'Non-financial contribution of time or influence to a group or cause that the company believes in',
									activity_name: 'Collective Action And Advocacy',
								},
								philanthropy: {
									activity_description: 'Financial contribution to mission-aligned group or cause.',
									activity_name: 'Philanthropy',
								},
							},
							subcategory_name: 'Community Impact',
							subcategory_description:
								'Your community impact footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
						},
					},
				},
			},
		},
	};
}

export function getCategoriesEmptyDataMock() {
	return {
		definition: {
			categories: {},
		},
	};
}

export function getFootprintDataMock() {
	return getCategoriesDataMock().definition.categories.company_decarbonization;
}

export function getFootprintDataMockTwoSubCats() {
	const data = getCategoriesDataMock().definition.categories.company_decarbonization;
	if (data?.subcategories) {
		data.subcategories.product = undefined;
		data.subcategories.operations = undefined;
	}

	return data;
}

export function getFootprintDataMockThreeSubCats() {
	const data = getCategoriesDataMock().definition.categories.company_decarbonization;
	if (data?.subcategories) {
		data.subcategories.product = undefined;
	}
	return data;
}

export function getFootprintDataMockFiveSubCats() {
	const data = getCategoriesDataMock().definition.categories.company_decarbonization;
	if (data?.subcategories) {
		data.subcategories['private-jets'] = {
			...data.subcategories[0],
			subcategory_name: 'Private jets',
		};
	}
	return data;
}

export function getFootprintEmptyDataMock() {
	return {
		subcategories: {},
	};
}

export function getFootprintDataFacilitiesAllFootprintsNull() {
	const data = getCategoriesDataMock().definition.categories.company_decarbonization;
	if (data?.subcategories) {
		Object.keys(data.subcategories.facilities.activities).forEach(activityKey => {
			data.subcategories.facilities.activities[activityKey].footprint = null;
		});
	}
	return data;
}

export function getFootprintAllNullFootprintValues() {
	return {
		idx: 0,
		category_name: 'Company Decarbonization',
		subcategories: {
			travel: {
				idx: 1,
				activities: {
					commuting: {
						activity_name: 'Commuting',
						activity_description: 'Employee transportation to/from worksite (ICE, EV, bus, train, scooter, bike, walking, etc.) ',
					},
					air_travel: {
						activity_name: 'Air Travel',
						activity_description: 'Business-related air travel, domestic and international. ',
					},
					other_travel: {
						activity_name: 'Other Travel',
						activity_description: 'Rail, boat, taxi, and car service travel, hotel and boarding costs, food and expenses, etc.',
					},
					vehicle_fuel: {
						footprint: {
							'2022': {
								value: null,
								period_type: 'year',
							},
							'2023': {
								value: null,
								period_type: 'year',
							},
							'2023-q4': {
								value: null,
								period_type: 'quarter',
							},
						},
						activity_name: 'Vehicle Fuel',
						activity_description: 'Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased',
					},
					vehicle_electricity: {
						activity_name: 'Vehicle Electricity',
						activity_description: 'Sales, Executive, Delivery, and Operational Fleet Vehicles either owned or leased',
					},
				},
				journey_score: 22,
				subcategory_name: 'Travel',
				subcategory_description: 'Your travel footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
			},
			product: {
				idx: 3,
				activities: {
					materials: {
						activity_name: 'Materials',
						activity_description: 'Purchased raw materials and manufactured inputs.',
					},
					product_use: {
						activity_name: 'Product Use',
						activity_description: 'Optimize product use impact through customer education and behavior change.  ',
					},
					packaging_disposal: {
						activity_name: 'Packaging Disposal',
						activity_description: 'Consumer disposal of packaging (recycling, composting, trash, etc.) ',
					},
					manufacturing_waste: {
						activity_name: 'Manufacturing Waste',
						activity_description: 'Reduce production-related materials waste. ',
					},
					packaging_materials: {
						activity_name: 'Packaging Materials',
						activity_description: 'What raw materials + manufactured products are purchased for packaging. ',
					},
					manufacturing_energy: {
						footprint: {
							'2022': {
								value: null,
								period_type: 'year',
							},
							'2023': {
								value: null,
								period_type: 'year',
							},
							'2023-q4': {
								value: null,
								period_type: 'quarter',
							},
						},
						activity_name: 'Manufacturing Energy',
						activity_description: 'Process energy (electric + heat) used for making products.',
					},
					engineering_and_innovation: {
						activity_name: 'Engineering And Innovation',
						activity_description: 'Design new products and services for environmental impact.',
					},
					upstream_shipping_and_freight: {
						activity_name: 'Upstream Shipping And Freight',
						activity_description: 'Movement of materials and manufactured inputs to manufacturing facilities (includes import freight by land, air, or sea).  ',
					},
					downstream_shipping_and_freight: {
						activity_name: 'Downstream Shipping And Freight',
						activity_description: 'Movement of finished product to distributors, retailers, and customers by land, sea, or air.',
					},
				},
				journey_score: null,
				subcategory_name: 'Product',
				subcategory_description: 'Your product footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
			},
			facilities: {
				idx: 0,
				activities: {
					fuel_owned: {
						activity_name: 'Fuel Owned',
						activity_description: 'Natural Gas, Propane, and Diesel consumption at all company owned facilities',
					},
					fuel_leased: {
						activity_name: 'Fuel Leased',
						activity_description: 'Natural Gas, Propane, and Diesel consumption at all company leased facilities',
					},
					electricity_owned: {
						footprint: {
							'2022': {
								value: null,
								period_type: 'year',
							},
							'2023': {
								value: null,
								period_type: 'year',
							},
							'2023-q4': {
								value: null,
								period_type: 'quarter',
							},
						},
						activity_name: 'Electricity Owned',
						activity_description: 'Electricity consumption at all company owned facilities',
					},
					electricity_leased: {
						footprint: {
							'2022': {
								value: null,
								period_type: 'year',
							},
							'2023': {
								value: null,
								period_type: 'year',
							},
							'2023-q4': {
								value: null,
								period_type: 'quarter',
							},
						},
						activity_name: 'Electricity Leased',
						activity_description: 'Electricity consumption at all company leased facilities',
					},
				},
				journey_score: 15,
				subcategory_name: 'Facilities',
				subcategory_description: 'Your facilities footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
			},
			operations: {
				idx: 2,
				activities: {
					furniture: {
						activity_name: 'Furniture',
						activity_description: 'Furniture for offices, company-owned or leased residences, and other worksites.  ',
					},
					machinery_fuel: {
						footprint: {
							'2022': {
								value: null,
								period_type: 'year',
							},
							'2023': {
								value: null,
								period_type: 'year',
							},
							'2023-q4': {
								value: null,
								period_type: 'quarter',
							},
						},
						activity_name: 'Machinery Fuel',
						activity_description: 'Forklifts, excavators, cranes, other heavy machinery.',
					},
					cloud_computing: {
						activity_name: 'Cloud Computing',
						activity_description: 'Server & SaaS usage. ',
					},
					business_supplies: {
						activity_name: 'Business Supplies',
						activity_description: 'Consumables and single-use items: Inks, papers, napkins & towels, etc.',
					},
					business_equipment: {
						activity_name: 'Business Equipment',
						activity_description: 'Printers, sinks & toilets, computers, printers, other electronic appliances. ',
					},
					machinery_electricity: {
						activity_name: 'Machinery Electricity',
						activity_description: 'Forklifts, excavators, cranes, other heavy machinery. ',
					},
					professional_services: {
						activity_name: 'Professional Services',
						activity_description: 'Creative, marketing and communications, consultants, legal, etc. ',
					},
				},
				journey_score: null,
				subcategory_name: 'Operations',
				subcategory_description: 'Your operations footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.',
			},
		},
		weighted_journey_score: null,
	};
}
