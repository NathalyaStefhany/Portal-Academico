import { Column } from "typeorm";

class SubjectHist {
  @Column()
  Acronym: string;

  @Column()
  SubjectName: string;

  @Column()
  GradeValue: number;

  @Column()
  SemesterYear: string;

  constructor(
    acronym: string,
    subjectName: string,
    gradeValue: number,
    semesterYear: string
  ) {
    this.Acronym = acronym;
    this.SubjectName = subjectName;
    this.GradeValue = gradeValue;
    this.SemesterYear = semesterYear;
  }
}
export { SubjectHist };
