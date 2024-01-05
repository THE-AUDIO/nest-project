import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userSubsribeDto } from './dto/user-subscribe.dto';
import { UserEntity } from './entites/user.entity/user.entity';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){}

    @Post('signup') 
    register(
        @Body() userData:userSubsribeDto
    ): Promise<UserEntity>{
       return  this.userService.register(userData)
    }
    @Post('login') 
    login(
        @Body() userData: UserLoginDto
    ){        
       return  this.userService.login(userData)
    }
}
