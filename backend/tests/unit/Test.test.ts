import { Test } from "../../src/entities/Test";

describe("Test test", () => {
    it("Structure test", () => {
        const test = new Test("", new Date(), "", "");

        expect(test).toHaveProperty("TestName");
        expect(test).toHaveProperty("Date");
        expect(test).toHaveProperty("Time");
        expect(test).toHaveProperty("Local");
    });
});