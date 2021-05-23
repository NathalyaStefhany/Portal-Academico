import { ObjectId } from "mongodb";
import { Entity, Column, CreateDateColumn, ObjectIdColumn } from "typeorm";

@Entity("classReplacement")
class ClassReplacement {
    @CreateDateColumn()
    CreatedAt: Date;

    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    ClassId: ObjectId;

    @Column()
    Acronym: string;

    @Column()
    Class: string;

    @Column()
    Date: Date;

    @Column()
    Hour: string;

    @Column()
    Room: string;

    constructor(classId: ObjectId, acronym: string, classParam: string, date: Date, hour: string, room: string) {
        this.CreatedAt = new Date(Date.now());
        this.ClassId = classId;
        this.Acronym = acronym;
        this.Class = classParam;
        this.Date = date;
        this.Hour = hour;
        this.Room = room
    }

}

export { ClassReplacement }