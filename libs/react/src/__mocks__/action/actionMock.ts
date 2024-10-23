import { ActionPayload } from '@coldpbc/interfaces';

export const getActionMock = (): ActionPayload => {
	return {
		id: '1',
		updated_at: '2023-10-11T21:19:38.441Z',
		action: {
			title: 'Renewable Energy Procurement',
			overview: "Reduce your company's reliance on fossil fuels by purchasing renewable electricity for your facility.",
			objective_description: `Purchasing RECs is the next best way to decarbonize your electricity footprint if you can’t develop renewable energy resources on-site. RECs - Renewable Energy Certificates - give your organization the right to claim the environmental benefits of renewable energy generated and delivered to the grid. Though they do not not physically alter the actual electricity powering your facilities, RECs can help to drive future market demand for renewables development in your grid region while also directly decreasing your carbon footprint. Not all RECs provide the same environmental benefit, however. Cold makes sure our RECs provide the maximum benefit possible in your electricity market.`,
			process_description:
				'1. Determine how much electricity you use in each facility\n2. Cold evaluates your renewable electricity purchasing options for each facility\n3. Select the best available option for renewable electricity and purchase',
			image_url:
				'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
			subcategory: 'facilities',
			ready_to_execute: false,
			due_date: '2023-12-10T20:25:22.648Z',
			assignee: null,
			steps: [
				{
					description: 'Tell us how you pay your utility bills',
					overview:
						"How you pay for electricity impacts your organization's opportunities to purchase different types of RECs. If your electric usage is incorporated in your lease, for instance, you may not be able to determine your annual energy use. Select from the following options: \n" +
						'You directly pay your utility bills; \n' +
						'You pay your utility bills indirectly via your landlord;\n' +
						'You do not pay for utilities because the cost is incorporated into your rent.',
					complete: '2022-09-27 18:00:00.000',
					assignee: null,
				},
				{
					assignee: null,
					description: 'Test Step 2',
					overview: "Determine your facility's annual electricity consumption in kWh and send to Cold",
					complete: '2022-09-27 18:00:00.000',
				},
				{
					assignee: null,
					description: 'Test Step 3',
					overview: "Sign up for your utility's renewable energy program",
					complete: null,
				},
				{
					assignee: null,
					description: 'Test Step 4',
					overview: 'Test Step 4',
					complete: null,
				},
			],
			areas_of_impact: ['workplace', 'air_travel'],
			dependent_surveys: [
				{
					name: 'test_survey_1',
					title: 'Test Survey 1',
					submitted: true,
				},
				{
					name: 'test_survey_2',
					title: 'Test Survey 2',
					submitted: false,
				},
			],
			resources: [
				{
					title: 'How to give us your kWh',
					url: '#',
				},
				{
					title: 'FAQ on purchasing renewable energy',
					url: '#',
				},
				{
					title: 'Map of electricity markets',
					url: '#',
				},
				{
					title: 'Cold Climate RECs database',
					url: '#',
				},
			],
		},
	};
};

