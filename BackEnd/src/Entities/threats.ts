import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Threats {
    @PrimaryGeneratedColumn()
    id:number

    @Column({ type:'varchar', length:10, nullable:false })
    level:string
}