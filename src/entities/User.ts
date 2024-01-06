import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Resume } from "./Resume";

@Index("IDX_da5934070b5f2726ebfd3122c8", ["userName"], { unique: true })
@Index("IDX_e12875dfb3b1d92d7d7c5377e2", ["email"], { unique: true })
@Entity("user", { schema: "MYBASE" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "userName", unique: true, length: 250 })
  userName: string;

  @Column("varchar", { name: "email", unique: true, length: 50 })
  email: string;

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

  @Column("datetime", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "salt", length: 255 })
  salt: string;

  @Column("enum", {
    name: "role",
    enum: ["admin", "user"],
    default: () => "'user'",
  })
  role: "admin" | "user";

  @OneToMany(() => Resume, (resume) => resume.user)
  resume: Resume[];
}
