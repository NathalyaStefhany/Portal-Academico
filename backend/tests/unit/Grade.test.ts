import { Grade } from "../../src/entities/Grade";

describe("Grade test", () => {
    it("Structure test", () => {
        const grade = new Grade("", 0, 0);

        expect(grade).toHaveProperty("Description");
        expect(grade).toHaveProperty("Percentage");
        expect(grade).toHaveProperty("Value");
    });
});