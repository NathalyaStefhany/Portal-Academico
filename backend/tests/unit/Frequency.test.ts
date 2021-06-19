import { Frequency } from "../../src/entities/Frequency";

describe("Frequency test", () => {
    it("Structure test", () => {
        const frequency = new Frequency(new Date, "", 0, [])

        expect(frequency).toHaveProperty("ClassDate");
        expect(frequency).toHaveProperty("SubjectMatter");
        expect(frequency).toHaveProperty("ClassesTaught");
        expect(frequency).toHaveProperty("MissingStudents");
    });
});