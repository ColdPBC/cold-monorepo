import { ActionPayload } from '@coldpbc/interfaces';

export const getActionMock = (): ActionPayload => {
  return {
    id: '1',
    action: {
      title: 'Renewable Energy Procurement',
      overview:
        'Reduce your company’s reliance on fossil fuels by purchasing renewable electricity for your facility.',
      objective_description: 'Test Objective Description',
      image_url:
        'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      subcategory: 'Facilities',
      ready_to_execute: false,
      due_date: new Date(),
      steps: [
        {
          overview: 'Tell us how you pay your utility bills',
          description:
            'How you pay for electricity impacts your organization’s opportunities to purchase different types of RECs. If your electric usage is incorporated in your lease, for instance, you may not be able to determine your annual energy use. Select from the following options: \n' +
            'You directly pay your utility bills; \n' +
            'You pay your utility bills indirectly via your landlord;\n' +
            'You do not pay for utilities because the cost is incorporated into your rent.',
          complete: '2022-09-27 18:00:00.000',
        },
        {
          overview:
            'Determine your facility’s annual electricity consumption in kWh and send to Cold',
          description: 'Test Step 2',
          complete: '2022-09-27 18:00:00.000',
        },
        {
          overview: 'Sign up for your utility’s renewable energy program',
          description: 'Test Step 3',
        },
        {
          overview: 'Use renewable energy to power your facility',
          description: 'Test Step 4',
        },
      ],
      areas_of_impact: ['Test Area 1', 'Test Area 2'],
      dependent_surveys: [
        {
          name: 'test_survey',
          title: 'Test Survey 1',
          submitted: false,
        },
      ],
    },
  };
};

export const getActionsMock = (): ActionPayload[] => {
  return [
    {
      id: '1',
      action: {
        title: 'Renewable Energy Procurement',
        overview:
          'Reduce your company’s reliance on fossil fuels by purchasing renewable electricity for your facility.',
        objective_description: 'Test Objective Description',
        image_url:
          'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        subcategory: 'facilities',
        ready_to_execute: false,
        due_date: new Date(),
        steps: [
          {
            overview: 'Tell us how you pay your utility bills',
            description: 'Test Step 1',
            complete: '2022-09-27 18:00:00.000',
          },
          {
            overview:
              'Determine your facility’s annual electricity consumption in kWh and send to Cold',
            description: 'Test Step 2',
            complete: '2022-09-27 18:00:00.000',
          },
          {
            overview: 'Sign up for your utility’s renewable energy program',
            description: 'Test Step 3',
            complete: '2022-09-27 18:00:00.000',
          },
        ],
        areas_of_impact: ['Electricity'],
        dependent_surveys: [
          {
            name: 'test_survey',
            title: 'Test Survey 1',
            submitted: false,
          },
        ],
      },
    },
    {
      id: '2',
      action: {
        title: 'Manage and record e-waste',
        overview:
          'Lorem ipsum dolor sit amet, consec tetur. Lorem ipsum dolor sit amet, consec tetur.',
        objective_description: 'Test Objective Description',
        image_url:
          'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        subcategory: 'facilities',
        ready_to_execute: false,
        due_date: new Date(),
        steps: [
          {
            overview: 'Sign up for your utility’s renewable energy program',
            description: 'Test Step 1',
            complete: '20',
          },
          {
            overview: 'Sign up for your utility’s renewable energy program',
            description: 'Test Step 2',
            complete: '2022-09-27 18:00:00.000',
          },
          {
            overview: 'Step 3 overview',
            description: 'Test Step 3',
            complete: '2022-09-27 18:00:00.000',
          },
        ],
        areas_of_impact: ['Test Area 1', 'Test Area 2'],
        dependent_surveys: [
          {
            name: 'test_survey',
            title: 'Test Survey 1',
            submitted: false,
          },
        ],
      },
    },
    {
      id: '3',
      action: {
        title: 'Waste Management',
        overview:
          'Create a full-scale waste diversion and management program within your offices and give your employees what they need to successfully recycle, compost, and divert waste items from landfill.',
        objective_description: 'Test Objective Description',
        image_url:
          'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        subcategory: 'employee_footprint',
        ready_to_execute: false,
        due_date: new Date(),
        steps: [
          {
            overview: 'Sign up for your utility’s renewable energy program',
            description: 'Test Step 1',
            complete: '2022-09-27 18:00:00.000',
          },
          {
            overview: 'Sign up for your utility’s renewable energy program',
            description: 'Test Step 2',
            complete: '2022-09-27 18:00:00.000',
          },
        ],
        areas_of_impact: ['Test Area 1', 'Test Area 2'],
        dependent_surveys: [
          {
            name: 'test_survey',
            title: 'Test Survey 1',
            submitted: false,
          },
        ],
      },
    },
    {
      id: '4',
      action: {
        title: 'Personal Finance',
        overview: 'Test Overview',
        objective_description: 'Test Objective Description',
        image_url:
          'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        subcategory: 'employee_footprint',
        ready_to_execute: false,
        due_date: new Date(),
        steps: [
          {
            overview: 'Sign up for your utility’s renewable energy program',
            description: 'Test Step 1',
            complete: '2022-09-27 18:00:00.000',
          },
          {
            overview: 'Sign up for your utility’s renewable energy program',
            description: 'Test Step 2',
            complete: '2022-09-27 18:00:00.000',
          },
        ],
        areas_of_impact: ['Test Area 1', 'Test Area 2'],
        dependent_surveys: [
          {
            name: 'test_survey',
            title: 'Test Survey 1',
            submitted: false,
          },
        ],
      },
    },
    {
      id: '5',
      action: {
        title: 'Business Travel',
        overview: 'Test Overview',
        objective_description: 'Test Objective Description',
        image_url:
          'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        subcategory: 'travel',
        ready_to_execute: false,
        due_date: new Date(),
        steps: [
          {
            overview: 'Sign up for your utility’s renewable energy program',
            description: 'Test Step 1',
            complete: '2022-09-27 18:00:00.000',
          },
        ],
        areas_of_impact: ['Test Area 1', 'Test Area 2'],
        dependent_surveys: [
          {
            name: 'test_survey',
            title: 'Test Survey 1',
            submitted: false,
          },
        ],
      },
    },
  ];
};

export const getActionsMockBySubCategoryName = (
  subCategoryName: string,
): ActionPayload[] => {
  return getActionsMock().filter(
    (action) => action.action.subcategory === subCategoryName,
  );
};
