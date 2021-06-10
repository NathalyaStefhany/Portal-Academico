import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';
import 'package:http/http.dart' as http;

class FinalGrades {
  final String subject;
  final String grade;
  final String semester;

  FinalGrades(this.subject, this.grade, this.semester);
}

class HistoricView extends StatefulWidget {
  final Map<dynamic, dynamic> studentInfo;

  const HistoricView({ this.studentInfo });

  @override
  _HistoricViewState createState() => _HistoricViewState();
}

class _HistoricViewState extends State<HistoricView> {
  String matriculationNumber;
  List<FinalGrades> historic = [];

  getHistoric() async {
    String url = DotEnv().env['URL'] + "/historic/$matriculationNumber";

    http.Response response = await http.get(
      Uri.parse(url), 
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    ); 

    Map<dynamic, dynamic> data = json.decode(response.body);

    List<FinalGrades> finalList = [];

    for(var i = 0; i < data["Subjects"].length; i++){
      finalList.add(
        FinalGrades(
          data["Subjects"][i]["SubjectName"], 
          data["Subjects"][i]["GradeValue"].toString(), 
          data["Subjects"][i]["SemesterYear"]
        )
      );
    }

    setState(() {
      historic = finalList;
    });
  }

  @override
  void initState() {
    super.initState();

    matriculationNumber = widget.studentInfo["matriculationNumber"].toString();

    getHistoric();
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
