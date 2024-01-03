import { myEntity } from "src/cv/entities/entity/cv.entity";
import { timeStampEntity } from "src/generics/timeStam.entity";
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
    @OneToMany(
        type => myEntity,
        (cvs) => cvs.user
    )
    cvs: myEntity[];    
}
