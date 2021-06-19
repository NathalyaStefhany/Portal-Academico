import { Subject } from "../../src/entities/Subject";

describe("Subject test", () => {
    it("Structure test", () => {
        const subject = new Subject("", "", [], 1, [], [], 1);

        expect(subject).toHaveProperty("Acronym");
        expect(subject).toHaveProperty("Name");
        expect(subject).toHaveProperty("CousesIn");
        expect(subject).toHaveProperty("Period");
        expect(subject).toHaveProperty("Classes");
        expect(subject).toHaveProperty("Requirements");
        expect(subject).toHaveProperty("Credits");
    });
});