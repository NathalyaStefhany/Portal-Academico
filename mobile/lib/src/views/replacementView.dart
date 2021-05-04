import 'package:flutter/material.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';

class Replacement {
  final String subject;
  final String date;

  Replacement(this.subject, this.date);
}

class ReplacementView extends StatelessWidget {
  final List<Replacement> tests = [
    Replacement('C213', '18/04/2021'),
    Replacement('C209', '29/04/2021'),
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
        title: Text('Reposições'),
        backgroundColor: AppColors.blue,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: 
            Container(
              decoration: BoxDecoration(
                color: AppColors.white,
                border: Border.fromBorderSide(BorderSide(color: AppColors.darkBlue, width: 2)),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Table(
                border: TableBorder.all(color: AppColors.mediumBlue, width: 1),
                defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                children: [
                  TableRow(
                    decoration: BoxDecoration(
                      border: Border(bottom: BorderSide(color: AppColors.darkBlue, width: 2))
                    ),
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        child: Text('Turma', style: AppTextStyles.bodyBlue16, textAlign: TextAlign.center)
                      ),
                      Text('Data', style: AppTextStyles.bodyBlue16, textAlign: TextAlign.center),
                    ]
                  ),
                  for(var i = 0; i < tests.length; i++)
                    TableRow(
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 5),
                          child: Text(
                            tests[i].subject, 
                            style: AppTextStyles.body, 
                            textAlign: TextAlign.center,
                          ),
                        ),
                        Text(
                          tests[i].date, 
                          style: AppTextStyles.body, 
                          textAlign: TextAlign.center,
                        ),
                      ]
                    )
                ],
              ),
            ),
        ),
      )
    );
  }
}