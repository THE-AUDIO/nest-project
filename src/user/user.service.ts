import {ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entites/user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { userSubsribeDto } from './dto/user-subscribe.dto';
import * as bcrypt from 'bcrypt'
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
 constructor(
    @InjectRepository(UserEntity) 
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
) {}

   async register(userData : userSubsribeDto): Promise<UserEntity> {

        const user =  this.userRepository.create({
            ...userData
        })
        
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, user.salt)
        
        console.log(user);
        
       if(user){
        try {
            await this.userRepository.save(user)
            
        } catch (err) {
            throw new ConflictException(err)
        }

        delete user.password,
        delete user.salt

       }
        return user

    }



    async login(userLog: UserLoginDto) {

        const {username, password} = userLog
        // verification des utilisateur qui essaye de se logger
        const user = await this.userRepository.createQueryBuilder('user')
        .where("user.username = :username or user.password = :password",
                {username, password}
            )
        .getOne()

        if(!user){
            throw new NotFoundException('username or email erronee')
        } 
        const hashedPassword = await bcrypt.hash(password, user.salt)

        if (hashedPassword ===  user.password) {
            const payload = {
                userName: username,
                email: user.email,
                role: user.role
            } 
            const jwt = await this.jwtService.sign(payload)
            return {
                'acces token ' :jwt
            }
        } else{
            throw new NotFoundException('username or email erronee')
        }
    }
}
