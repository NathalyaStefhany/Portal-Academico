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

    constructor(classId: ObjectId, date: Date) {
        this.CreatedAt = new Date(Date.now());
        this.ClassId = classId;
        this.Date = date;
    }

}

export { ClassReplacement }