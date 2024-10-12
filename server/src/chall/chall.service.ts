import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChallDto } from './dto/create-chall.dto';
import { UpdateChallDto } from './dto/update-chall.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/TypeORM/Entities/Tags.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Challenge } from 'src/TypeORM/Entities/Challenge.entity';
import { Category } from 'src/TypeORM/Entities/Category.entity';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { UpdateChallTagDto } from './dto/update-chall-tag.dto';
import { FindChallQueryDto } from './dto/find-chall-query.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ChallService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(Challenge) private challRepository: Repository<Challenge>,
    @InjectRepository(Category) private cateRepository: Repository<Category>,
    readonly configService: ConfigService,
  ) {}

  async create(createChallDto: CreateChallDto, file: Express.Multer.File) {
    try {
      console.log(createChallDto);
      const cate = createChallDto.category
        ? await this.cateRepository.findOneBy({
            id: createChallDto.category,
          })
        : null;

      const tags = [
        ...(await Promise.all(
          JSON.parse(createChallDto.tags).map(async (tag) => {
            if (typeof tag === 'object') {
              return await this.tagRepository.create({
                tagName: tag.tagName,
                category: tag.category
                  ? await this.cateRepository.findOneByOrFail({
                      id: tag.category,
                    })
                  : null,
              });
            } else {
              return await this.tagRepository.findOneByOrFail({ id: tag });
            }
          }),
        )),
      ];

      const newChall = this.challRepository.create({
        ...createChallDto,
        category: cate,
        tags: [...tags],
        staticFileName: createChallDto.challName + extname(file.filename),
        staticFileUrl: `${this.configService.get<string>(
          'STORAGE_DIR',
          '/uploads',
        )}${this.configService.get<string>('CHALLENGE_DIR', '/challenges')}/${file.filename} `,
      });

      return await this.challRepository.save(newChall);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          `Reference resource not found ${e}`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(query: FindChallQueryDto) {
    const queryBuilder = this.challRepository
      .createQueryBuilder('challenge')
      .leftJoinAndSelect('challenge.tags', 'tag')
      .leftJoinAndSelect('challenge.category', 'category')
      .limit(16)
      .offset(((query.page ? query.page : 1) - 1) * 16);

    if (query.category) {
      const queryCate = await this.cateRepository.findOneBy({
        id: query.category,
      });
      if (queryCate) {
        queryBuilder.andWhere('challenge.category.id = :queryCate', {
          queryCate: queryCate.id,
        });
      }
    }

    if (query.tags && query.tags.length > 0) {
      try {
        const lTags = [...JSON.parse(query.tags)];
        const tagIds = [...lTags];
        queryBuilder.andWhere('tag.id IN (:...tagIds)', { tagIds });
      } catch (e) {
        const singleTag = query.tags;
        queryBuilder.andWhere('tag.id = :singleTag', { singleTag });
      }
    }
    return {
      challenges: [...(await queryBuilder.getMany())],
      totalPage: Math.ceil((await queryBuilder.getCount()) / 16),
    };
  }

  async findOne(id: string) {
    return await this.challRepository.findOne({
      where: { id: id },
      relations: ['category', 'tags'],
    });
  }

  // only category
  async update(id: string, updateChallDto: UpdateChallDto) {
    try {
      const currentChall = await this.challRepository.findOneByOrFail({
        id: id,
      });

      if (updateChallDto.category) {
        const currentCate = await this.cateRepository.findOneByOrFail({
          id: updateChallDto.category,
        });

        currentChall.category = currentCate;
      }
      // Cập nhật các thuộc tính khác từ DTO
      Object.assign(currentChall, updateChallDto);
      return await this.challRepository.save(currentChall);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          'Reference resource not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(`${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateForTags(id: string, updateChallTagDto: UpdateChallTagDto) {
    try {
      const currentChall = await this.challRepository.findOneByOrFail({
        id: id,
      });

      const newTags = [
        ...(await Promise.all(
          JSON.parse(updateChallTagDto.newtags).map(async (tag) => {
            if (typeof tag === 'object') {
              return await this.tagRepository.create({
                tagName: tag.tagName,
                category: tag.category
                  ? await this.cateRepository.findOneByOrFail({
                      id: tag.category,
                    })
                  : null,
              });
            } else {
              return await this.tagRepository.findOneByOrFail({ id: tag });
            }
          }),
        )),
      ];

      if (newTags && newTags.length > 0) {
        currentChall.tags = newTags;
      }

      return await this.challRepository.save(currentChall);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          'Reference resource not found ' + e,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateForFile(id: string, file: Express.Multer.File) {
    try {
      const currentChall = await this.challRepository.findOneByOrFail({
        id: id,
      });

      const fullPath = path.resolve(currentChall.staticFileUrl.slice(1));

      fs.unlink(fullPath.trim(), (err) => {
        if (err) {
          console.error(`Error deleting file: ${err.message}`);
        } else {
          console.log(`File ${fullPath} deleted successfully`);
        }
      });

      currentChall.staticFileName =
        currentChall.challName + extname(file.filename);
      currentChall.staticFileUrl = `${this.configService.get<string>(
        'STORAGE_DIR',
        '/uploads',
      )}${this.configService.get<string>('CHALLENGE_DIR', '/challenges')}/${file.filename}`;

      return await this.challRepository.save(currentChall);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          'Reference resource not found ' + e,
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
      const currentChall = await this.challRepository.findOneByOrFail({
        id: id,
      });

      const fullPath = path.resolve(currentChall.staticFileUrl.slice(1));

      fs.unlink(fullPath.trim(), (err) => {
        if (err) {
          console.error(`Error deleting file: ${err.message}`);
        } else {
          console.log(`File ${fullPath} deleted successfully`);
        }
      });

      return await this.challRepository.remove(currentChall);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          'Reference resource not found',
          HttpStatus.NOT_FOUND,
        );
      }
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Internal Server Error' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
