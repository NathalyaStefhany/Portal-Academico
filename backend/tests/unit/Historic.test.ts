import { Historic } from "../../src/entities/Historic";

describe("Historic test", () => {
    it("Structure test", () => {
        const historic = new Historic(1234, []);

        expect(historic).toHaveProperty("MatriculationNumber");
        expect(historic).toHaveProperty("Subjects");
    });
});