import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateComplianceSectionGroupDto {
  @IsInt()
  order: number;

  @IsString()
  title: string;

  @IsString()
  compliance_definition_name: string;

  @IsOptional()
  @IsObject()
  metadata: object;
}
