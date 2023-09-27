import { rest } from 'msw';
import {
  getJourneyOverviewMock,
  getSurveyFormDataByName,
} from './surveyDataMock';
import { getApiUrl } from './handlers';

export const getSurveyHandler = {
  DEFAULT: [
    rest.get(getApiUrl('*/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;

      return res(ctx.json(getSurveyFormDataByName(name as string)));
    }),

    rest.put(getApiUrl('*/surveys/:name'), async (req, res, ctx) => {
      const { data } = await req.json();

      return res(ctx.json({}));
    }),
  ],
  initialIncomplete: [
    rest.get(getApiUrl('*/surveys/:name'), (req, res, ctx) => {
      const { name } = req.params;

      return res(
        ctx.json({
          ...getJourneyOverviewMock(),
          definition: {
            ...getJourneyOverviewMock().definition,
            submitted: undefined,
          },
        }),
      );
    }),

    rest.put(getApiUrl('*/surveys/:name'), async (req, res, ctx) => {
      const { data } = await req.json();

      return res(ctx.json({}));
    }),
  ],
};
