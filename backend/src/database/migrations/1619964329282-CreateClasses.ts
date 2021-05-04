import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Class } from "../../entities/Class";
import {ClassDate} from "../../entities/ClassDate"
import { Frequency } from "../../entities/Frequency";
import { SchoolSupply } from "../../entities/SchoolSupply";
import { Test } from "../../entities/Test";

interface matriculationNumber{
    matriculationNumber: number
}

export class CreateClasses1619964329282 implements MigrationInterface {

    classDate:ClassDate; 
    classDates: Array<ClassDate>;
    tests: Array<Test>;
    frequency: Array<Frequency>;
    supplies: Array<SchoolSupply>;
    matriculation: matriculationNumber = {matriculationNumber: 1420};
    matriculationNumbers: Array<matriculationNumber>;

    public async up(queryRunner: MongoQueryRunner): Promise<void> {

        if(!queryRunner.hasDatabase("portalAcademico"))
            await queryRunner.createDatabase("portalAcademico");

        this.classDate = new ClassDate("Segunda", "13:30");
        this.classDates = new Array();
        this.classDates.push(this.classDate);
        this.classDate = new ClassDate("Segunda", "15:30");
        this.classDates.push(this.classDate);

        this.matriculationNumbers = new Array();
        this.matriculationNumbers.push(this.matriculation);

        queryRunner.insertOne(
            "classes",
            new Class(
                "C317",
                "",
                "l-17",
                this.classDates,
                this.tests = null,
                20,
                this.frequency = null,
                this.supplies = null,
                this.matriculationNumbers
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
