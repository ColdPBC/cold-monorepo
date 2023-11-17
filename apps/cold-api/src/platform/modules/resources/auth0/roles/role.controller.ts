import { Controller, Get, Param, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Span } from 'nestjs-ddtrace';
import { JwtAuthGuard } from '../../../../authorization/guards/jwtAuth.guard';
import { RolesGuard } from '../../../../authorization/guards/roles.guard';
import { BaseWorker } from 'nest';
import { ownerRoleNameExample } from './examples/role.examples';
import { RoleService } from './role.service';
import { HttpExceptionFilter } from '../../../../filters/http-exception.filter';

@UseGuards(JwtAuthGuard, RolesGuard)
@Span()
@ApiOAuth2(['openid'])
@ApiTags('Roles')
@UseFilters(new HttpExceptionFilter(RoleController.name))
@Controller('roles')
export class RoleController extends BaseWorker {
  constructor(private readonly roleService: RoleService) {
    super('RoleController');
    roleService.initialize().then(() => {
      this.logger.info('Role Cache Initialized');
    });
  }

  /***
   * Get role from Auth0 by Name/ID
   */
  @ApiOperation({
    summary: 'Get Role By Name/ID',
    description: "Will accept either the role name or id and return the role's details",
    operationId: 'GetRoleByNameID',
  })
  @Get(':nameOrId')
  @ApiParam({
    name: 'nameOrId',
    required: true,
    type: String,
    example: ownerRoleNameExample,
  })
  async getRoles(@Param('nameOrId') nameOrId: string) {
    this.logger.info('getting role', { nameOrId });

    return await this.roleService.getRole(nameOrId);
  }

  /***
   * Get all roles from Auth0
   */
  @ApiOperation({
    summary: 'Get All Roles',
    operationId: 'GetAllRoles',
  })
  @Get()
  async getAllRoles() {
    this.logger.info('getting all roles');

    return await this.roleService.getRoles();
  }
}
