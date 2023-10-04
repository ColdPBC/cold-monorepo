import { ActionType } from '../../interfaces/actions/actions';

export const getActionMock = (): ActionType => {
  return {
    id: '1',
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
        id: '1',
        overview: 'Tell us how you pay your utility bills',
        description: 'Test Step 1',
        complete: true,
      },
      {
        id: '2',
        overview:
          'Determine your facility’s annual electricity consumption in kWh and send to Cold',
        description: 'Test Step 2',
        complete: true,
      },
      {
        id: '3',
        overview: 'Sign up for your utility’s renewable energy program',
        description: 'Test Step 3',
        complete: false,
      },
      {
        id: '4',
        overview: 'Sign up for your utility’s renewable energy program',
        description: 'Test Step 4',
        complete: false,
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
  };
};
