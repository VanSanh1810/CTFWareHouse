import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/TypeORM/Entities/Tags.entity';
import { Repository } from 'typeorm';
import { Challenge } from 'src/TypeORM/Entities/Challenge.entity';
import { Category } from 'src/TypeORM/Entities/Category.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(Challenge) private challRepository: Repository<Challenge>,
    @InjectRepository(Category) private cateRepository: Repository<Category>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const newTag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(newTag);
  }

  findAll() {
    return `This action returns all tag`;
  }

  async findOne(id: string) {
    return await this.tagRepository.findOneBy({ id: id });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
