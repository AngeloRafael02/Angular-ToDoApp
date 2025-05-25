import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ViewEntity,
    PrimaryColumn,
    ViewColumn,
    DataSource,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Categories } from "./categories";
import { Conditions } from "./conditions";
import { User } from "./users";
import { Threats } from "./threats";

@Entity()
export class Task{
    @PrimaryGeneratedColumn({ name:'id', type:'bigint' })
    id!:number
    
    @Column({ type:'varchar',length:50, nullable:false, unique:true })
    title:string

    @Column({ type:'varchar', length:255, nullable:true })
    note?:string

    @ManyToOne(() => Categories, (category) => category.cat) 
    @JoinColumn({name:'cat_id'})
    category:Categories;

    @Column({ type: 'int', nullable:false, default:1 })
    cat_id:number;

    @Column({ type:'int', nullable: true })
    prio?:number
    
    @ManyToOne(()=> Threats, (threats) => threats.level)
    @JoinColumn({name:'threat_id'})
    threat:Threats;
    
    @Column({ type:'int', default:1, nullable:true })
    threat_id?:number;

    @ManyToOne(() => Conditions, (conditions) => conditions.stat) // Define foreign key relationship
    @JoinColumn({name:'stat_id'})
    status:Conditions

    @Column({ type: 'int', default: 1, nullable:true })
    stat_id?:number;

    @Column({ type: 'timestamp without time zone',default: () => "CURRENT_TIMESTAMP", nullable:true })
    created_at?:Date

    @Column({ type: 'timestamp without time zone',default: () => "CURRENT_TIMESTAMP", nullable:true })
    last_edited?:Date

    @Column({ type:'timestamp without time zone', nullable:true })
    deadline?:Date

    @ManyToOne(() => User, (user) => user.id) // Define foreign key relationship
    @JoinColumn({name:'owner_id'})
    user:User
    
    @Column({ type: 'int', nullable: false }) // Keep the owner_id in database
    owner_id: number;
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
    .addSelect("th.level","Threat Level")
    .addSelect("t.deadline", "Deadline")
    .addSelect("t.created_at", "Created At")
    .addSelect("t.last_edited", "Last Edited")
    .addSelect("t.stat_id","SID")
    .addSelect("t.cat_id", "CID")
    .addSelect("u.id","UID")
    .addSelect("th.id", "TID")
    .from(Task, "t")
    .innerJoin(Categories, "cat", "t.cat_id = cat.id")
    .innerJoin(Conditions, "con", "t.stat_id = con.id")
    .innerJoin(User, "u", "t.owner_id = u.id")
    .innerJoin(Threats,"th","t.threat_id = th.id")
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

    @ViewColumn({name:"Threat Level"})
    "Threat Level":string

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

    @ViewColumn({name:'TID'})
    TID:number
}
