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
} from '@nestjs/common';
import { ChallService } from './chall.service';
import { CreateChallDto } from './dto/create-chall.dto';
import { UpdateChallDto } from './dto/update-chall.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ValidateTagsPipe } from './pipe/ValidateTags.pipe';

@Controller('chall')
export class ChallController {
  constructor(private readonly challService: ChallService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      // Check the mimetypes to allow for upload
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(rar|tar|bz|bz2|gz|zip|7z)$/)) {
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
  @UsePipes(new ValidateTagsPipe())
  async create(
    @Body() createChallDto: CreateChallDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.challService.create(createChallDto, file);
  }

  @Get()
  async findAll() {
    return await this.challService.findAll();
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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.challService.remove(id);
  }
}
