import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPayload } from '../interfaces/payload.interface';
import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from '../entites/user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET_KEY'),
    });
  }

  async validate(payload: IPayload) {
    // j'ai recuperer mon user
    // const user = await this.userRepository.findOne({where:{username: payload.username}} as FindOneOptions<UserEntity>)    
    const user = await this.userRepository.findOneBy({userName: payload.userName});   
    // // si le user existe je le retourne
    // if(user){
    //   delete user.salt,
    //   delete user.password
    //   return user
    // } else{
    //   throw new UnauthorizedException()
    // }

    //si non je dechlence une erreur 
    return payload;
  }
}
