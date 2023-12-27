import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class timeStampEntity{
    @CreateDateColumn({
        update: false
    })
    createAt: Date
    
    @UpdateDateColumn()
    updateAt: Date; 
  
    @DeleteDateColumn({
            update: false
        }
    )
    deleteAt: Date;
}