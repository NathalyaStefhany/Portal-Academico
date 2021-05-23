import { ObjectId } from "mongodb";
import { Entity, Column, CreateDateColumn, PrimaryColumn, ObjectIdColumn } from "typeorm";

@Entity("classReplacement")
class ClassReplacement {
    @CreateDateColumn()
    CreatedAt: Date;

    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    ClassId: ObjectId;

    @Column()
    Date: Date;

    @Column()
    Hour: string;

    @Column()
    Room: string;

    constructor(classId: ObjectId, date: Date, hour: string, room: string) {
        this.CreatedAt = new Date(Date.now());
        this.ClassId = classId;
        this.Date = date;
        this.Hour = hour;
        this.Room = room
    }

}

export { ClassReplacement }