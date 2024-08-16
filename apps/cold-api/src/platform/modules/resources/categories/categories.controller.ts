import { Body, Controller, Get, HttpCode, Param, Put, Query, Req, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { BaseWorker, HttpExceptionFilter, IRequest, Roles } from '@coldpbc/nest';
import { allRoles, bpcDecoratorOptions, coldAdminOnly, orgIdDecoratorOptions } from '../_global/global.params';
import { CategoriesService } from './categories.service';

/**
 * Categories (taxonomy) controller
 */

@Span()
@Controller()
@UseFilters(new HttpExceptionFilter(CategoriesController.name))
export class CategoriesController extends BaseWorker {
  constructor(private readonly categoriesService: CategoriesService) {
    super(CategoriesController.name);
  }

  /**
   * Get all categories
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
   * @param {string} orgId
   * @param {boolean} bpc
   * @returns {Promise<category_definitions>}
   */
  @ApiOperation({
    summary: 'Get Categories',
    operationId: 'GetCategories',
  })
  @Get('categories')
  @ApiTags('Categories')
  @ApiQuery(bpcDecoratorOptions)
  @Roles(...coldAdminOnly)
  @UseFilters(new HttpExceptionFilter(CategoriesController.name))
  findAll(
    @Req()
    req: IRequest,
    @Query('impersonateOrg') orgId?: string,
    @Query('bpc') bpc?: boolean,
  ) {
    return this.categoriesService.findFull(req, bpc, orgId);
  }

  /**
   * Get all categories for an org
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
   * @param {string} orgId
   * @param {boolean} bpc
   * @returns {Promise<category_definitions>}
   */
  @ApiOperation({
    summary: 'Get Org Category Values',
    operationId: 'GetOrgCategoryValues',
  })
  @Get('organizations/:orgId/categories')
  @ApiTags('Organizations : Categories')
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @Roles(...coldAdminOnly)
  @UseFilters(new HttpExceptionFilter(CategoriesController.name))
  findAllByOrg(
    @Req()
    req: IRequest,
    @Param('orgId') orgId?: string,
    @Query('bpc') bpc?: boolean,
  ) {
    return this.categoriesService.findFull(req, bpc, orgId);
  }

  /**
   * Get an organization category response by name
   * @param nameOrId
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
   * @param {string} orgId
   * @param {boolean} bpc
   * @returns {Promise<CategoryDefinitionDto>}
   */
  @ApiOperation({
    summary: 'Get Category Values By Key',
    operationId: 'GetCategoryValuesByKey',
  })
  @Get('organizations/:orgId/categories/:name')
  @ApiTags('Organizations : Categories')
  @ApiQuery(bpcDecoratorOptions)
  @ApiParam(orgIdDecoratorOptions)
  @ApiParam({
    name: 'name',
    example: 'company_decarbonization',
    required: true,
    description: 'the name of the category key',
  })
  @Roles(...allRoles)
  @UseFilters(new HttpExceptionFilter(CategoriesController.name))
  findByKeyAndOrg(
    @Req()
    req: IRequest,
    @Param('orgId') orgId?: string,
    @Param('name') nameOrId?: string,
    @Query('bpc') bpc?: boolean,
  ) {
    return this.categoriesService.findByName(req, bpc, orgId, nameOrId);
  }

  /**
   * Submit new org values for categories (taxonomy)
   * @param submitCategoryValuesDto
   * @param {{body: any, headers: any, query: any, user: IAuthenticatedUser}} req
   * @param {string} orgId optional
   * @returns {Promise<CreateSurveyDefinitionDto>}
   */
  @ApiOperation({
    summary: 'Submit Category Values',
    operationId: 'SubmitCategoryValues',
  })
  @Put('organizations/:orgId/categories')
  @ApiTags('Organizations : Categories')
  @ApiParam(orgIdDecoratorOptions)
  @UseFilters(new HttpExceptionFilter(CategoriesController.name))
  @HttpCode(201)
  @Roles(...allRoles)
  submitOrgValues(
    @Param('orgId') orgId: string,
    @Body() submitCategoryValuesDto: any,
    @Req()
    req: IRequest,
  ) {
    return this.categoriesService.submitResults(submitCategoryValuesDto, req, orgId);
  }
}
