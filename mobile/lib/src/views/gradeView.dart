import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';
import 'package:http/http.dart' as http;

class Test {
  final String name;
  final String grade;

  Test(this.name, this.grade);
}

class Grades {
  final String acronym;
  final String classAcronym;
  final List<Test> tests;

  Grades(this.acronym, this.classAcronym, this.tests);
}

class GradeView extends StatefulWidget {
  final Map<dynamic, dynamic> studentInfo;

  const GradeView({ this.studentInfo});

  @override
  _GradeViewState createState() => _GradeViewState();
}

class _GradeViewState extends State<GradeView> {
  String matriculationNumber;
  List<Grades> allGrades = [];

  getGrades() async {
    String url = DotEnv().env['URL'] + "/student/grades/$matriculationNumber";

    http.Response response = await http.get(
      Uri.parse(url), 
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    ); 

    List<dynamic> data = json.decode(response.body);

    List<Grades> finalList = [];

    for(var i = 0; i < data.length; i++){
      List<Test> tests = [];
      for(var j = 0; j < data[i].length; j++){
        tests.add(
          Test(data[i][j]["Test"], data[i][j]["Grade"].toString())
        );
      }
      finalList.add(
        Grades(data[i][0]["Acronym"], data[i][0]["Class"], tests)
      );
    }

    setState(() {
      allGrades = finalList;
    });
  }

  @override
  void initState() {
    super.initState();

    matriculationNumber = widget.studentInfo["matriculationNumber"].toString();

    getGrades();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: MenuView(studentInfo: widget.studentInfo,),
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
            for(var i = 0; i < allGrades.length; i++)
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
                          allGrades[i].acronym + 
                            (allGrades[i].classAcronym != "" ? ' - ${allGrades[i].classAcronym}': ""),
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
                          for(var j = 0; j < allGrades[i].tests.length; j++)
                            TableRow(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.symmetric(vertical: 5),
                                  child: Text(
                                    allGrades[i].tests[j].name, 
                                    style: AppTextStyles.body, 
                                    textAlign: TextAlign.center,
                                  ),
                                ),
                                Text(
                                  allGrades[i].tests[j].grade, 
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