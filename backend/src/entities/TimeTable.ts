import { Column } from "typeorm";

class TimeTable {
    @Column()
    Description: string;
    
    @Column()
    Hour: string;

    constructor(description: string, hour: string) {
        this.Description = description;
        this.Hour = hour;
    }
}

export { TimeTable }