import { ObjectId } from "mongodb";
import { StudentClass } from "../../src/entities/StudentClass";

describe("Student Class test", () => {
    it("Structure test", () => {
        const studentClass = new StudentClass(new ObjectId(), []);

        expect(studentClass).toHaveProperty("classId");
        expect(studentClass).toHaveProperty("Grades");
    });
});