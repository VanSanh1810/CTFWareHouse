import { Injectable } from '@nestjs/common';
import { CreateWriteupDto } from './dto/create-writeup.dto';
import { UpdateWriteupDto } from './dto/update-writeup.dto';
import { WriteupQuery } from './dto/writeup_query';

@Injectable()
export class WriteupService {
  create(createWriteupDto: CreateWriteupDto) {
    return 'This action adds a new writeup';
  }

  findAll(query: WriteupQuery) {
    return `This action returns all writeup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} writeup`;
  }

  update(id: number, updateWriteupDto: UpdateWriteupDto) {
    return `This action updates a #${id} writeup`;
  }

  remove(id: number) {
    return `This action removes a #${id} writeup`;
  }
}
