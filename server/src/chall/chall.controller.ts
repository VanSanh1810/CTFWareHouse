import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  UsePipes,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ChallService } from './chall.service';
import { CreateChallDto } from './dto/create-chall.dto';
import { UpdateChallDto } from './dto/update-chall.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FindChallQueryDto } from './dto/find-chall-query.dto';
import { UpdateChallTagDto } from './dto/update-chall-tag.dto';

@Controller('chall')
export class ChallController {
  constructor(private readonly challService: ChallService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      // Check the mimetypes to allow for upload
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/(rar|tar|bz|bz2|gz|zip|7z)/)) {
          // Allow storage of file
          cb(null, true);
        } else {
          // Reject file
          cb(
            new HttpException(
              `Unsupported file type ${extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 20 * 1024 * 1024, // Giới hạn kích thước file: 5MB
      },
      storage: diskStorage({
        destination: './uploads/challenges',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createChallDto: CreateChallDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const tags = JSON.parse(createChallDto.tags);
      if (!Array.isArray(tags)) {
        throw new HttpException('tags is not an array', HttpStatus.BAD_REQUEST);
      } else {
        tags.forEach((t) => {
          if (typeof t !== 'string') {
            if (!t.tagName) {
              throw new HttpException(
                'New tag must have tagName',
                HttpStatus.BAD_REQUEST,
              );
            }
          }
        });
      }
      return await this.challService.create(createChallDto, file);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(@Query() query: FindChallQueryDto) {
    return await this.challService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.challService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChallDto: UpdateChallDto,
  ) {
    return await this.challService.update(id, updateChallDto);
  }

  @Patch('tag/:id')
  async updateForTag(
    @Param('id') id: string,
    @Body() updateChallTagDto: UpdateChallTagDto,
  ) {
    return await this.challService.updateForTags(id, updateChallTagDto);
  }

  @Patch('file/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      // Check the mimetypes to allow for upload
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/(rar|tar|bz|bz2|gz|zip|7z)/)) {
          // Allow storage of file
          cb(null, true);
        } else {
          // Reject file
          cb(
            new HttpException(
              `Unsupported file type ${extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 20 * 1024 * 1024, // Giới hạn kích thước file: 5MB
      },
      storage: diskStorage({
        destination: './uploads/challenges',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateForFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.challService.updateForFile(id, file);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.challService.remove(id);
  }
}
