import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entites/user.entity/user.entity';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as  dotenv from 'dotenv'
import { JwtStrategy } from './strategy/passport-jwt.strategy';

dotenv.config()
@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
        secret : process.env.JWT_SECRET_KEY,
        signOptions: {
            expiresIn: 3600
        }
    })

  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy
  ]
})
export class UserModule {}
