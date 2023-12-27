import { Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { myEntity } from './entities/entity/cv.entity';

@Module({
  imports:[TypeOrmModule.forFeature([myEntity])],
  controllers: [CvController],
  providers: [CvService]
})
export class CvModule {}
