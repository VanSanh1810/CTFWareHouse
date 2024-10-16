import { PartialType } from '@nestjs/mapped-types';
import { CreateWriteupDto } from './create-writeup.dto';

export class UpdateWriteupDto extends PartialType(CreateWriteupDto) {}
