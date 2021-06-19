import { Binary } from "mongodb/index";
import { SchoolSupply } from "../../src/entities/SchoolSupply";

jest.mock("mongodb/index")
const binaryMocked = Binary as jest.Mocked<typeof Binary>;

describe("School Supply test", () => {
    it("Structure test", () => {
        const supply = new SchoolSupply("", binaryMocked.prototype)

        expect(supply).toHaveProperty("Description");
        expect(supply).toHaveProperty("Content");
    });
});