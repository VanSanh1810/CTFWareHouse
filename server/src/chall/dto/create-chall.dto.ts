import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

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
  tags: string[];
}
