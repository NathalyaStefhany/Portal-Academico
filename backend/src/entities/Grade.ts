import { Column } from "typeorm";

class Grade {
    @Column()
    Description: string;

    @Column()
    Percentage: number;

    @Column()
    Value: number;

    constructor(description: string, percentage: number, value: number){
        this.Description = description;
        this.Percentage = percentage;
        this.Value = value;
    }
}

export { Grade }