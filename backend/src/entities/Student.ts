import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity("students")
class Student {
    @CreateDateColumn()
    CreatedAt: Date;

    @PrimaryColumn()
    MatriculationNumber: number;

    @Column()
    Name: string;

    @Column()
    BirthDate: Date;

    @Column()
    CPF: string;

    @Column()
    Email: string;

    @Column()
    Password: string;

    @Column()
    Period: number;

    @Column()
    Subjects: Array<{ acronym: string }>

    constructor(
        matriculationNumber: number, name: string, email: string, birthDate: Date,
        cpf: string, period: number, subjects: Array<{ acronym: string }>, password: string = '') {

        this.CreatedAt = new Date(Date.now());
        this.MatriculationNumber = matriculationNumber;
        this.Name = name;
        this.BirthDate = birthDate;
        this.CPF = cpf;
        this.Email = email;
        this.Password = password ? password : "12345";
        this.Period = period;
        this.Subjects = subjects;
    }

}

export { Student }