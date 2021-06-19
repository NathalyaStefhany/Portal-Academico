import { ObjectId } from "mongodb";
import { Teacher } from "../../src/entities/Teacher";

describe("Teacher test", () => {
    it("Structure test", () => {
        const teacher = new Teacher(1, "", "", new Date(), [], [new ObjectId()], "")

        expect(teacher).toHaveProperty("EmployeeNumber");
        expect(teacher).toHaveProperty("Name");
        expect(teacher).toHaveProperty("Email");
        expect(teacher).toHaveProperty("BirthDate");
        expect(teacher).toHaveProperty("Password");
        expect(teacher).toHaveProperty("TimeTable");
        expect(teacher).toHaveProperty("Classes");
    });
});