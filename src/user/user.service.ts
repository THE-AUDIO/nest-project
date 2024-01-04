import {ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entites/user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { userSubsribeDto } from './dto/user-subscribe.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
 constructor(
    @InjectRepository(UserEntity) 
    private userRepository: Repository<UserEntity>
) {}

   async register(userData : userSubsribeDto): Promise<UserEntity> {

        const user =  this.userRepository.create({
            ...userData
        })
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, user.salt)
        
        
        try {
            await this.userRepository.save(user)
            
        } catch (err) {
            throw new ConflictException('this user is alreday existed')
        }

        delete user.password,
        delete user.salt

        return user

    }

}
