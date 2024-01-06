import { IsNotEmpty } from "class-validator";
import { myEntity } from "src/cv/entities/entity/cv.entity";
import { UserRoleEnum } from "src/enums/user-role.enum";
import { timeStampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity extends timeStampEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 250,
        unique: true
    })
    userName: string;
    @Column({
        unique: true,
        length:50
    })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @IsNotEmpty()
    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    role: string;

    @OneToMany(
        type => myEntity,
        (cvs) => cvs.user,
        {
            cascade: true,
            nullable: true,
            eager: true
          }
    )
    cvs: myEntity[];    
}
