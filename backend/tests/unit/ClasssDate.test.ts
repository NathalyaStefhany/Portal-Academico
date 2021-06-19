import {ClassDate} from "../../src/entities/ClassDate";

describe("ClassDate test", () => {
    it("Structure test", () => {
        const classDate = new ClassDate("", "");
        
        expect(classDate).toHaveProperty("Weekday");
        expect(classDate).toHaveProperty("Time");
    });
});