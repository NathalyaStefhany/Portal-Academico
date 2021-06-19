import { Coefficient } from "../../src/entities/Coefficient";

describe("Coefficient test", () => {
    it("Structure test", () => {
        const coefficient = new Coefficient("", 100, 100, 100);

        expect(coefficient).toHaveProperty("PeriodDate");
        expect(coefficient).toHaveProperty("Crs");
        expect(coefficient).toHaveProperty("Cre");
        expect(coefficient).toHaveProperty("Median");
    });
});