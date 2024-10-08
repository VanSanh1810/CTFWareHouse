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

  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true }) // Sẽ chỉ validate khi phần tử là object
  @Type(() => Object)
  tags: (string | NewTagFrag)[];
}

class NewTagFrag {
  @IsNotEmpty()
  @IsString()
  tagName: string;
  category?: string;
}
