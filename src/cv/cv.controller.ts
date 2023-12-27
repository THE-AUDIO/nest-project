import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CvService } from './cv.service';
import { myEntity } from './entities/entity/cv.entity';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/updateCv.dto';

@Controller('cv')
export class CvController {
    constructor(private cvService: CvService) {
        
    }
    @Get()
    async getAll(): Promise<myEntity[]>{
        return this.cvService.getcvs()
    }

    @Post()
    async AddCv(
    @Body() addcvDto : AddCvDto
    ){
        return this.cvService.AddcV(addcvDto)
    }
    @Patch(':id')
    async UpdateCv(
    @Body() updatecvDto : UpdateCvDto,
    @Param('id', ParseIntPipe)  id : number
    ){
        return this.cvService.updatecV(id, updatecvDto)
    }
    @Patch()
    async UpdateCv2(
    @Body() updateObject
    ){
         const {updateCriteria, updateCvDto} =  updateObject 
        return this.cvService.updateCv2(updateCriteria, updateCvDto)
    }
    @Delete(':id')
    async removeCv(
        @Param('id', ParseIntPipe) id : number
    ){

        return this.cvService.deeleteCv(id)
    }

    @Get(':id')
    async findCvById(@Param('id') id: number) {
        return await this.cvService.findById(id);
    }
}