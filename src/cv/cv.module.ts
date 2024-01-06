import { Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume, User } from 'src/entities';

@Module({
  imports:[TypeOrmModule.forFeature([Resume, User])],
  controllers: [CvController],
  providers: [CvService]
})
export class CvModule {}
