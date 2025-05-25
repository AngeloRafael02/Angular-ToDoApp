import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class task_events {
    @PrimaryGeneratedColumn({name:'id', type:'bigint'})
    id:number

    @Column({type:'varchar', length:10, nullable:true, unique:true})
    event:string
}

@Entity()
export class task_logs {
    @PrimaryGeneratedColumn({name:'id', type:'bigint'})
    id:number //no need to be indexed

    @Column({type:'int', nullable:true, unique:true})
    taskID:number

    @Column({type:'varchar', length:100, nullable:true, unique:true})
    taskName:string
    
    @Column({type:'int', nullable:true})
    taskCatID:number

    @Column({type:'int', nullable:true})
    taskStatID:number

    @Column({type:'int', nullable:true})
    taskThreatID:number

    @ManyToOne(() => task_events, (event) => event.event) // Define foreign key relationship
    @JoinColumn({name:'taskEvent'})
    event:task_events;
    
    @Column({type:'smallint', nullable:true})
    taskEvent:number;

    @Column({type:'date', nullable:true, default: () => 'CURRENT_TIMESTAMP'})
    date:Date;
}

