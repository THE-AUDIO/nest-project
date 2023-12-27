import { timeStampEntity } from "src/generics/timeStam.entity";
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
  
}
