import {Class} from "../../src/entities/Class";

describe("Class test", () => {
    it("Structure test", () => {
        const classInstance = new Class("", "", "", [], [], 0, [], [], []);
        
        expect(classInstance).toHaveProperty("Acronym");
        expect(classInstance).toHaveProperty("Class");
        expect(classInstance).toHaveProperty("Classroom");
        expect(classInstance).toHaveProperty("ClassDate");
        expect(classInstance).toHaveProperty("TestDates");
        expect(classInstance).toHaveProperty("FrequencyLimit");
        expect(classInstance).toHaveProperty("Frequency");
        expect(classInstance).toHaveProperty("SchoolSupplies");
        expect(classInstance).toHaveProperty("Students");
    });
});