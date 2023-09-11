import { rest } from "msw"
import { getFootprintDataMock, getFootprintDataMockFiveSubCats, getFootprintDataMockThreeSubCats, getFootprintDataMockTwoSubCats, getFootprintEmptyDataMock } from "./categoriesMock"

export const getFootprintHandler = {
    default: rest.get('*/categories/company_decarbonization', (req, res, ctx) => {
        return res(ctx.json(getFootprintDataMock()))
    }),
    empty: rest.get('*/categories/company_decarbonization', (req, res, ctx) => {
        return res(ctx.json(getFootprintEmptyDataMock()))
    }),
    fiveSubCats: rest.get('*/categories/company_decarbonization', (req, res, ctx) => {
        return res(ctx.json(getFootprintDataMockFiveSubCats()))
    }),
    twoSubCats: rest.get('*/categories/company_decarbonization', (req, res, ctx) => {
        return res(ctx.json(getFootprintDataMockTwoSubCats()))
    }),
    threeSubCats: rest.get('*/categories/company_decarbonization', (req, res, ctx) => {
        return res(ctx.json(getFootprintDataMockThreeSubCats()))
    }),
}