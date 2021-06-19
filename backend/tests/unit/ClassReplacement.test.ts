import { ObjectId } from "mongodb";
import {ClassReplacement} from "../../src/entities/ClassReplacement";

describe("Class Replacement test", () => {
    it("Structure test", () => {
        const classReplacement = new ClassReplacement(new ObjectId(), "", "", new Date(), "", "");
        
        expect(classReplacement).toHaveProperty("ClassId");
        expect(classReplacement).toHaveProperty("Acronym");
        expect(classReplacement).toHaveProperty("Class");
        expect(classReplacement).toHaveProperty("Date");
        expect(classReplacement).toHaveProperty("Hour");
        expect(classReplacement).toHaveProperty("Room");
    });
});