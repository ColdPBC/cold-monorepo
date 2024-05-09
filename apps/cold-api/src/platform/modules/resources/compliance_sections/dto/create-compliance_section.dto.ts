import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateComplianceSectionDto {
  @IsString()
  key: string;

  @IsInt()
  order: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  dependency_expression: string;

  @IsOptional()
  @IsObject()
  metadata: object;
}
