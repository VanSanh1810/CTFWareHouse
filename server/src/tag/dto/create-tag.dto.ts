import { IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  category: string;

  @IsNotEmpty()
  tagName: string;
}
