import { PartialType } from '@nestjs/mapped-types';
import { CreateEcoinventImportDto } from './create-ecoinvent_import.dto';

export class UpdateEcoinventImportDto extends PartialType(CreateEcoinventImportDto) {}
