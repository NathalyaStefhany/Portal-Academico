import 'package:flutter/material.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';

class FinalGrades {
  final String subject;
  final String grade;
  final String semester;

  FinalGrades(this.subject, this.grade, this.semester);
}

class HistoricView extends StatelessWidget {
  final List<FinalGrades> historic = [
      FinalGrades('Introdução à Engenharia', '100', '2017/1'),
      FinalGrades('Algoritmos e Estruturas de Dados I', '100', '2017/1'),
      FinalGrades('Circuitos Elétricos I', '100', '2017/1'),
      FinalGrades('Matemática', '100', '2017/1'),
      FinalGrades('Álgebra e Geometria Analítica', '100', '2017/1'),
      FinalGrades('Atividades Complementares', '100', '2017/1'),
      FinalGrades('Algoritmos e Estrutura de Dados II', '100', '2017/1'),
      FinalGrades('Desenho', '100', '2017/1'),
      FinalGrades('Circuitos Elétricos II', '100', '2017/1'),
      FinalGrades('Eletrônica Analógica I', '100', '2017/1'),
      FinalGrades('Física I', '100', '2017/1'),
      FinalGrades('Cálculo I', '100', '2017/1'),
      FinalGrades('Química e Ciências dos Materiais', '100', '2017/1'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: MenuView(),
      appBar: AppBar(
        leading: Builder(
          builder: (context) => IconButton(
            icon: Icon(Icons.menu), 
            onPressed: (){
              Scaffold.of(context).openDrawer();
            }
          )
        ),
        title: Text('Histórico'),
        backgroundColor: AppColors.blue,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Container(
            decoration: BoxDecoration(
              border: Border.fromBorderSide(BorderSide(color: AppColors.darkBlue)),
              borderRadius: BorderRadius.circular(10)
            ),
            child: Table(
              defaultVerticalAlignment: TableCellVerticalAlignment.middle,
              border: TableBorder.symmetric(inside: BorderSide(color: AppColors.mediumBlue)),
              columnWidths: {
                0: FlexColumnWidth(2),
                1: FlexColumnWidth(1),
                2: FlexColumnWidth(1),
              },  
              children: [
                TableRow(
                  decoration: BoxDecoration(
                    color: AppColors.darkBlue,
                    borderRadius: BorderRadius. only(
                      topLeft: Radius.circular(9),
                      topRight: Radius.circular(9)
                    )
                  ),
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      child: Text(
                        'Disciplina', 
                        style: AppTextStyles.bodyWhiteBold, 
                        textAlign: TextAlign.center
                      ),
                    ),
                    Text(
                      'Nota', 
                      style: AppTextStyles.bodyWhiteBold, 
                      textAlign: TextAlign.center
                    ),
                    Text(
                      'Semestre', 
                      style: AppTextStyles.bodyWhiteBold, 
                      textAlign: TextAlign.center
                    ),
                  ]
                ),
                for(var i = 0; i < historic.length; i++)
                  TableRow(
                    children: [
                      Container(
                        color: AppColors.mediumBlue,
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          child: Text(
                            historic[i].subject, 
                            style: AppTextStyles.body14, 
                            textAlign: TextAlign.center
                          ),
                        ),
                      ),
                      Text(
                        historic[i].grade,  
                        style: AppTextStyles.body14, 
                        textAlign: TextAlign.center
                      ),
                      Text(
                        historic[i].semester, 
                        style: AppTextStyles.body14, 
                        textAlign: TextAlign.center
                      )
                    ]
                  )
              ]
            )
          ),
        ),
      )
    );
  }
}