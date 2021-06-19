import {AcademicCoefficient} from "../../src/entities/AcademicCoefficient";

describe("Academic Coefficient test", () => {
    it("Structure test", () => {
        const coefficient = new AcademicCoefficient(1234, []);
        
        expect(coefficient).toHaveProperty("MatriculationNumber");
        expect(coefficient).toHaveProperty("Values");
    });
});