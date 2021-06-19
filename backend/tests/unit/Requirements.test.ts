import { Requirement } from "../../src/entities/Requirement";

describe("Requirement test", () => {
    it("Structure test", () => {
        const requirement = new Requirement("", 0);

        expect(requirement).toHaveProperty("Acronym");
        expect(requirement).toHaveProperty("RequireFlag");
    });
});