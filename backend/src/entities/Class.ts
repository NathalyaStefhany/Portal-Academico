import { ObjectId } from "mongodb";
import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { ISchoolSupply } from "./ISchoolSupply";

@Entity("classes")
class Class {
    @CreateDateColumn()
    CreatedAt: Date;

    @PrimaryColumn()
    _id: ObjectId

    @Column()
    Acronym: string

    @Column()
    Class: string

    @Column()
    Classroom: string

    @Column()
    ClassDate: Array<{ date: Date }>

    @Column()
    TestDates: Array<ITest>;

    @Column()
    FrequencyLimit: number;

    @Column()
    Frequency: Array<IFrequency>;

    @Column()
    SchoolSupplies: Array<ISchoolSupply>;

    @Column()
    Students: Array<{ matriculationNumber: number }>;

    constructor(
        acronym: string, classParam: string, classroom: string, classDate: Array<{ date: Date }>,
        testDates: Array<ITest>, frequencyLimit: number, frequency: Array<IFrequency>, 
        schoolSupplies: Array<ISchoolSupply>, students: Array<{ matriculationNumber: number }>) {

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