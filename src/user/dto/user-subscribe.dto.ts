import { IsEmail, IsNotEmpty } from "class-validator";

export class userSubsribeDto{
    @IsNotEmpty()
    userName:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;


}