import { Student } from "../../src/entities/Student";

describe("Student test", () => {
    it("Structure test", () => {
        const student = new Student(1, "", "", "", new Date(), "",[], "" );

        expect(student).toHaveProperty("MatriculationNumber");
        expect(student).toHaveProperty("Course");
        expect(student).toHaveProperty("Name");
        expect(student).toHaveProperty("BirthDate");
        expect(student).toHaveProperty("CPF");
        expect(student).toHaveProperty("Email");
        expect(student).toHaveProperty("Password");
        expect(student).toHaveProperty("Period");
    });
});