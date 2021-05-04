import { Column } from "typeorm"

class ClassDate {
    @Column()
    Weekday: string

    @Column()
    Time: string

    constructor(weekday: string, time: string) {
        this.Weekday = weekday;
        this.Time = time;
    }
}

export { ClassDate }