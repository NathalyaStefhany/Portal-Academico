import 'package:flutter/material.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';

class Subject {
  final String acronym;
  final String classAcronym;
  final String subject;
  final int hours;

  Subject(this.acronym, this.classAcronym, this.subject, this.hours);
}

class FrequencyView extends StatelessWidget {
  final List<Subject> frequency = [
    Subject('C115', 'L2', 'Conceitos e Tecnologias para Dispositivos Conectados', 20),
    Subject('C213', '', 'Sistemas Embarcados', 80),
  ];

  final List<String> months1 = ['Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'];

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
        title: Text('Frequência'),
        backgroundColor: AppColors.blue,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: ListView(
          children: [
            for(var i = 0; i < frequency.length; i++)
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
                          '${frequency[i].acronym} - ${frequency[i].classAcronym} ${frequency[i].subject}',
                          style: AppTextStyles.bodyBold,
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text('Limite Previsto: ', style: AppTextStyles.bodyBlue14,),
                            Text((frequency[i].hours * 0.1).toInt().toString())
                          ],
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
                                child: Text(
                                  'Mês', 
                                  style: AppTextStyles.bodyBlue16, 
                                  textAlign: TextAlign.center
                                ),
                              ),
                              Text('Faltas', style: AppTextStyles.bodyBlue16, textAlign: TextAlign.center)
                            ]
                          ),
                          for(var j = 0; j < months1.length; j++)
                            TableRow(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.symmetric(vertical: 5),
                                  child: Text(
                                    months1[j], 
                                    style: AppTextStyles.body, 
                                    textAlign: TextAlign.center,
                                  ),
                                ),
                                Text(
                                  '-', 
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