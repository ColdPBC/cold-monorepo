import { Injectable } from '@nestjs/common';
import { CreateScopeDto } from './dto/create-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';
import { BaseWorker, Cuid2Generator, GuidPrefixes, PrismaService } from '@coldpbc/nest';

@Injectable()
export class ScopesService extends BaseWorker {
  constructor(readonly prisma: PrismaService) {
    super(ScopesService.name);
  }

  async create(createScopeDto: CreateScopeDto) {
    const scopes = await this.prisma.emission_scopes.create({
      data: {
        id: new Cuid2Generator(GuidPrefixes.EmissionScope).scopedId,
        ...createScopeDto,
      },
    });

    return scopes;
  }

  async findAll() {
    return this.prisma.emission_scopes.findMany();
  }

  async findOne(id: string) {
    return this.prisma.emission_scopes.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateScopeDto: UpdateScopeDto) {
    return this.prisma.emission_scopes.update({
      where: {
        id: id,
      },
      data: updateScopeDto,
    });
  }

  async remove(id: string) {
    return this.prisma.emission_scopes.delete({
      where: {
        id: id,
      },
    });
  }
}
