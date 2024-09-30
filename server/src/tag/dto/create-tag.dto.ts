import { IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  tagName: string;
}
