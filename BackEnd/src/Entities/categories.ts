import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id:number

    @Column({ type: 'varchar', length: 20, nullable: false })
    cat:string
}