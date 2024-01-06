import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { CvService } from './cv.service';
import { myEntity } from './entities/entity/cv.entity';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/updateCv.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt.authguard';
import { User } from 'src/decorator/user.decorator';

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
    async getAll(
        @User() user,
    ) {
        // console.log(user)                                                                
        return this.cvService.getcvs(user)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async AddCv(
    @Body() addcvDto : AddCvDto,
    @User() user
    ){      
        return this.cvService.AddcV(addcvDto, user)
    }


    @Get('recover/:id')
    @UseGuards(JwtAuthGuard)
    async restore(@Param('id',ParseIntPipe) id: number) {

        return await this.cvService.restorecv(id);;
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findCvById(
        @Param('id',ParseIntPipe) id,
        @User() user
        ) {
        return await this.cvService.findCvById(id, user);
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
        @Param('id', ParseIntPipe) id : number,
        @User() user
    ){

        return await  this.cvService.softRemoveCv(user,id)
    } 
}