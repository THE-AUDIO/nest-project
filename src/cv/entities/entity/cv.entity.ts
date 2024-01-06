import { timeStampEntity } from "src/generics/timestamp.entity";
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
    {
      cascade: ['insert','update'],
      nullable: true,
      eager: false
    }
  )
  user: UserEntity;
}
