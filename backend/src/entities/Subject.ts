import { ObjectId } from "mongodb";
import { Entity, Column, CreateDateColumn, PrimaryColumn, ObjectIdColumn } from "typeorm";
import { Requirement } from "./Requirement";

interface ClassId {
    ClassId: ObjectId;
}

interface Course{
    Course: string;
}

@Entity("subjects")
class Subject {
    @CreateDateColumn()
    CreatedAt: Date;

    @PrimaryColumn()
    Acronym: string;

    @Column()
    Name: string;

    @Column()
    CousesIn: Array<Course>;

    @Column()
    Period: number;

    @Column()
    Classes: Array<ClassId>;

    @Column()
    Requirements: Array<Requirement>;

    @Column()
    Credits: number;

    constructor(
        acronym: string, name: string, coursesIn:Array<Course>,period: number, classes: Array<ClassId>,
        requirements: Array<Requirement>, credits: number) {

        this.CreatedAt = new Date(Date.now());
        this.Acronym = acronym;
        this.Name = name;
        this.CousesIn = coursesIn;
        this.Period = period;
        this.Classes = classes;
        this.Requirements = requirements;
        this.Credits = credits;
    }

}

export { Subject }