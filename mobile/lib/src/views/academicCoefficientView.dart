import 'package:flutter/material.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';

class AcademicCoef {
  final String semester;
  final double cre;
  final double crs;
  final double mediana;

  AcademicCoef(this.semester, this.cre, this.crs, this.mediana);
}

class AcademicCoefficientView extends StatelessWidget {
  final List<AcademicCoef> coef = [
    AcademicCoef('2017/1', 100, 100, 100),
    AcademicCoef('2017/2', 100, 100, 100),
    AcademicCoef('2018/1', 100, 100, 100),
    AcademicCoef('2018/2', 100, 100, 100)
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
        title: Text('Coeficiente Acadêmico'),
        backgroundColor: AppColors.blue,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Container(
          child: Column(
            children: [
              Center(
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 6),
                  child: Text.rich(TextSpan(
                    text: "CRS: ", 
                    style: AppTextStyles.bodyBlue14,
                    children: [
                      TextSpan(
                        text: 'Coeficiente de Rendimento no Semestre',
                        style: AppTextStyles.body14,
                      )
                    ]
                  )),
                ),
              ),
              Text.rich(TextSpan(
                text: "CRE: ", 
                style: AppTextStyles.bodyBlue14,
                children: [
                  TextSpan(
                    text: 'Coeficiente de Rendimento Escolar',
                    style: AppTextStyles.body14
                  )
                ]
              )),
              Padding(
                padding: const EdgeInsets.only(top: 16),
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.fromBorderSide(BorderSide(color: AppColors.darkBlue)),
                    borderRadius: BorderRadius.circular(10)
                  ),
                  child: Table(
                    defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                    border: TableBorder.symmetric(inside: BorderSide(color: AppColors.mediumBlue)),
                    children: [
                      TableRow(
                        decoration: BoxDecoration(
                          color: AppColors.darkBlue,
                          //border: Border(bottom: BorderSide(color: AppColors.darkBlue, width: 2)),
                          borderRadius: BorderRadius. only(
                            topLeft: Radius.circular(9),
                            topRight: Radius.circular(9)
                          )
                        ),
                        children: [
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            child: Text(
                              'Semestre', 
                              style: AppTextStyles.bodyWhiteBold, 
                              textAlign: TextAlign.center
                            ),
                          ),
                          Text(
                            'CRE', 
                            style: AppTextStyles.bodyWhiteBold, 
                            textAlign: TextAlign.center
                          ),
                          Text(
                            'CRS', 
                            style: AppTextStyles.bodyWhiteBold, 
                            textAlign: TextAlign.center
                          ),
                          Text(
                            'Mediana', 
                            style: AppTextStyles.bodyWhiteBold, 
                            textAlign: TextAlign.center
                          )
                        ]
                      ),
                      for(var i = 0; i < coef.length; i++)
                        TableRow(
                          children: [
                            Container(
                              color: AppColors.mediumBlue,
                              child: Padding(
                                padding: const EdgeInsets.symmetric(vertical: 8),
                                child: Text(
                                  coef[i].semester, 
                                  style: AppTextStyles.body, 
                                  textAlign: TextAlign.center
                                ),
                              ),
                            ),
                            Text(
                              coef[i].cre.toString(), 
                              style: AppTextStyles.body, 
                              textAlign: TextAlign.center
                            ),
                            Text(
                              coef[i].crs.toString(), 
                              style: AppTextStyles.body, 
                              textAlign: TextAlign.center
                            ),
                            Text(
                              coef[i].mediana.toString(), 
                              style: AppTextStyles.body, 
                              textAlign: TextAlign.center
                            ),
                          ]
                        )
                    ],
                  ),
                ),
              )
            ],
          ),    
        ),
      )
    );
  }
}