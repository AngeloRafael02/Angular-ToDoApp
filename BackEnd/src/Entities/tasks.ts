import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import { Categories } from "./categories";
import { Conditions } from "./conditions";
import { User } from "./users";

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar',length:50, nullable:false})
    title:string

    @Column({type:'varchar', length:255, nullable:false})
    note:string

    @ManyToOne(() => Categories, (category) => category.id) 
    @Column("smallint", { name: "cat_id", nullable: false })
    category: Categories;

    @Column({type:'int', default:0})
    prop:number
    
    @ManyToOne(() => Conditions, (conditions) => conditions.id) // Define foreign key relationship
    @Column("smallint", { name: "stat_id", default: 1, nullable:false })
    conditions:Conditions

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP',nullable:false })
    created_at:Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP',nullable:false  })
    last_edited:Date

    
    @ManyToOne(() => User, (user) => user.id) // Define foreign key relationship
    @Column({ type: 'int', nullable: false, name: "owner_id" }) // Keep the owner_id in database
    owner: User;
};