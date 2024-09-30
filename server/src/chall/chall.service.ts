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
      const cate = await this.cateRepository.findOneByOrFail({
        id: createChallDto.category,
      });

      const tags = [
        ...(await Promise.all(
          createChallDto.tags.map(
            async (tag) =>
              await this.tagRepository.findOneByOrFail({ id: tag }),
          ),
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
          'Reference resource not found',
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
    return await this.challRepository.find();
  }

  async findOne(id: string) {
    return await this.challRepository.findOneBy({ id: id });
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
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateForTags(id: string, updateChallTagDto: UpdateChallTagDto) {
    try {
      const currentChall = await this.challRepository.findOneByOrFail({
        id: id,
      });

      const tags = [
        ...(await Promise.all(
          updateChallTagDto.tags.map(async (tag) => {
            const _tags = await this.tagRepository.findOneByOrFail({ id: tag });
            if (_tags.category.id !== currentChall.category.id) {
              // Tags dont exist in category
              throw new HttpException(
                'Reference resource not found',
                HttpStatus.NOT_FOUND,
              );
            }
            return _tags;
          }),
        )),
      ];

      currentChall.tags = tags;

      return await this.challRepository.save(currentChall);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          'Reference resource not found',
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

      return await this.challRepository.softRemove({ id: currentChall.id });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          'Reference resource not found',
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
