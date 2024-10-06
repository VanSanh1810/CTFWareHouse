import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class UpdateChallTagDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // Sẽ chỉ validate khi phần tử là object
  @Type(() => Object)
  newtags: (string | NewTagFrag)[];

  @IsArray()
  @ArrayMinSize(1)
  removetags: string[];
}

class NewTagFrag {
  @IsNotEmpty()
  tagName: string;
  category?: string;
}
