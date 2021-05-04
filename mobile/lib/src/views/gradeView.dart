import 'package:flutter/material.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';

class Test {
  final String name;
  final String grade;

  Test(this.name, this.grade);
}

class Grades {
  final String acronym;
  final String classAcronym;
  final String subject;
  final List<Test> tests;

  Grades(this.acronym, this.classAcronym, this.subject, this.tests);
}

class GradeView extends StatelessWidget {
  final List<Grades> grades = [
    Grades(
      'C115', 
      'L2', 
      'Conceitos e Tecnologias para Dispositivos Conectados', 
      [Test('Exercício 1', '100'), Test('Exercício 2', '100')]
    ),
    Grades(
      'C213', 
      '', 
      'Sistemas Embarcados', 
      [Test('-', '-')]
    )
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
        title: Text('Notas'),
        backgroundColor: AppColors.blue,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: ListView(
          children: [
            for(var i = 0; i < grades.length; i++)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 10),
                child: Container(
                  decoration: BoxDecoration(
                    color: AppColors.white,
                    border: Border.fromBorderSide(BorderSide(color: AppColors.darkBlue, width: 2)),
                    borderRadius: BorderRadius.circular(10),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.gray.withOpacity(0.5),
                        spreadRadius: 1,
                        blurRadius: 4,
                        offset: Offset(0, 4),
                      )
                    ]
                  ),
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8),
                        child: Text(
                          '${grades[i].acronym} - ${grades[i].classAcronym} ${grades[i].subject}',
                          style: AppTextStyles.bodyBold,
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Table(
                        border: TableBorder.all(color: AppColors.mediumBlue, width: 1),
                        defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                        children: [
                          TableRow(
                            children: [
                              Padding(
                                padding: const EdgeInsets.symmetric(vertical: 8),
                                child: Text('Avaliação', style: AppTextStyles.bodyBlue16, textAlign: TextAlign.center),
                              ),
                              Text('Nota', style: AppTextStyles.bodyBlue16, textAlign: TextAlign.center)
                            ]
                          ),
                          for(var j = 0; j < grades[i].tests.length; j++)
                            TableRow(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.symmetric(vertical: 5),
                                  child: Text(
                                    grades[i].tests[j].name, 
                                    style: AppTextStyles.body, 
                                    textAlign: TextAlign.center,
                                  ),
                                ),
                                Text(
                                  grades[i].tests[j].grade, 
                                  style: AppTextStyles.body, 
                                  textAlign: TextAlign.center,
                                ),
                              ]
                            )
                        ],
                      ),
                    ],
                  ),
                ),
              )
          ],
        ),
      )
    );
  }
}