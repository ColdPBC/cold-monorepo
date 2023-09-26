import { rest } from 'msw';
import {
  getCategoriesDataMock,
  getCategoriesEmptyDataMock,
  getFootprintDataFacilitiesAllFootprintsNull,
  getFootprintDataMock,
  getFootprintDataMockFiveSubCats,
  getFootprintDataMockThreeSubCats,
  getFootprintDataMockTwoSubCats,
  getFootprintEmptyDataMock,
} from './categoriesMock';

export const getFootprintHandler = {
  default: rest.get('*/categories/company_decarbonization', (req, res, ctx) => {
    return res(ctx.json(getFootprintDataMock()));
  }),
  handle404: rest.get('*/categories/company_decarbonization', (req, res, ctx) => {
    return res(
      ctx.status(404),
    )
  }),
  empty: rest.get('*/categories/company_decarbonization', (req, res, ctx) => {
    return res(ctx.json(getFootprintEmptyDataMock()));
  }),
  getFootprintDataFacilitiesAllFootprintsNull: rest.get('*/categories/company_decarbonization', (req, res, ctx) => {
    return res(ctx.json(getFootprintDataFacilitiesAllFootprintsNull()));
  }),
  fiveSubCats: rest.get(
    '*/categories/company_decarbonization',
    (req, res, ctx) => {
      return res(ctx.json(getFootprintDataMockFiveSubCats()));
    },
  ),
  twoSubCats: rest.get(
    '*/categories/company_decarbonization',
    (req, res, ctx) => {
      return res(ctx.json(getFootprintDataMockTwoSubCats()));
    },
  ),
  threeSubCats: rest.get(
    '*/categories/company_decarbonization',
    (req, res, ctx) => {
      return res(ctx.json(getFootprintDataMockThreeSubCats()));
    },
  ),
};

export const getCategoriesHandler = {
  default: rest.get('*/categories', (req, res, ctx) => {
    return res(ctx.json(getCategoriesDataMock()));
  }),
  handle404: rest.get('*/categories', (req, res, ctx) => {
    return res(
      ctx.status(404),
    )
  }),
  empty: rest.get('*/categories', (req, res, ctx) => {
    return res(ctx.json(getCategoriesEmptyDataMock()));
  }),
};
