import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:intl/intl.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';
import 'package:http/http.dart' as http;

class Test {
  final String type;
  final String subject;
  final String date;
  final String place;

  Test(this.type, this.subject, this.date, this.place);
}

class TestsView extends StatefulWidget {
  final Map<dynamic, dynamic> studentInfo;

  TestsView({ this.studentInfo });

  @override
  _TestsViewState createState() => _TestsViewState();
}

class _TestsViewState extends State<TestsView> {
  String matriculationNumber;
  List<Test> allTests = [];

  getTests() async {
    String url = DotEnv().env['URL'] + "/student/tests/$matriculationNumber";

    http.Response response = await http.get(
      Uri.parse(url), 
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    ); 

    List<dynamic> data = json.decode(response.body);

    List<Test> finalList = [];

    for(var i = 0; i < data.length; i++){
      for(var j = 0; j < data[i]["TestInf"].length; j++){
        String classParam = data[i]["Class"] != "" ? " - ${data[i]["Class"]}" : "";
        String date = DateFormat("dd/MM/yyyy").format(
          DateTime.parse(data[i]["TestInf"][j]["Date"].toString())
        );

        finalList.add(Test(data[i]["TestInf"][j]["TestName"], data[i]["Acronym"] + classParam, date, data[i]["TestInf"][j]["Local"]));
      }
    }

    setState(() {
      allTests = finalList;
    });
  }

  @override
  void initState() {
    super.initState();

    matriculationNumber = widget.studentInfo["matriculationNumber"].toString();

    getTests();
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
        title: Text('Provas'),
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
                        child: Text('Avaliação', style: AppTextStyles.bodyBlue16, textAlign: TextAlign.center),
                      ),
                      Text('Turma', style: AppTextStyles.bodyBlue16, textAlign: TextAlign.center),
                      Text('Data', style: AppTextStyles.bodyBlue16, textAlign: TextAlign.center),
                    ]
                  ),
                  for(var i = 0; i < allTests?.length; i++)
                    TableRow(
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 5),
                          child: Text(
                            allTests[i].type, 
                            style: AppTextStyles.body, 
                            textAlign: TextAlign.center,
                          ),
                        ),
                        Text(
                          allTests[i].subject, 
                          style: AppTextStyles.body, 
                          textAlign: TextAlign.center,
                        ),
                        Text(
                          allTests[i].date, 
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
