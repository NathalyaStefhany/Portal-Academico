import { MigrationInterface } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Administrator } from "../../entities/Administrator";

export class CreateAdministrators1619205490167 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        try {
            if (!queryRunner.hasDatabase("portalAcademico"))
                await queryRunner.createDatabase("portalAcademico");

            await queryRunner.insertOne(
                "administrators",
                new Administrator(
                    9999,
                    "Administrador",
                    "admin@inatel.br",
                    new Date("26 Feb 1972")
                )
            );
            
        } catch (error) {
            console.log(error)
        }


    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {

    }

}
