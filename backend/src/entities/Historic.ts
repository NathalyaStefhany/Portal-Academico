import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { SubjectHist } from "./SubjectHist";

@Entity("histories")
class Historic {
    @CreateDateColumn()
    CreatedAt: Date;

    @PrimaryColumn()
    MatriculationNumber: number;

    @Column()
    Subjects: Array<SubjectHist>;

    constructor(matriculationNumber: number, subjects: Array<SubjectHist>) {
        this.CreatedAt = new Date(Date.now());
        this.MatriculationNumber = matriculationNumber;
        this.Subjects = subjects;
    }

}

export { Historic }