import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChallDto } from './dto/create-chall.dto';
import { UpdateChallDto } from './dto/update-chall.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/TypeORM/Entities/Tags.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Challenge } from 'src/TypeORM/Entities/Challenge.entity';
import { Category } from 'src/TypeORM/Entities/Category.entity';

@Injectable()
export class ChallService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(Challenge) private challRepository: Repository<Challenge>,
    @InjectRepository(Category) private cateRepository: Repository<Category>,
  ) {}

  async create(createChallDto: CreateChallDto) {
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
    return `This action returns all chall`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chall`;
  }

  update(id: number, updateChallDto: UpdateChallDto) {
    return `This action updates a #${id} chall`;
  }

  remove(id: number) {
    return `This action removes a #${id} chall`;
  }
}
