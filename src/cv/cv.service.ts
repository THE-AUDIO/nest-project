import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { myEntity } from './entities/entity/cv.entity';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/updateCv.dto';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { log } from 'console';


@Injectable()
export class CvService {
    constructor(
        @InjectRepository(myEntity)
        private cvRepository: Repository<myEntity>
    ) { }

    // function asynchrone qui retourne un prommesse d'un tableau d'entity
    async getcvs(data: any){
        const user = {userName: data.userName, email: data.email, role: data.role};
        if(data.role === UserRoleEnum.ADMIN ){
            return await this.cvRepository.find();
        } else{
            return await this.cvRepository.findBy({user: user});
        }

    }

    // ----------- verify if an cv exist--------------
    async findCvById(id: number, data: any): Promise<myEntity> {
        const user = {userName: data.userName, email: data.email, role: data.role, id: data.id};

        const cv =  await this.cvRepository.findOneBy({user});
        console.log(user)
        console.log(cv)
        if(!cv){
            throw new NotFoundException('cv not found');
        } else{
            if(user.role === UserRoleEnum.ADMIN || cv.user && cv.user.id === user.id){
                
                return cv
            } else{
                throw new  UnauthorizedException()
            }
        }
    }

    async AddcV(cv: AddCvDto, user: any): Promise<myEntity> {
        const newCv = this.cvRepository.create(cv); 
        newCv.user = user     
        return await this.cvRepository.save( newCv );
        // return await this.cvRepository.save({ ...newCv, user });
    } 
    async updatecV(id: number, cv: UpdateCvDto): Promise<myEntity> {
        // recuperation du cv avec id passer en parametre
        // remplacer l'ancien valeur du cv par newCv
        const newCv = await  this.cvRepository.preload({ ...cv, id });

        // tester si le cv d'id donne existe 
        if (!newCv) {
            throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
        }
        return await this.cvRepository.save(newCv);
        // sauvegarde du nouveau Cv
    }

    // in the var update criteria is a criteria to update de cvDto
    async updateCv2(updateCriteria: any, cv: UpdateCvDto): Promise<void> {
        await this.cvRepository.update(updateCriteria, cv)
    }

    async removeCv(id: number): Promise<void> {
        const cvToRemove = await this.cvRepository.findOneBy({ id });
        if (!cvToRemove) {
            throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
        }
        await this.cvRepository.remove(cvToRemove);
    }

    async deleteCv(id: number): Promise<void> {
        await this.cvRepository.delete(id);
    }

    // async findById(id: number): Promise<myEntity> {
    //     return await this.cvRepository.findOneBy({id});
    // }

    async softRemoveCv(user: any, id: number) {
      const cv = await this.findCvById(user, id); 
      if(!cv){
        throw new NotFoundException('cv not found');
    } else{
        if(user.role === UserRoleEnum.ADMIN || cv.user && cv.user.id === user.id)

        return await this.cvRepository.softRemove({id}); 
    }
    }
    
    async restorecv(id:number): Promise<Partial<myEntity>>{
        const cv = await this.cvRepository.recover({id});
        if (!cv.name) {
            throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
        } 
        return cv; 
    }
    // CREATE A QUERYBUILDER
//    async CvNumberByAge(maxAge, minAge =0) {
   async CvNumberByAge() {

    try {
        // CHERCHER LE NOMBRE DE CV PAR AGE 
        const qb = this.cvRepository.createQueryBuilder('cv');
        const result = await qb
            .select("cv.age, COUNT(cv.id) as count")
            // .where("cv.age > :minAge and cv.age < :maxAge")
            // .setParameters({minAge, maxAge})
            .groupBy("cv.age")
            .getRawMany();

        return result;
    } catch (error) {
        // Handle errors here
        console.error("Error fetching CV numbers by age:", error);
        throw error; // You may want to handle or log the error accordingly
    }
}

}

