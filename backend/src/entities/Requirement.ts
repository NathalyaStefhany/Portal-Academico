import { Column } from "typeorm";

class Requirement {
    @Column()
    Acronym: string;
    
    @Column()
    RequireFlag: number;

    constructor(acronym: string, requireFlag: number) {
        this.Acronym = acronym;
        this.RequireFlag = requireFlag;
    }
}

export { Requirement }