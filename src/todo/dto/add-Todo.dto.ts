import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AddTodoDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(6,{
        message: 'la taille minimale du champ est de 6 caractère'
    })
    @MaxLength(25)
    name : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10,{
        message: 'la taille minimale du description est de 10 caractère'
    })
    description : string;

    
    @IsIn(['inscription', 'réinscription'])
    status: string;

}