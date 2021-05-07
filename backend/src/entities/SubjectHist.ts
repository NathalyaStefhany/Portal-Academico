import { Column, PrimaryColumn } from "typeorm";

class SubjectHist {
    @PrimaryColumn()
    Acronym: string;

    @Column()
    SubjectName: string;

    @Column()
    GradeValue: number;

    constructor(acronym: string, subjectName: string, gradeValue: number){
        this.Acronym = acronym;
        this.SubjectName = subjectName;
        this.GradeValue = gradeValue;
    }
}
export {SubjectHist}