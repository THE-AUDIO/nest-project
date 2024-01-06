import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class userSubsribeDto{
    @IsNotEmpty()
    userName:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;
    @IsOptional()
    role: string;


}