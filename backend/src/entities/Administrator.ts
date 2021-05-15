import { Entity, Column, CreateDateColumn, PrimaryColumn, ObjectIdColumn } from "typeorm";

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

   @Column()
   Password: string;

   constructor(employeeNumber: number, name: string, email: string, birthDate: Date, password: string = '') {
      this.CreatedAt = new Date(Date.now());
      this.EmployeeNumber = employeeNumber;
      this.Email = email;
      this.Name = name;
      this.BirthDate = birthDate;
      this.Password = password ? password : "12345";
   }

}

export { Administrator };