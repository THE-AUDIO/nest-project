import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { User } from 'src/entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret : process.env.JWT_SECRET_KEY,
        signOptions: {
          algorithm: "HS512"
        }
      })
    })
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy
  ]
})
export class UserModule {}
