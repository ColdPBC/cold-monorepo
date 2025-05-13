import {epr_submissions, Prisma} from "@prisma/client";
import { IsString, IsNotEmpty, IsOptional, IsDate, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEprSubmissionDto implements Partial<epr_submissions> {
  @ApiProperty({ description: 'Status of the EPR submission', example: 'submitted' })
  @IsString({ message: 'Status must be a string' })
  @IsNotEmpty({ message: 'Status is required' })
  status: string;

  @ApiProperty({ description: 'State of the EPR submission', example: 'completed' })
  @IsString({ message: 'State must be a string' })
  @IsNotEmpty({ message: 'State is required' })
  state: string;

  @ApiProperty({ description: 'Bill identifier', example: 'EPR-2023-Q3' })
  @IsString({ message: 'Bill identifier must be a string' })
  @IsNotEmpty({ message: 'Bill identifier is required' })
  bill_identifier: string;

  @ApiProperty({ description: 'Due date', required: false })
  @IsOptional()
  @IsDate({ message: 'Due date must be a valid date' })
  @Type(() => Date)
  due_date?: Date;

  @ApiProperty({ description: 'Submission date', required: false })
  @IsOptional()
  @IsDate({ message: 'Submission date must be a valid date' })
  @Type(() => Date)
  submitted_at?: Date;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject({ message: 'Metadata must be a valid object' })
  metadata?: Prisma.JsonObject;
}
