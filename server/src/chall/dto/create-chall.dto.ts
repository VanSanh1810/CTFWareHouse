import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class CreateChallDto {
  @IsNotEmpty()
  challName: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  source: string;

  @IsNotEmpty()
  sourceUrl: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // Sẽ chỉ validate khi phần tử là object
  @Type(() => Object)
  tags: (string | NewTagFrag)[];
}

class NewTagFrag {
  @IsNotEmpty()
  tagName: string;
  category?: string;
}
