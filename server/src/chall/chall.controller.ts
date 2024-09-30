import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallService } from './chall.service';
import { CreateChallDto } from './dto/create-chall.dto';
import { UpdateChallDto } from './dto/update-chall.dto';

@Controller('chall')
export class ChallController {
  constructor(private readonly challService: ChallService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createChallDto: CreateChallDto) {
    return await this.challService.create(createChallDto);
  }

  @Get()
  findAll() {
    return this.challService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChallDto: UpdateChallDto) {
    return this.challService.update(+id, updateChallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challService.remove(+id);
  }
}
