import { PartialType } from '@nestjs/mapped-types';
import { CreateChallDto } from './create-chall.dto';

export class UpdateChallDto extends PartialType(CreateChallDto) {}
