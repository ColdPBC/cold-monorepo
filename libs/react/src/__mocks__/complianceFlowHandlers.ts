import { rest } from 'msw';
import { getApiUrl } from './handlers';
import { getComplianceMock, getOrganizationComplianceMock } from './complianceMock';
import { getSurveyFormDataByName } from './surveyDataMock';
import { forOwn } from 'lodash';
import { getAllFilesMock } from './filesMock';

export const getComplianceWizardFlowHandler = {
  documentUpload: [
    rest.get(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json([]));
    }),
    rest.post(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json({}), ctx.status(201));
    }),
    rest.get(getApiUrl('/compliance_definitions'), (req, res, ctx) => {
      const compliance = getComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/compliance_definitions/organization/:orgId'), (req, res, ctx) => {
      const compliance = getOrganizationComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;
      const survey = getSurveyFormDataByName(name as string);
      // loop through all the survey sections and set ai_response and ai_attempted to undefined
      if (!survey) {
        return res(ctx.status(404));
      }
      forOwn(survey.definition.sections, section => {
        forOwn(section.follow_up, question => {
          question.ai_attempted = undefined;
        });
      });
      return res(ctx.json(survey));
    }),
  ],
  automate: [
    rest.get(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json(getAllFilesMock()));
    }),
    rest.post(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json({}), ctx.status(201));
    }),
    rest.get(getApiUrl('/compliance_definitions'), (req, res, ctx) => {
      const compliance = getComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/compliance_definitions/organization/:orgId'), (req, res, ctx) => {
      const compliance = getOrganizationComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;
      const survey = getSurveyFormDataByName(name as string);
      // loop through all the survey sections and set ai_response and ai_attempted to undefined
      if (!survey) {
        return res(ctx.status(404));
      }
      forOwn(survey.definition.sections, section => {
        forOwn(section.follow_up, question => {
          question.ai_attempted = undefined;
        });
      });
      return res(ctx.json(survey));
    }),
  ],
  processing: [
    rest.get(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json(getAllFilesMock()));
    }),
    rest.post(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json({}), ctx.status(201));
    }),
    rest.get(getApiUrl('/compliance_definitions'), (req, res, ctx) => {
      const compliance = getComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/compliance_definitions/organization/:orgId'), (req, res, ctx) => {
      const compliance = getOrganizationComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;
      const survey = getSurveyFormDataByName(name as string);
      // loop through all the survey sections and set ai_response and ai_attempted to undefined
      if (!survey) {
        return res(ctx.status(404));
      }
      forOwn(survey.definition.sections, section => {
        forOwn(section.follow_up, question => {
          question.ai_attempted = undefined;
        });
      });
      // set the ai_attempted to true for all the question in the first section only
      const firstSection = survey.definition.sections[Object.keys(survey.definition.sections)[0]];
      forOwn(firstSection.follow_up, question => {
        question.ai_attempted = true;
      });
      return res(ctx.json(survey));
    }),
  ],
  questionnaire: [
    rest.get(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json(getAllFilesMock()));
    }),
    rest.post(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json({}), ctx.status(201));
    }),
    rest.get(getApiUrl('/compliance_definitions'), (req, res, ctx) => {
      const compliance = getComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/compliance_definitions/organization/:orgId'), (req, res, ctx) => {
      const compliance = getOrganizationComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/organizations/:orgId/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;
      const survey = getSurveyFormDataByName(name as string);
      // loop through all the survey sections and set ai_response and ai_attempted to undefined
      if (!survey) {
        return res(ctx.status(404));
      }
      // set all the ai_attempted to true
      forOwn(survey.definition.sections, section => {
        forOwn(section.follow_up, question => {
          question.ai_attempted = true;
        });
      });
      return res(ctx.json(survey));
    }),
  ],
};