export const getActionsMock = (): ActionPayload[] => {
	return [
		{
			id: '1',
			updated_at: '2023-10-09T21:19:38.441Z',
			action: {
				title: 'Renewable Energy Procurement',
				overview: "Reduce your company's reliance on fossil fuels by purchasing renewable electricity for your facility.",
				objective_description: 'Test Objective Description',
				image_url:
					'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
				subcategory: 'facilities',
				ready_to_execute: true,
				due_date: '2024-04-11T21:19:38.441Z',
				assignee: null,
				steps: [
					{
						assignee: null,
						overview: 'Tell us how you pay your utility bills',
						description: 'Test Step 1',
						complete: '2022-09-27 18:00:00.000',
					},
					{
						assignee: null,
						overview: "Determine your facility's annual electricity consumption in kWh and send to Cold",
						description: 'Test Step 2',
						complete: '2022-09-27 18:00:00.000',
					},
					{
						assignee: null,
						overview: "Sign up for your utility's renewable energy program",
						description: 'Test Step 3',
						complete: null,
					},
				],
				areas_of_impact: ['Electricity'],
				dependent_surveys: [
					{
						name: 'footprint_survey',
						title: 'Footprint Survey',
						submitted: true,
					},
					{
						name: 'energy_survey',
						title: 'Energy Survey',
						submitted: true,
					},
				],
			},
		},
		{
			id: '2',
			updated_at: '2023-09-09T21:19:38.441Z',
			action: {
				title: 'Manage and record e-waste',
				overview: 'Lorem ipsum dolor sit amet, consec tetur. Lorem ipsum dolor sit amet, consec tetur.',
				objective_description: 'Test Objective Description',
				image_url:
					'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
				subcategory: 'facilities',
				ready_to_execute: true,
				due_date: '2024-02-11T22:19:38.441Z',
				assignee: null,
				steps: [
					{
						assignee: null,
						overview: "Sign up for your utility's renewable energy program",
						description: 'Test Step 1',
						complete: null,
					},
					{
						assignee: null,
						overview: 'Test Step 2',
						description: 'Test Step 2',
						complete: null,
					},
					{
						assignee: null,
						overview: 'Step 3 overview',
						description: 'Test Step 3',
						complete: '2022-09-27 18:00:00.000',
					},
				],
				areas_of_impact: ['workplace', 'air_travel'],
				dependent_surveys: [
					{
						name: 'test_survey',
						title: 'Test Survey 1',
						submitted: true,
					},
				],
			},
		},
		{
			id: '3',
			updated_at: '2023-08-09T21:19:38.441Z',
			action: {
				title: 'Waste Management',
				overview:
					'Create a full-scale waste diversion and management program within your offices and give your employees what they need to successfully recycle, compost, and divert waste items from landfill.',
				objective_description: 'Test Objective Description',
				image_url:
					'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
				subcategory: 'employee_footprint',
				ready_to_execute: true,
				due_date: '2024-04-11T21:19:38.441Z',
				assignee: null,
				steps: [
					{
						assignee: null,
						overview: "Sign up for your utility's renewable energy program",
						description: 'Test Step 1',
						complete: '2022-09-27 18:00:00.000',
					},
					{
						assignee: null,
						overview: 'Test Step 2',
						description: 'Test Step 2',
						complete: '2022-09-27 18:00:00.000',
					},
				],
				areas_of_impact: ['workplace', 'air_travel'],
				dependent_surveys: [
					{
						name: 'test_survey',
						title: 'Test Survey 1',
						submitted: true,
					},
				],
			},
		},
		{
			id: '4',
			updated_at: '2023-08-09T21:19:38.441Z',
			action: {
				title: 'Personal Finance',
				overview: 'Test Overview',
				assignee: null,
				objective_description: 'Test Objective Description',
				image_url:
					'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
				subcategory: 'employee_footprint',
				ready_to_execute: true,
				due_date: '2024-04-11T21:19:38.441Z',
				steps: [
					{
						assignee: null,
						overview: "Sign up for your utility's renewable energy program",
						description: 'Test Step 1',
						complete: null,
					},
					{
						assignee: null,
						overview: 'Test Step 2',
						description: 'Test Step 2',
						complete: '2022-09-27 18:00:00.000',
					},
				],
				areas_of_impact: ['workplace', 'air_travel'],
				dependent_surveys: [
					{
						name: 'test_survey',
						title: 'Test Survey 1',
						submitted: true,
					},
				],
			},
		},
		{
			id: '5',
			updated_at: '2023-08-09T21:19:38.441Z',
			action: {
				title: 'Business Travel',
				overview: 'Test Overview',
				objective_description: 'Test Objective Description',
				image_url:
					'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
				subcategory: 'travel',
				ready_to_execute: true,
				due_date: '2024-12-10T20:25:22.648Z',
				assignee: null,
				steps: [
					{
						overview: "Sign up for your utility's renewable energy program",
						description: 'Test Step 1',
						complete: '2022-09-27 18:00:00.000',
						assignee: null,
					},
				],
				areas_of_impact: ['workplace', 'air_travel'],
				dependent_surveys: [
					{
						name: 'test_survey',
						title: 'Test Survey 1',
						submitted: true,
					},
				],
			},
		},
	];
};

export const getActionsMockBySubCategoryName = (subCategoryName: string): ActionPayload[] => {
	return getActionsMock().filter(action => action.action.subcategory === subCategoryName);
};

export const getActionMockNoResources = (): ActionPayload => {
	return {
		...getActionMock(),
		action: {
			...getActionMock().action,
			dependent_surveys: getActionMock().action.dependent_surveys.map(survey => ({
				...survey,
				submitted: true,
			})),
			ready_to_execute: true,
			resources: undefined,
		},
	};
};

export const getActionAllStepsComplete = (): ActionPayload => {
	return {
		...getActionMock(),
		action: {
			...getActionMock().action,
			dependent_surveys: getActionMock().action.dependent_surveys.map(survey => ({
				...survey,
				submitted: true,
			})),
			ready_to_execute: true,
			steps: getActionMock().action.steps.map(step => ({
				...step,
				complete: '2023-12-10T20:25:22.648Z',
			})),
		},
	};
};

export const getActionNoDueDateSet = (): ActionPayload => {
	return {
		...getActionMock(),
		action: {
			...getActionMock().action,
			dependent_surveys: getActionMock().action.dependent_surveys.map(survey => ({
				...survey,
				submitted: true,
			})),
			ready_to_execute: true,
			due_date: undefined,
		},
	};
};
