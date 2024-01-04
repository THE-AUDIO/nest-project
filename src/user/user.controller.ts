import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userSubsribeDto } from './dto/user-subscribe.dto';
import { UserEntity } from './entites/user.entity/user.entity';

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){}

    @Post() 
    register(
        @Body() userData:userSubsribeDto
    ): Promise<UserEntity>{
       return  this.userService.register(userData)
    }
}
