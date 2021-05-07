import { Column } from "typeorm";

class Coefficient {
    @Column()
    PeriodDate: string;

    @Column()
    Crs: number;

    @Column()
    Cre: number;

    @Column()
    Median: number;

    constructor(periodDate: string, crs: number, cre: number, median: number) {
        this.PeriodDate = periodDate;
        this.Crs = crs;
        this.Cre = cre;
        this.Median = median;
    }
}

export { Coefficient }