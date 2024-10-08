import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateChallTagDto {
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true }) // Sẽ chỉ validate khi phần tử là object
  @Type(() => Object)
  newtags: (string | NewTagFrag)[];

  @IsArray()
  @ArrayMinSize(0)
  removetags: string[];
}

class NewTagFrag {
  @IsNotEmpty()
  tagName: string;

  @IsOptional()
  @IsString()
  category?: string;
}
