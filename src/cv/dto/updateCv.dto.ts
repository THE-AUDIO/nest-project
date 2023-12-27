import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
export class UpdateCvDto{
    @IsOptional()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    @Min(15)
    @Max(65)
    age: number;

    @IsNumber()
    @Type(()=> Number)
    @IsOptional()
    cin: number;

    @IsString()
    @IsOptional()
    job: string;

    @IsOptional()
    @IsString()
    path: string;
}