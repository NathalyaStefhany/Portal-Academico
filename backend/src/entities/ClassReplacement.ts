import { ObjectId } from "mongodb";
import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity("classReplacement")
class ClassReplacement {
    @CreateDateColumn()
    CreatedAt: Date;

    @PrimaryColumn()
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