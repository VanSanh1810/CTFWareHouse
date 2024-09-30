import { Module } from '@nestjs/common';
import { ChallService } from './chall.service';
import { ChallController } from './chall.controller';

@Module({
  controllers: [ChallController],
  providers: [ChallService],
})
export class ChallModule {}
