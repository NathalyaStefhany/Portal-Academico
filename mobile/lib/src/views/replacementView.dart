import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

class Replacement {
  final String subject;
  final String date;

  Replacement(this.subject, this.date);
}

class ReplacementView extends StatefulWidget {
  final Map<dynamic, dynamic> studentInfo;

  ReplacementView({this.studentInfo});

  @override
  _ReplacementViewState createState() => _ReplacementViewState();
}

class _ReplacementViewState extends State<ReplacementView> {
  List<Replacement> replacements = [];
  String matriculationNumber;

  getReplacements() async {
    String url =
        DotEnv().env['URL'] + "/student/replacements/$matriculationNumber";
    http.Response response = await http.get(
      Uri.parse(url),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    List result = await json.decode(response.body);
    List<Replacement> replacementsOfGet = [];

    result.forEach((rep) {
      String acronym;

      rep["Class"].toString().isEmpty
          ? acronym = rep["Acronym"]
          : acronym = '${rep["Acronym"]} - ${rep["Class"]}';

      String date = DateFormat("dd/MM/yyyy").format(DateTime.parse(rep["Date"].toString()));

      replacementsOfGet.add(new Replacement(acronym, date));
      
    });

    setState(() {
      replacements = replacementsOfGet;
    });
  }

  void asyncInit() async {
    await getReplacements();
  }

  @override
  void initState() {
    super.initState();

    matriculationNumber = widget.studentInfo["matriculationNumber"].toString();
    asyncInit();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: MenuView(studentInfo: widget.studentInfo),
        appBar: AppBar(
          leading: Builder(
              builder: (context) => IconButton(
                  icon: Icon(Icons.menu),
                  onPressed: () {
                    Scaffold.of(context).openDrawer();
                  })),
          title: Text('Reposições'),
          backgroundColor: AppColors.blue,
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.white,
                border: Border.fromBorderSide(
                    BorderSide(color: AppColors.darkBlue, width: 2)),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Table(
                border: TableBorder.all(color: AppColors.mediumBlue, width: 1),
                defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                children: [
                  TableRow(
                      decoration: BoxDecoration(
                          border: Border(
                              bottom: BorderSide(
                                  color: AppColors.darkBlue, width: 2))),
                      children: [
                        Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('Turma',
                                style: AppTextStyles.bodyBlue16,
                                textAlign: TextAlign.center)),
                        Text('Data',
                            style: AppTextStyles.bodyBlue16,
                            textAlign: TextAlign.center),
                      ]),
                  for (var i = 0; i < replacements.length; i++)
                    TableRow(children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 5),
                        child: Text(
                          replacements[i].subject,
                          style: AppTextStyles.body,
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Text(
                        replacements[i].date,
                        style: AppTextStyles.body,
                        textAlign: TextAlign.center,
                      ),
                    ])
                ],
              ),
            ),
          ),
        ));
  }
}
