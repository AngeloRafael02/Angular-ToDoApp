import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ViewEntity,
    PrimaryColumn,
    ViewColumn,
    DataSource
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

    @Column({type:'varchar', length:255, nullable:true})
    note:string

    @ManyToOne(() => Categories, (category) => category.id) 
    @Column("smallint", { name: "cat_id", nullable: false })
    category: Categories;

    @Column({type:'int', default:0})
    prio:number
    
    @ManyToOne(() => Conditions, (conditions) => conditions.id) // Define foreign key relationship
    @Column("smallint", { name: "stat_id", default: 1, nullable:false })
    conditions:Conditions

    @CreateDateColumn({ type: 'time without time zone', default: () => 'CURRENT_TIMESTAMP',nullable:false })
    created_at:Date

    @UpdateDateColumn({ type: 'time without time zone', default: () => 'CURRENT_TIMESTAMP',nullable:false  })
    last_edited:Date

    @Column({type:'time without time zone', nullable:true})
    deadline:Date

    @ManyToOne(() => User, (user) => user.id) // Define foreign key relationship
    @Column({ type: 'int', nullable: false, name: "owner_id" }) // Keep the owner_id in database
    owner: User;
};

@ViewEntity({
    expression: (dataSource:DataSource) => dataSource
    .createQueryBuilder()
    .select("t.id","ID")
    .addSelect("t.title", "Title")
    .addSelect("t.note", "Description")
    .addSelect("cat.cat","Category")
    .addSelect("t.prio","Priority")
    .addSelect("con.stat","Status")
    .addSelect("t.deadline", "Deadline")
    .addSelect("t.created_at", "Created At")
    .addSelect("t.last_edited", "Last Edited")
    .addSelect("t.stat_id","SID")
    .addSelect("t.cat_id", "CID")
    .addSelect("u.id","UID")
    .from(Task, "t")
    .innerJoin(Categories, "cat", "t.cat_id = cat.id")
    .innerJoin(Conditions, "con", "t.stat_id = con.id")
    .innerJoin(User, "u", "t.owner_id = u.id")
})
export class taskView {
    @PrimaryColumn({name:'ID'})
    ID:number

    @ViewColumn({name:'Title'})
    Title:string

    @ViewColumn({name:'Description'})
    Description:string

    @ViewColumn({name:'Category'})
    Category:string

    @ViewColumn({name:'Priority'})
    Priority:number

    @ViewColumn({name:'Status'})
    Status:string

    @ViewColumn({name:'Deadline'})
    Deadline:Date

    @ViewColumn({name:'Created At'})
    "Created At":Date

    @ViewColumn({name:'Last Edited'})
    "Last Edited":Date

    @ViewColumn({name:'SID'})
    SID:number

    @ViewColumn({name:'CID'})
    CID:number

    @ViewColumn({name:'UID'})
    UID:number
}
