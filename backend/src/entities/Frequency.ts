import { Column } from "typeorm";

class Frequency {
    @Column()
    ClassDate: Date;

    @Column()
    SubjectMatter: string;

    @Column()
    ClassesTaught: number;
    
    @Column()
    MissingStudents: Array<number>;

    constructor(classDate: Date, subjectMatter: string, classesTaught: number, missingStudents: Array<number>) {
        this.ClassDate = classDate;
        this.SubjectMatter = subjectMatter;
        this.ClassesTaught - classesTaught;
        this.MissingStudents = missingStudents;
    }
}

export { Frequency }