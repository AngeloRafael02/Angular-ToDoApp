import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Conditions {
    @PrimaryGeneratedColumn()
    id:number

    @Column({ type: 'varchar', length: 20, nullable: false })
    stat:string
}