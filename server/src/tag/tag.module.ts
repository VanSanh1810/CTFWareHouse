import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/TypeORM/Entities/Tags.entity';
import { Category } from 'src/TypeORM/Entities/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Category])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
