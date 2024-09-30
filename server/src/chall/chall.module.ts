import { Module } from '@nestjs/common';
import { ChallService } from './chall.service';
import { ChallController } from './chall.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/TypeORM/Entities/Tags.entity';
import { Challenge } from 'src/TypeORM/Entities/Challenge.entity';
import { Category } from 'src/TypeORM/Entities/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Challenge, Category])],
  controllers: [ChallController],
  providers: [ChallService],
})
export class ChallModule {}
