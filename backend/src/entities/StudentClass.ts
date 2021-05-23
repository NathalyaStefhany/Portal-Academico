import { ObjectId } from "mongodb";
import { Column, ObjectIdColumn } from "typeorm";
import { Grade } from "./Grade";

class StudentClass {
  @ObjectIdColumn()
  classId: ObjectId;

  @Column()
  Grades: Array<Grade>;

  constructor(classId: ObjectId, grades: Array<Grade>) {
    this.classId = classId;
    this.Grades = grades;
  }
}

export { StudentClass };
