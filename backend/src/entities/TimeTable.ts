import { Column } from "typeorm";
import { ClassDate } from "./ClassDate";

class TimeTable {
    @Column()
    Acronym: string;

    @Column()
    Class: string;

    @Column()
    Classroom: string;

    @Column()
    Date: Array<ClassDate>;

    constructor(acronym: string, classParam: string, classroom: string, date: Array<ClassDate>) {
        this.Acronym = acronym;
        this.Class = classParam;
        this.Classroom = classroom;
        this.Date = date;
    }
}

export { TimeTable }