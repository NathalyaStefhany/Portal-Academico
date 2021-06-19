import { TimeTable } from "../../src/entities/TimeTable";

describe("TimeTable test", () => {
    it("Structure test", () => {
        const timeTable = new TimeTable("", "", "", []);

        expect(timeTable).toHaveProperty("Acronym");
        expect(timeTable).toHaveProperty("Class");
        expect(timeTable).toHaveProperty("Classroom");
        expect(timeTable).toHaveProperty("Date");
    });
});