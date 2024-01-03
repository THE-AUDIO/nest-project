import { timeStampEntity } from "src/generics/timeStam.entity";
import { UserEntity } from "src/user/entites/user.entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class myEntity extends timeStampEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  firstName: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  job: string;
  
  @Column()
  path: string; 
  
  @ManyToOne(
    type => UserEntity,
    (user) => user.cvs,
  )
  user: UserEntity;
}
