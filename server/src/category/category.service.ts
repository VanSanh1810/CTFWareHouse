import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/TypeORM/Entities/Category.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private cateRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCate = this.cateRepository.create(createCategoryDto);
    return await this.cateRepository.save(newCate);
  }

  async findAll() {
    return await this.cateRepository.find();
  }

  async findOne(id: string) {
    return await this.cateRepository.findOneBy({ id: id });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const selectedCate = await this.cateRepository.findOneByOrFail({
        id: id,
      });
      if (updateCategoryDto.cateName) {
        selectedCate.cateName = updateCategoryDto.cateName;
        return await this.cateRepository.save(selectedCate);
      }
      throw new HttpException('Category not found', HttpStatus.NOT_MODIFIED);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const selectedCate = await this.cateRepository.findOneOrFail({
        where: {
          id: id,
        },
        relations: ['tags', 'challenges'],
      });
      if (
        selectedCate.challenges?.length > 0 ||
        selectedCate.tags?.length > 0
      ) {
        throw new HttpException(
          'Category still have related data',
          HttpStatus.CONFLICT,
        );
      }
      return await this.cateRepository.remove(selectedCate);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        `Internal Server Error ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
