import { http, HttpResponse } from 'msw';
import { getAIAnsweredSurveyMock, getJourneyOverviewMock, getSurveyFormDataByName, getSurveyMockSomeCompleted, getSurveysMock } from './surveyDataMock';
import { getApiUrl } from './_default/handlers';
import { findIndex } from 'lodash';

export const getSurveyHandler = {
  DEFAULT: [
    http.get(getApiUrl('*/organizations/:orgId/surveys/:name'), async ({ request, params, cookies }) => {
      const { name } = params;

      return HttpResponse.json(getSurveyFormDataByName(name as string));
    }),

    http.put(getApiUrl('*/organizations/:orgId/surveys/:name'), async ({ request, params, cookies }) => {
      return HttpResponse.json({});
    }),
  ],
  initialIncomplete: [
    http.get(getApiUrl('*/organizations/:orgId/surveys/:name'), async ({ request, params, cookies }) => {
      return HttpResponse.json({
        ...getJourneyOverviewMock(),
        definition: {
          ...getJourneyOverviewMock().definition,
          submitted: undefined,
        },
      });
    }),

    http.put(getApiUrl('*/organizations/:orgId/surveys/:name'), async ({ request, params, cookies }) => {
      return HttpResponse.json({});
    }),
  ],
  incompleteSurvey: [
    http.get(getApiUrl('*/organizations/:orgId/surveys/:name'), async ({ request, params, cookies }) => {
      const { name } = params;

      return HttpResponse.json({
        ...getSurveyMockSomeCompleted(),
        definition: {
          ...getSurveyMockSomeCompleted().definition,
          submitted: undefined,
        },
      });
    }),

    http.put(getApiUrl('*/organizations/:orgId/surveys/:name'), async ({ request, params, cookies }) => {
      return HttpResponse.json({});
    }),
  ],
  nextSteps: [
    http.get(getApiUrl('*/organizations/:orgId/surveys'), async ({ request, params, cookies }) => {
      const { name } = params;
      const surveys = getSurveysMock();
      const qaalibTestIndex = findIndex(surveys, { name: 'qaalib_test' });
      surveys[qaalibTestIndex] = {
        ...surveys[qaalibTestIndex],
        definition: {
          ...surveys[qaalibTestIndex].definition,
          submitted: true,
        },
      };
      const journeyOverviewIndex = findIndex(surveys, { name: 'journey_overview' });
      surveys[journeyOverviewIndex] = getSurveyMockSomeCompleted();
      const testSurveyIndex = findIndex(surveys, { name: 'test_survey' });
      surveys[testSurveyIndex] = {
        ...surveys[testSurveyIndex],
        definition: {
          title: 'Welcome to Cold Climate!',
          image_url:
            'https://images.unsplash.com/photo-1603437873662-dc1f44901825?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
          intro_markdown:
            "Let’s Start Your Journey to Absolute Zero™ \nWe will start with our basic company information survey. \nThis is a quick form to understand a little more about your company and what climate efforts you've already undertaken.",
          sections: {
            general: {
              title: 'General',
              prompt: '',
              component: null,
              follow_up: {
                'general:0': {
                  idx: 0,
                  prompt: 'Which regions do you sell your product into?',
                  options: ['North America', 'South America', 'Europe', 'Asia', 'Australia', 'Africa'],
                  tooltip: '',
                  component: 'multi_select',
                  placeholder: '',
                  value: ['Asia', 'Africa'],
                  skipped: false,
                },
                'general:1': {
                  idx: 1,
                  prompt: "What is your company's name?",
                  options: [],
                  tooltip: 'Enter your company name',
                  component: 'text',
                  placeholder: 'Yourco',
                  value: 'Agriculture',
                  skipped: false,
                },
                'general:2': {
                  idx: 2,
                  prompt: 'What is your favorite color of the primary colors?',
                  options: ['Red', 'Blue', 'Yellow'],
                  tooltip: 'Pick the one you like the most',
                  component: 'select',
                  placeholder: '',
                  value: 'Blue',
                  skipped: false,
                },
                'general:3': {
                  idx: 3,
                  prompt: 'How many employees did your company have as of the end of last calendar year?',
                  options: [],
                  tooltip: '',
                  component: 'number',
                  placeholder: 'Enter number of employees',
                  additional_context: {
                    prompt: 'Please explain your answer',
                    component: 'textarea',
                    placeholder: 'Write in here',
                    operator: '<',
                    comparison: 10,
                    value: null,
                  },
                  value: 11,
                  skipped: false,
                },
              },
              image_url:
                'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
              category_idx: 0,
              category_description: 'General questions about your business',
            },
            product: {
              title: 'Product',
              prompt: 'Does your company make a physical product?',
              component: 'yes_no',
              follow_up: {
                'product:0': {
                  idx: 0,
                  prompt: 'Is your product made of metal?',
                  options: [],
                  tooltip: 'Select yes or no',
                  component: 'yes_no',
                  placeholder: '',
                },
                'product:1': {
                  idx: 1,
                  prompt: 'How much does your product cost, in dollars?',
                  options: [],
                  tooltip: 'Enter the cost to your company to produce',
                  component: 'currency',
                  placeholder: '45',
                },
                'product:2': {
                  idx: 2,
                  prompt: 'What percent of your product is leather?',
                  options: [],
                  tooltip: '',
                  component: 'percent_slider',
                  placeholder: '',
                },
                'product:3': {
                  idx: 3,
                  prompt: 'How many factories make your product?',
                  options: [],
                  tooltip: 'Choose the number across all countries',
                  component: 'number',
                  placeholder: '2',
                },
              },
              image_url:
                'https://images.unsplash.com/photo-1610891015188-5369212db097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              category_idx: 1,
              category_description: 'Questions about how your products are produced',
              additional_context: {
                prompt: 'Please explain your answer',
                component: 'textarea',
                placeholder: 'Write in here',
                operator: '==',
                comparison: true,
              },
            },
            facilities: {
              title: 'Facilities',
              prompt: 'Do you own or lease any facilities like offices or warehouses?',
              component: 'yes_no',
              follow_up: {
                'facilities:0': {
                  idx: 0,
                  prompt: 'What colors are your office carpets?',
                  options: ['Gray', 'Black', 'Orange', 'Blue', 'Purple'],
                  tooltip: 'If carpets are multiple colors choose all colors that apply',
                  component: 'multi_select',
                  placeholder: '',
                },
              },
              image_url:
                'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              category_idx: 2,
              category_description: 'Questions about your the facilities you own or lease',
            },
          },
        },
      };
      return HttpResponse.json(surveys);
    }),
  ],
  getAiAnsweredSurvey: [
    http.get(getApiUrl('*/organizations/:orgId/surveys/:name'), async ({ request, params, cookies }) => {
      return HttpResponse.json(getAIAnsweredSurveyMock());
    }),
  ],
};
