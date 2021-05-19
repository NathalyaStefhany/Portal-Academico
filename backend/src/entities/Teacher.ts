import { ObjectId } from "mongodb";
import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { TimeTable } from "./TimeTable";
import bcrypt from"bcryptjs";

@Entity("teachers")
class Teacher {
    @CreateDateColumn()
    CreatedAt: Date;

    @PrimaryColumn()
    EmployeeNumber: number;

    @Column()
    Name: string;

    @Column()
    Email: string;

    @Column()
    BirthDate: Date;

    @Column()
    Password: string;

    @Column()
    TimeTable: Array<TimeTable>

    @Column()
    Classes: Array<ObjectId>

    constructor(
        employeeNumber: number, name: string, email: string, birthDate: Date, 
        timeTable: Array<TimeTable>, classes: Array<ObjectId>, password: string = '') {
        this.CreatedAt = new Date(Date.now());
        this.EmployeeNumber = employeeNumber;
        this.Email = email;
        this.Name = name;
        this.BirthDate = birthDate;
        this.Password = password ? bcrypt.hashSync(password, 10) : bcrypt.hashSync("12345", 10);
        this.TimeTable = timeTable;
        this.Classes = classes;
    }

}

export { Teacher }