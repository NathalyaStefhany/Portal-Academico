import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import bcrypt from "bcryptjs";
import { StudentClass } from "./StudentClass";

@Entity("students")
class Student {
  @CreateDateColumn()
  CreatedAt: Date;

  @PrimaryColumn()
  MatriculationNumber: number;

  @Column()
  Course: string;

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
  Classes: Array<StudentClass>;

  constructor(
    matriculationNumber: number,
    course: string,
    name: string,
    email: string,
    birthDate: Date,
    cpf: string,
    classes: Array<StudentClass>,
    password: string = ""
  ) {
    this.CreatedAt = new Date(Date.now());
    this.MatriculationNumber = matriculationNumber;
    this.Course = course;
    this.Name = name;
    this.BirthDate = birthDate;
    this.CPF = cpf;
    this.Email = email;
    this.Password = password
      ? bcrypt.hashSync(password, 10)
      : bcrypt.hashSync("12345", 10);
    this.Period = 1;
    this.Classes = classes;
  }
}

export { Student };
