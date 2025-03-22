export interface conditionInterface {
    id:number
    stat:string
}
export interface categoriesInterface {
    id:number
    cat:string
}
export interface taskInterface {
    ID:number
    Title:string
    Description?:string
    CID:number
    Priority?:number
    SID:number
    "Created At":Date | string
    'Last Edited':Date | string
    Deadline?:Date | null
    UID:number
}
export interface taskViewInterface  extends taskInterface{
    Category:string
    Status:string
}
export interface userInterface {
}