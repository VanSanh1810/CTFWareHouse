import { ArrayMinSize, IsArray } from 'class-validator';

export class UpdateChallTagDto {
  @IsArray()
  @ArrayMinSize(1)
  tags: string[];
}
