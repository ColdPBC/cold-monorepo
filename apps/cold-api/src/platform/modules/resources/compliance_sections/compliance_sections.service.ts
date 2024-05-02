import { Injectable } from '@nestjs/common';
import { CreateComplianceSectionDto } from './dto/create-compliance_section.dto';
import { UpdateComplianceSectionDto } from './dto/update-compliance_section.dto';

@Injectable()
export class ComplianceSectionsService {
  create(createComplianceSectionDto: CreateComplianceSectionDto) {
    return 'This action adds a new complianceSection';
  }

  findAll() {
    return `This action returns all complianceSections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complianceSection`;
  }

  update(id: number, updateComplianceSectionDto: UpdateComplianceSectionDto) {
    return `This action updates a #${id} complianceSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} complianceSection`;
  }
}
