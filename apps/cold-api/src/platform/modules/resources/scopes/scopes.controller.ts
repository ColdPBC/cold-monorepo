import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { CreateScopeDto } from './dto/create-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';
import { coldAdminOnly, Roles } from '@coldpbc/nest';
import { ApiBody, ApiParam } from '@nestjs/swagger';

const _bodySchema = {
  description: 'Emissions Scope Schema: ',
  schema: {
    type: 'object',
    example: {
      scope: '1',
      label: 'Natural gas liquids',
    },
  },
};

@Controller('emission_scopes')
export class ScopesController {
  constructor(private readonly scopesService: ScopesService) {}

  @Post()
  @ApiBody(_bodySchema)
  @Roles(...coldAdminOnly)
  create(@Body() createScopeDto: CreateScopeDto) {
    return this.scopesService.create(createScopeDto);
  }

  @Get()
  @Roles(...coldAdminOnly)
  findAll() {
    return this.scopesService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    example: 'scope_q62n04uqno8trwy3',
    required: true,
    description: 'Id of the scope',
  })
  @Roles(...coldAdminOnly)
  findOne(@Param('id') id: string) {
    return this.scopesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    example: 'scope_q62n04uqno8trwy3',
    required: true,
    description: 'Id of the scope',
  })
  @Roles(...coldAdminOnly)
  update(@Param('id') id: string, @Body() updateScopeDto: UpdateScopeDto) {
    return this.scopesService.update(id, updateScopeDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    example: 'scope_q62n04uqno8trwy3',
    required: true,
    description: 'Id of the scope',
  })
  @HttpCode(204)
  @Roles(...coldAdminOnly)
  remove(@Param('id') id: string) {
    return this.scopesService.remove(id);
  }
}
