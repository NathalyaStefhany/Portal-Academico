import {MigrationInterface} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export class CreateSubjects1619963892597 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        if(!queryRunner.hasDatabase("portalAcademico"))
            await queryRunner.createDatabase("portalAcademico");
        
        
    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {
    }

}
