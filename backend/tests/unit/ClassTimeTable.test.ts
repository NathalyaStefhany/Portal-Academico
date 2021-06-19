import {ClassTimeTable} from "../../src/entities/ClassTimeTable";

describe("Class Time Table test", () => {
    it("Structure test", () => {
        const classTimeTable = new ClassTimeTable("", "", "", []);
        
        expect(classTimeTable).toHaveProperty("Acronym");
        expect(classTimeTable).toHaveProperty("Class");
        expect(classTimeTable).toHaveProperty("Classroom");
        expect(classTimeTable).toHaveProperty("ClassDates");
    });
});