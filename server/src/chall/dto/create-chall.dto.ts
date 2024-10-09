import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateChallDto {
  @IsNotEmpty()
  @IsString()
  challName: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsString()
  sourceUrl: string;

  @IsNotEmpty()
  @IsString()
  tags: string;
}

class NewTagFrag {
  @IsNotEmpty()
  @IsString()
  tagName: string;
  category?: string;
}
