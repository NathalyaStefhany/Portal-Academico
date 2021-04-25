import {MigrationInterface} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Administrator } from "../../entities/Administrator";

export class CreateAdministrators1619205490167 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        if(!queryRunner.hasDatabase("portalAcademico"))
            await queryRunner.createDatabase("portalAcademico");
        
        await queryRunner.insertOne(
            "administrators", 
            new Administrator(
                9999,
                "Renan Dias",
                "renandias@inatel.br",
                new Date("12/07/1998")
            )
        );
    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {
        
    }

}
