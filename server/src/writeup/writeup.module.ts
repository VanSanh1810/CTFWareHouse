import { Module } from '@nestjs/common';
import { WriteupService } from './writeup.service';
import { WriteupController } from './writeup.controller';

@Module({
  controllers: [WriteupController],
  providers: [WriteupService],
})
export class WriteupModule {}
