import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateChallTagDto {
  @IsString()
  @IsNotEmpty()
  newtags: string;
}
