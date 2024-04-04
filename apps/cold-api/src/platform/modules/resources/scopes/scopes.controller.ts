import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { CreateScopeDto } from './dto/create-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';
import { coldAdminOnly, Roles } from '@coldpbc/nest';
import { IntegrationBodySchema } from '../integrations/examples/integration_examples';
import { ApiBody } from '@nestjs/swagger';

const BodySchema = {
  description: 'Emissions Scope Schema: ',
  schema: {
    type: 'object',
    example: {
      service_definition_id: '{{test_service_definition_id}}',
      facility_id: '',
      metadata: {
        name: 'Headquarters',
        address: '{{$randomStreetAddress}}',
        address_line_2: 'suite 100',
        city: '{{$randomCity}}',
        state: 'MN',
        postal_code: '55401',
        utility: 'speculoos_power',
      },
    },
  },
};

@Controller('emission_scopes')
export class ScopesController {
  constructor(private readonly scopesService: ScopesService) {}

  //@ApiParam({
  //     name: 'id',
  //     type: String,
  //     example: 'scope_q62n04uqno8trwy3',
  //     required: true,
  //     description: 'Id of the Organization',
  //   })

  @Post()
  @ApiBody(IntegrationBodySchema)
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
  @Roles(...coldAdminOnly)
  findOne(@Param('id') id: string) {
    return this.scopesService.findOne(id);
  }

  @Patch(':id')
  @Roles(...coldAdminOnly)
  update(@Param('id') id: string, @Body() updateScopeDto: UpdateScopeDto) {
    return this.scopesService.update(id, updateScopeDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(...coldAdminOnly)
  remove(@Param('id') id: string) {
    return this.scopesService.remove(id);
  }
}
