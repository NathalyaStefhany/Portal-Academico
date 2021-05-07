import { Column, PrimaryColumn } from "typeorm";

class Test {
    @PrimaryColumn()
    TestName: string;

    @Column()
    Date: Date;

    constructor(testName: string, date: Date) {
        this.TestName = testName;
        this.Date = date;
    }
}

export { Test }