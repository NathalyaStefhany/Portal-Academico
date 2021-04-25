import { Binary, ObjectId } from "mongodb";

interface ISchoolSupply {
    _id: ObjectId;
    description: string;
    creationDate: Date;
    content: Binary;
}

export { ISchoolSupply }