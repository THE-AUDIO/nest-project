import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { CvService } from './cv.service';
import { myEntity } from './entities/entity/cv.entity';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/updateCv.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt.authguard';

@Controller('cv')
export class CvController {
    constructor(private cvService: CvService) {
        
    }
    @Get('stats')
    @UseGuards(JwtAuthGuard)
    async stateCvNumberByAge(){
        return  await this.cvService.CvNumberByAge()
        // return  await this.cvService.CvNumberByAge(58,22)
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    async UpdateCv2(
    @Body() updateObject
    ){
         const {updateCriteria, updateCvDto} =  updateObject 
        return this.cvService.updateCv2(updateCriteria, updateCvDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll(): Promise<myEntity[]>{
        return this.cvService.getcvs()
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async AddCv(
    @Body() addcvDto : AddCvDto,
    @Request() req : any
    ){  
        const user = req.user;
        return this.cvService.AddcV(addcvDto, user)
    }


    @Get('recover/:id')
    @UseGuards(JwtAuthGuard)
    async restore(@Param('id',ParseIntPipe) id: number) {

        return await this.cvService.restorecv(id);;
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findCvById(@Param('id',ParseIntPipe) id) {
        return await this.cvService.findById(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async UpdateCv(
    @Body() updatecvDto : UpdateCvDto,
    @Param('id', ParseIntPipe)  id : number
    ){
        return this.cvService.updatecV(id, updatecvDto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async removeCv(
        @Param('id', ParseIntPipe) id : number
    ){

        return await  this.cvService.softRemoveCv(id)
    } 
}