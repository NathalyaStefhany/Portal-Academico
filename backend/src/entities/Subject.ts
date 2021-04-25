import { ObjectId } from "mongodb";
import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

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
    Classes: Array<{ classId: ObjectId }>;

    @Column()
    Requirements: Array<IRequirement>;

    @Column()
    Credits: number;

    constructor(
        acronym: string, name: string, period: number, classes: Array<{ classId: ObjectId }>,
        requirements: Array<IRequirement>, credits: number) {

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