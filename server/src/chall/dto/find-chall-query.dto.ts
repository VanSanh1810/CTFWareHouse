import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindChallQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  tags?: string;

  @IsOptional()
  @Type(() => Number) // Chuyển đổi page thành number
  @IsNumber({}, { message: 'Page must be a number' })
  @Transform(
    ({ value }) => {
      return isNaN(value) || !value || (!isNaN(value) && value < 1) ? 1 : value; // Đặt mặc định là 1 nếu không hợp lệ
    },
    { toClassOnly: false },
  ) // Đặt mặc định là 1 nếu không hợp lệ
  page?: number;
}
