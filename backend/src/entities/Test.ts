import { Column, PrimaryColumn } from "typeorm";

class Test {
    @Column()
    TestName: string;

    @Column()
    Date: Date;

    @Column()
    Time: string;
    
    @Column()
    Local: string;

    constructor(testName: string, date: Date, time: string, local: string) {
        this.TestName = testName;
        this.Date = date;
        this.Time = time;
        this.Local = local;
    }
}

export { Test }