import { IsOptional, IsString } from 'class-validator';

export class UpdateChallDto {
  @IsOptional()
  @IsString()
  challName?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  sourceUrl?: string;
}
