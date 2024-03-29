import { Entity, Column, CreateDateColumn, PrimaryColumn, ObjectIdColumn } from "typeorm";
import { Coefficient } from "./Coefficient";

@Entity("academicCoefficients")
class AcademicCoefficient {
    @CreateDateColumn()
    CreatedAt: Date;

    @PrimaryColumn()
    MatriculationNumber: number;

    @Column(type => Coefficient)
    Values: Array<Coefficient>;

    constructor(matriculationNumber: number, values: Array<Coefficient>) {
        this.CreatedAt = new Date(Date.now());
        this.MatriculationNumber = matriculationNumber;
        this.Values = values;
    }

}

export { AcademicCoefficient }