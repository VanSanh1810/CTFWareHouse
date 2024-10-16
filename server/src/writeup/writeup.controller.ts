import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WriteupService } from './writeup.service';
import { CreateWriteupDto } from './dto/create-writeup.dto';
import { UpdateWriteupDto } from './dto/update-writeup.dto';
import { WriteupQuery } from './dto/writeup_query';

@Controller('writeup')
export class WriteupController {
  constructor(private readonly writeupService: WriteupService) {}

  @Post()
  create(@Body() createWriteupDto: CreateWriteupDto) {
    return this.writeupService.create(createWriteupDto);
  }

  @Get()
  findAll(@Query() query: WriteupQuery) {
    return this.writeupService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.writeupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWriteupDto: UpdateWriteupDto) {
    return this.writeupService.update(+id, updateWriteupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.writeupService.remove(+id);
  }
}
