import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class AddCvDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    @Min(15)
    @Max(65)
    age: number;

    @IsNumber()
    @Type(()=> Number)
    @IsNotEmpty()
    cin: number;

    @IsString()
    @IsNotEmpty()
    job: string;

    @IsOptional()
    @IsString()
    path: string;

}