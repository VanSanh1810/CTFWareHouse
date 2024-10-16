import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/TypeORM/Entities/Category.entity';
import { Challenge } from 'src/TypeORM/Entities/Challenge.entity';
import { Tag } from 'src/TypeORM/Entities/Tags.entity';
import { Writeup } from 'src/TypeORM/Entities/Writeup.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        // autoLoadEntities: true,
        entities: [Category, Tag, Challenge, Writeup],
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
      }),
      inject: [ConfigService], // inject config service to use in line 8
    }),
  ],
})
export class DatabaseModule {}
