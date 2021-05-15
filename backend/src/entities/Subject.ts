import { Entity, Column, CreateDateColumn, PrimaryColumn, ObjectIdColumn } from "typeorm";
import { Requirement } from "./Requirement";

interface classId {
    classId: Object
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
    Period: number;

    @Column()
    Classes: Array<classId>;

    @Column()
    Requirements: Array<Requirement>;

    @Column()
    Credits: number;

    constructor(
        acronym: string, name: string, period: number, classes: Array<classId>,
        requirements: Array<Requirement>, credits: number) {

        this.CreatedAt = new Date(Date.now());
        this.Acronym = acronym;
        this.Name = name;
        this.Period = period;
        this.Classes = classes;
        this.Requirements = requirements;
        this.Credits = credits;
    }

}

export { Subject }