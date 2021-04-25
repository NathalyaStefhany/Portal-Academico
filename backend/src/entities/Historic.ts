import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity("histories")
class Historic {
    @CreateDateColumn()
    CreatedAt: Date;

    @PrimaryColumn()
    MatriculationNumber: number;

    @Column()
    Subjects: Array<ISubjectHist>;

    constructor(matriculationNumber: number, subjects: Array<ISubjectHist>) {
        this.CreatedAt = new Date(Date.now());
        this.MatriculationNumber = matriculationNumber;
        this.Subjects = subjects;
    }

}

export { Historic }