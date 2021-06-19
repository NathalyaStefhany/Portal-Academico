import {Administrator} from "../../src/entities/Administrator";

describe("Administrator test", () => {
    it("Structure test", () => {
        const admin = new Administrator(
            9999,
            "Administrador",
            "admin@inatel.br",
            new Date("26 Feb 1972")
        );
        
        expect(admin).toHaveProperty("EmployeeNumber");
        expect(admin).toHaveProperty("Name");
        expect(admin).toHaveProperty("Email");
        expect(admin).toHaveProperty("BirthDate");
        expect(admin).toHaveProperty("Password");
    });
});