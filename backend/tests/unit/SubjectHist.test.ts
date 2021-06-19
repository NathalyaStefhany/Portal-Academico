import { SubjectHist } from "../../src/entities/SubjectHist";

describe("Subject History test", () => {
    it("Structure test", () => {
        const subject = new SubjectHist("", "", 1, "");

        expect(subject).toHaveProperty("Acronym");
        expect(subject).toHaveProperty("SubjectName");
        expect(subject).toHaveProperty("GradeValue");
        expect(subject).toHaveProperty("SemesterYear");
    });
});