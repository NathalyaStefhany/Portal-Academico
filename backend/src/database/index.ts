import { createConnection } from "typeorm";

createConnection({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "portalAcademico",
    useUnifiedTopology: true,
    entities: ["./src/entities/**.ts"],
});