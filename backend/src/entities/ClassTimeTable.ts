import { ClassDate } from "./ClassDate";

class ClassTimeTable {
    public Acronym: string;
    public Class: string;
    public Classroom: string;
    public ClassDates: Array<ClassDate>;

    constructor(acronym: string, classParam: string, classroom: string, classDates: Array<ClassDate>){
        this.Acronym = acronym;
        this.Class = classParam;
        this.Classroom = classroom;
        this.ClassDates = classDates;
    }
}

export { ClassTimeTable }