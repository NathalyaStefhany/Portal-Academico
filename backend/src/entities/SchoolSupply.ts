import { Binary, ObjectId } from "mongodb";
import { Column, CreateDateColumn, PrimaryColumn } from "typeorm";

class SchoolSupply {
    @PrimaryColumn()
    _id: ObjectId;

    @Column()
    Description: string;

    @CreateDateColumn()
    CreationDate: Date;

    @Column()
    Content: Binary;

    constructor(description: string, content: Binary) {
        this.Description = description;
        this.CreationDate = new Date(Date.now());
        this.Content = content;

    }
}

export { SchoolSupply }