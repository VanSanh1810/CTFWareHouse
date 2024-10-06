import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindTagQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Type(() => Number) // Chuyển đổi page thành number
  @IsNumber({}, { message: 'Page must be a number' })
  @Transform(({ value }) => (isNaN(value) ? 1 : value), { toClassOnly: true }) // Đặt mặc định là 1 nếu không hợp lệ
  page?: number | 1;
}
