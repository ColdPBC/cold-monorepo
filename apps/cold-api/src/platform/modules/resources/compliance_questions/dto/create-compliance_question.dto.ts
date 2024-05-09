import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';
import { JsonValue } from '@prisma/client/runtime/library';

export class CreateComplianceQuestionDto {
  @IsString()
  key: string;

  @IsInt()
  order: number;

  @IsString()
  prompt: string;

  @IsString()
  component: string;

  @IsOptional()
  @IsString()
  tooltip: string | null;

  @IsOptional()
  @IsString()
  placeholder: string | null;

  @IsOptional()
  @IsObject()
  rubric: JsonValue | null;

  @IsOptional()
  @IsObject()
  options: JsonValue | null;

  @IsOptional()
  @IsString()
  dependency_expression: string | null;

  @IsOptional()
  @IsString()
  question_summary: string | null;

  @IsOptional()
  @IsString()
  coresponding_question: string | null;

  @IsOptional()
  @IsObject()
  additional_context: JsonValue;
}
