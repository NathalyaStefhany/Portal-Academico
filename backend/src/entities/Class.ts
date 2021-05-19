import { ObjectId } from "mongodb";
import { Entity, Column, CreateDateColumn, PrimaryColumn, ObjectIdColumn } from "typeorm";
import { ClassDate } from "./ClassDate";
import { Frequency } from "./Frequency";
import { SchoolSupply } from "./SchoolSupply";
import { Test } from "./Test";

interface matriculationNumber {
    matriculationNumber: number
}

@Entity("classes")
class Class {
    @CreateDateColumn()
    CreatedAt: Date;

    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    Acronym: string;

    @Column()
    Class: string;

    @Column()
    Classroom: string;

    @Column(type => ClassDate)
    ClassDate: Array<ClassDate>

    @Column(type => Test)
    TestDates?: Array<Test>;

    @Column()
    FrequencyLimit: number;

    @Column(type => Frequency)
    Frequency?: Array<Frequency>;

    @Column(type => SchoolSupply)
    SchoolSupplies?: Array<SchoolSupply>;

    @Column()
    Students: Array<matriculationNumber>;

    constructor(
        acronym: string, classParam: string, classroom: string, classDate: Array<ClassDate>,
        testDates: Array<Test>, frequencyLimit: number, frequency: Array<Frequency>,
        schoolSupplies: Array<SchoolSupply>, students: Array<matriculationNumber>) {

        this.Acronym = acronym;
        this.Class = classParam;
        this.Classroom = classroom;
        this.ClassDate = classDate;
        this.TestDates = testDates;
        this.FrequencyLimit = frequencyLimit;
        this.Frequency = frequency;
        this.SchoolSupplies = schoolSupplies;
        this.Students = students;

    }

}

export { Class }