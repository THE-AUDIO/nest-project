import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("resume", { schema: "MYBASE" })
export class Resume {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @Column("varchar", { name: "firstName", length: 255 })
  firstName: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "age" })
  age: number;

  @Column("varchar", { name: "job", length: 255 })
  job: string;

  @Column("varchar", { name: "path", length: 255 })
  path: string;

  @Column("datetime", {
    name: "createAt",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createAt: Date;

  @Column("datetime", {
    name: "updateAt",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.resume, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
