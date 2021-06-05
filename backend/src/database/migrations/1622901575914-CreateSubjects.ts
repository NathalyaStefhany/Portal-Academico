import { MigrationInterface } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Requirement } from "../../entities/Requirement";
import { Subject } from "../../entities/Subject";

export class CreateSubjects1622901575914 implements MigrationInterface {

    private subjects: Array<Subject>;

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        try {
            this.subjects = new Array<Subject>();
            const course = [{ Course: "GEC" }];

            //P1
            this.subjects.push(new Subject("M001", "Matemática", course, 1, [], [], 4));
            this.subjects.push(new Subject("M002", "Álgebra e Geometria Analítica", course, 1, [], [], 4));
            this.subjects.push(new Subject("C201", "Introdução a Engenharia", course, 1, [], [], 1));
            this.subjects.push(new Subject("AC1", "Atividades Complementares", course, 1, [], [], 3));
            this.subjects.push(new Subject("C202", "Algoritmos e Estruturas de Dados I", course, 1, [], [], 6));
            this.subjects.push(new Subject("E201", "Circuitos Elétricos I", course, 1, [], [], 3));

            //P2
            this.subjects.push(new Subject("C103", "Algoritmos e Estrutura de Dados II", course, 2, [], [new Requirement("C202", 0)], 3));
            this.subjects.push(new Subject("E110", "Desenho", course, 2, [], [new Requirement("E201", 1)], 1));
            this.subjects.push(new Subject("M003", "Cálculo I", course, 2, [], [new Requirement("M001", 0)], 4));
            this.subjects.push(new Subject("F201", "Física I", course, 2, [], [new Requirement("M001", 1), new Requirement("M003", 2)], 5));
            this.subjects.push(new Subject("Q201", "Química e Ciências dos Materiais", course, 2, [], [], 2));
            this.subjects.push(new Subject("E202", "Circuitos Elétricos II", course, 2, [], [new Requirement("E201", 0)], 3));
            this.subjects.push(new Subject("E204", "Eletrônica Analógica I", course, 2, [], [new Requirement("E201", 0)], 2));
            this.subjects.push(new Subject("AC2", "Atividades Complementares", course, 2, [], [new Requirement("AC1", 2)], 3));

            //P3
            this.subjects.push(new Subject("C204", "Algoritmos e Estruturas de Dados III", course, 3, [], [new Requirement("C103", 0)], 4));
            this.subjects.push(new Subject("M004", "Cálculo II", course, 3, [], [new Requirement("M003", 0)], 5));
            this.subjects.push(new Subject("F202", "Física II", course, 3, [], [new Requirement("M003", 1), new Requirement("F201", 1)], 5));
            this.subjects.push(new Subject("F005", "Mecânica dos Sólidos e Resistência dos Materiais", course, 3, [], [new Requirement("F201", 1)], 2));
            this.subjects.push(new Subject("E205", "Eletrônica Analógica II", course, 3, [], [new Requirement("E204", 1)], 3));
            this.subjects.push(new Subject("E207", "Eletrônica Digital I", course, 3, [], [new Requirement("E201", 1)], 3));
            this.subjects.push(new Subject("AC3", "Atividades Complementares", course, 3, [], [new Requirement("AC1", 0), new Requirement("AC2", 2)], 3));

            //P4
            this.subjects.push(new Subject("C005", "Linguagens de Programação e Compiladores", course, 4, [], [new Requirement("C202", 0)], 4));
            this.subjects.push(new Subject("M005", "Cálculo III", course, 4, [], [new Requirement("M003", 0)], 3));
            this.subjects.push(new Subject("F203", "Física III", course, 4, [], [new Requirement("M002", 1), new Requirement("M003", 1), new Requirement("F202", 2)], 4));
            this.subjects.push(new Subject("M007", "Sinais e Sistemas", course, 4, [], [new Requirement("M004", 1), new Requirement("M005", 2)], 4));
            this.subjects.push(new Subject("E206", "Eletrônica Analógica III", course, 4, [], [new Requirement("E204", 0), new Requirement("E205", 1)], 3));
            this.subjects.push(new Subject("E208", "Eletrônica Digital II", course, 4, [], [new Requirement("E207", 1)], 3));
            this.subjects.push(new Subject("AC4", "Atividades Complementares", course, 4, [], [new Requirement("AC2", 0), new Requirement("AC3", 2)], 3));

            //P5
            this.subjects.push(new Subject("C206", "Programação Orientada a Objetos", course, 5, [], [new Requirement("C103", 0)], 6));
            this.subjects.push(new Subject("C207", "Banco de Dados", course, 5, [], [new Requirement("C103", 2), new Requirement("C204", 2), new Requirement("C207", 2)], 4));
            this.subjects.push(new Subject("M008", "Probabilidade e Processos Estocásticos", course, 5, [], [new Requirement("M007", 1)], 4));
            this.subjects.push(new Subject("E209", "Sistemas Microcontrolados e Microprocessados", course, 5, [], [new Requirement("C202", 0), new Requirement("E207", 0), new Requirement("E208", 1)], 4));
            this.subjects.push(new Subject("G304", "Gestão de Projetos I", course, 5, [], [], 1));
            this.subjects.push(new Subject("AC5", "Atividades Complementares", course, 5, [], [new Requirement("AC3", 0), new Requirement("AC4", 2)], 3));

            //P6
            this.subjects.push(new Subject("M106", "Cálculo Numérico", course, 6, [], [new Requirement("C202", 0), new Requirement("M003", 0)], 2));
            this.subjects.push(new Subject("F004", "Física IV", course, 6, [], [new Requirement("F203", 2)], 1));
            this.subjects.push(new Subject("M109", "Estatística", course, 6, [], [new Requirement("M008", 1)], 1));
            this.subjects.push(new Subject("M210", "Otimização I", course, 6, [], [new Requirement("M109", 2)], 2));
            this.subjects.push(new Subject("C208", "Arquiteturas de Computadores", course, 6, [], [new Requirement("E209", 1)], 4));
            this.subjects.push(new Subject("C209", "Computação Gráfica e Multimídia", course, 6, [], [new Requirement("M001", 0), new Requirement("C206", 1)], 6));
            this.subjects.push(new Subject("AC6", "Atividades Complementares", course, 6, [], [new Requirement("AC4", 0), new Requirement("AC5", 2)], 3));

            //P7
            this.subjects.push(new Subject("C111", "Análise de Dados", course, 7, [], [new Requirement("C207", 1), new Requirement("C210", 2)], 1));
            this.subjects.push(new Subject("H001", "Administração", course, 7, [], [], 2));
            this.subjects.push(new Subject("T202", "Redes de Computadores", course, 7, [], [], 3));
            this.subjects.push(new Subject("C210", "Inteligência Computacional", course, 7, [], [new Requirement("C204", 0), new Requirement("C206", 0)], 4));
            this.subjects.push(new Subject("C012", "Sistemas Operacionais", course, 7, [], [new Requirement("C103", 0)], 4));
            this.subjects.push(new Subject("C319", "Disciplina Eletiva I", course, 7, [], [], 4));
            this.subjects.push(new Subject("AC7", "Atividades Complementares", course, 7, [], [new Requirement("AC5", 0), new Requirement("AC6", 2)], 3));

            //P8
            this.subjects.push(new Subject("T106", "Gerência,QoS e Segurança em Redes", course, 8, [], [new Requirement("T202", 1), new Requirement("C012", 2)], 2));
            this.subjects.push(new Subject("H002", "Economia", course, 8, [], [], 2));
            this.subjects.push(new Subject("C213", "Sistemas Embarcados", course, 8, [], [new Requirement("E205", 0), new Requirement("M007", 1), new Requirement("E206", 0), new Requirement("E209", 0), new Requirement("C210", 1)], 4));
            this.subjects.push(new Subject("C214", "Engenharia de Software", course, 8, [], [new Requirement("C206", 1)], 6));
            this.subjects.push(new Subject("C115", "Conceitos e Tecnologias para Dispositivos Conectados", course, 8, [], [new Requirement("T202", 1)], 1));
            this.subjects.push(new Subject("C320", "Disciplina Eletiva II", course, 8, [], [], 4));
            this.subjects.push(new Subject("AC8", "Atividades Complementares", course, 8, [], [new Requirement("AC6", 0), new Requirement("AC7", 2)], 3));

            //P9
            this.subjects.push(new Subject("H003", "Humanidades, Ciências Sociais e Cidadania", course, 9, [], [], 2));
            this.subjects.push(new Subject("H004", "Ciências do Ambiente", course, 9, [], [], 2));
            this.subjects.push(new Subject("C317", "Tópicos Especiais I", course, 9, [], [new Requirement("C204", 0), new Requirement("C206", 0), new Requirement("C207", 0)], 4));

            //P10
            this.subjects.push(new Subject("C216", "Sistemas Distribuídos", course, 10, [], [new Requirement("T202", 0), new Requirement("C012", 0)], 3));
            this.subjects.push(new Subject("C318", "Tópicos Especiais II", course, 10, [], [new Requirement("C206", 0), new Requirement("C210", 0)], 4));
            this.subjects.push(new Subject("TCC", "Trabalho de Conclusão de Curso", course, 10, [], [], 2));

            queryRunner.insertMany("subjects", this.subjects);


        } catch (error) {
            console.log(error);
        }
    }

    public async down(queryRunner: MongoQueryRunner): Promise<void> {
        console.log("Subjects migration revert not implemented yet")
    }

}
