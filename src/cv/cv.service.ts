import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { myEntity } from './entities/entity/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/updateCv.dto';


@Injectable()
export class CvService {
    constructor(
        @InjectRepository(myEntity)
        private cvRepository: Repository<myEntity>) {
    }

    // function asynchrone qui retourne un prommesse d'un tableau d'entity
    async getcvs(): Promise<myEntity[]>{    
        return await this.cvRepository.find()
    }

    // ----------- verify if an cv exist--------------
    async findCvById(id: number): Promise<myEntity> {
        return await this.cvRepository.findOneBy({id});    
    }

    async AddcV(cv:AddCvDto): Promise<myEntity>{
        return await this.cvRepository.save(cv);
    } 
    async updatecV(id:number, cv:UpdateCvDto): Promise<myEntity>{
        // recuperation du cv avec id passer en parametre
        // remplacer l'ancien valeur du cv par newCv
        const newCv = await  this.cvRepository.preload({
            id,
            ...cv,
        })

        // tester si le cv d'id donne existe 
        if (!newCv){
            throw new NotFoundException(`le cv d'id ${id} n'existe pas`)
        }
        return await this.cvRepository.save(newCv);
        // sauvegarde du nouveau Cv
    }

    // in the var update criteria is a criteria to update de cvDto
    updateCv2(updateCriteria, cv: UpdateCvDto){
        return this.cvRepository.update(updateCriteria, cv)
    }

    async removeCv(id: number){
        const cvToRemove = await this.cvRepository.findOneBy({id})
        if (!cvToRemove){
            throw new NotFoundException(`le cv d'id ${id} n'existe pas`)
        }
        this.cvRepository.remove(cvToRemove);
    }

    async deleteCv(id: number){
        return await this.cvRepository.delete(id);
    }

    async findById(id: number): Promise<myEntity> {
        return await this.cvRepository.findOneBy({id});
    }

    async softRemoveCv(id: number) {
        this.findCvById(id); 
        return await this.cvRepository.softRemove({id});    
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

