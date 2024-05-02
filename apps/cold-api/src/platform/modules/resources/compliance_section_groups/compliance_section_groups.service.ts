import { Injectable } from '@nestjs/common';
import { CreateComplianceSectionGroupDto } from './dto/create-compliance_section_group.dto';
import { UpdateComplianceSectionGroupDto } from './dto/update-compliance_section_group.dto';
import { BaseWorker, PrismaService } from '@coldpbc/nest';

@Injectable()
export class ComplianceSectionGroupsService extends BaseWorker {
  constructor(private readonly prisma: PrismaService) {
    super(ComplianceSectionGroupsService.name);
  }

  create(createComplianceSectionGroupDto: CreateComplianceSectionGroupDto) {
    return 'This action adds a new complianceSectionGroup';
  }

  findAll() {
    return `This action returns all complianceSectionGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complianceSectionGroup`;
  }

  update(id: number, updateComplianceSectionGroupDto: UpdateComplianceSectionGroupDto) {
    return `This action updates a #${id} complianceSectionGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} complianceSectionGroup`;
  }
}
