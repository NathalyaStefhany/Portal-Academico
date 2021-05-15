import { Binary, ObjectId } from "mongodb";
import { Column, CreateDateColumn, ObjectIdColumn, PrimaryColumn } from "typeorm";

class SchoolSupply {
    @ObjectIdColumn()
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