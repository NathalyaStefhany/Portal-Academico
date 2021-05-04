import { Column } from "typeorm";

class Frequency {
    @Column()
    ClassDate: Date;
    @Column()
    MissingStudents: Array<number>;

    constructor(classDate: Date, missingStudents: Array<number>) {
        this.ClassDate = classDate;
        this.MissingStudents = missingStudents;
    }
}

export { Frequency }