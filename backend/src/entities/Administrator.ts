import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import bcrypt from "bcryptjs";

@Entity("administrators")
class Administrator {
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

   @Column({select: false})
   Password: string;

   constructor(employeeNumber: number, name: string, email: string, birthDate: Date, password: string = '') {
      this.CreatedAt = new Date(Date.now());
      this.EmployeeNumber = employeeNumber;
      this.Email = email;
      this.Name = name;
      this.BirthDate = birthDate;
      this.Password = password ? bcrypt.hashSync(password, 10) : bcrypt.hashSync("12345", 10);
   }

}

export { Administrator };