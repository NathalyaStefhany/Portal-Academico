import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity("academicCoefficients")
class AcademicCoefficient {
    @CreateDateColumn()
    CreatedAt: Date;

    @PrimaryColumn()
    MatriculationNumber: number;

    @Column()
    Values: Array<ICoefficient>;

    constructor(matriculationNumber: number, values: Array<ICoefficient>) {
        this.CreatedAt = new Date(Date.now());
        this.MatriculationNumber = matriculationNumber;
        this.Values = values;
    }

}

export { AcademicCoefficient }