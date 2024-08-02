import { rest } from 'msw';
import { getApiUrl } from './handlers';
import { getComplianceMock, getOrganizationComplianceMock } from './complianceMock';
import { getSurveyFormDataByName } from './surveyDataMock';
import { forOwn } from 'lodash';
import { getAllFilesMock, getFilesWithCertificateClaimsMock } from './filesMock';

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
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
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
          question.value = undefined;
        });
      });
      return res(ctx.json(survey));
    }),
  ],
  automate: [
    rest.get(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json(getFilesWithCertificateClaimsMock()));
    }),
    rest.post(getApiUrl('/organizations/:orgId/files'), (req, res, ctx) => {
      return res(ctx.json({}), ctx.status(201));
    }),
    rest.get(getApiUrl('/compliance_definitions'), (req, res, ctx) => {
      const compliance = getComplianceMock();
      return res(ctx.json(compliance));
    }),
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
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
          question.value = undefined;
        });
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
    rest.get(getApiUrl('/compliance_definitions/organizations/:orgId'), (req, res, ctx) => {
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
