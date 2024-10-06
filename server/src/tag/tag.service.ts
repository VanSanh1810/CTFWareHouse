import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/TypeORM/Entities/Tags.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Challenge } from 'src/TypeORM/Entities/Challenge.entity';
import { Category } from 'src/TypeORM/Entities/Category.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    // @InjectRepository(Challenge) private challRepository: Repository<Challenge>,
    @InjectRepository(Category) private cateRepository: Repository<Category>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    try {
      const cate = createTagDto.category
        ? await this.cateRepository.findOneByOrFail({
            id: createTagDto.category,
          })
        : null;
      const newTag = this.tagRepository.create({
        ...createTagDto,
        category: cate,
      });
      return await this.tagRepository.save(newTag);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          'Category resource not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return await this.tagRepository.find({ relations: ['category'] });
  }

  async findOne(id: string) {
    return await this.tagRepository.findOneBy({ id: id });
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    try {
      const currentTag = await this.tagRepository.findOneByOrFail({ id: id });
      if (updateTagDto.tagName) {
        currentTag.tagName = updateTagDto.tagName;
      }
      if (updateTagDto.category || updateTagDto.category === null) {
        currentTag.category = updateTagDto.category
          ? await this.cateRepository.findOneByOrFail({
              id: updateTagDto.category,
            })
          : null;
      }

      return await this.tagRepository.save(currentTag);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          'Category resource not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const currentTag = await this.tagRepository.findOneByOrFail({ id: id });
      if (currentTag.challenges && currentTag.challenges.length > 0) {
        throw new HttpException(
          'Tag still have some challenges with it !',
          HttpStatus.CONFLICT,
        );
      }
      return await this.tagRepository.remove(currentTag);
    } catch (e) {
      console.log(e);
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          'Category resource not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
