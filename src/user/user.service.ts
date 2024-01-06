import {ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { userSubsribeDto } from './dto/user-subscribe.dto';
import * as bcrypt from 'bcrypt'
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities';

@Injectable()
export class UserService {
 constructor(
    // @InjectRepository(UserEntity) 
    // private userRepository: Repository<UserEntity>,
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    private jwtService: JwtService
) {}

   async register(userData : userSubsribeDto): Promise<User> {
        // const user =  this.userRepository.create({ ...userData });
        const user =  this.userRepository.create(userData as DeepPartial<User>);
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        
        if (user) {
            try {
                await this.userRepository.save(user);
            } catch (err) {
                throw new ConflictException(err);
            }
            delete user.password,
            delete user.salt
        }
        return user;
    }

    async login(userLog: UserLoginDto) {
        const {username, password} = userLog;
        // verification des utilisateur qui essaye de se logger
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where(
                "user.username = :username OR user.password = :password",
                { username, password }
            )
            .getOne();

        if (!user) {
            throw new NotFoundException('Username or email invalid...');
        }

        const hashedPassword = bcrypt.hash(password, user.salt);
        if (hashedPassword !== user.password) {
            throw new NotFoundException('Username or email invalid...');
        }
        const payload = {
            userName: username,
            email: user.email,
            id: user.id,
            role: user.role
        };
        const jwt = await this.jwtService.signAsync(payload);
        return {
            'acces token ': jwt
        };
    }
}
