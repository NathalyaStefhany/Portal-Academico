import 'dart:convert';
import 'dart:ui';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';

class Subject {
  final String acronym;
  final String classAcronym;
  final int absences;
  final int classesTaught;
  final int limit;

  Subject(this.acronym, this.classAcronym, this.absences, this.classesTaught,
      this.limit);
}

class FrequencyView extends StatefulWidget {
  final Map<dynamic, dynamic> studentInfo;

  FrequencyView({this.studentInfo});

  @override
  _FrequencyViewState createState() => _FrequencyViewState();
}

class _FrequencyViewState extends State<FrequencyView> {
  List<Subject> frequency = [];
  String matriculationNumber;

  getFrequency() async {
    String url =
        DotEnv().env['URL'] + "/student/frequency/$matriculationNumber";
    http.Response response = await http.get(
      Uri.parse(url),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    List result = await json.decode(response.body);
    List<Subject> frequencyOfGet = [];
    result.forEach((sub) {
      frequencyOfGet.add(new Subject(sub["Acronym"], sub["Class"],
          sub["Absences"], sub["ClassesTaught"], sub["Limit"]));
    });

    setState(() {
      frequency = frequencyOfGet;
    });
  }

  void asyncInit() async {
    await getFrequency();
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
          title: Text('Frequência'),
          backgroundColor: AppColors.blue,
        ),
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: ListView(
            children: [
              for (var i = 0; i < frequency.length; i++)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  child: Container(
                    decoration: BoxDecoration(
                        color: AppColors.white,
                        border: Border.fromBorderSide(
                            BorderSide(color: AppColors.darkBlue, width: 2)),
                        borderRadius: BorderRadius.circular(10),
                        boxShadow: [
                          BoxShadow(
                            color: AppColors.gray.withOpacity(0.5),
                            spreadRadius: 1,
                            blurRadius: 4,
                            offset: Offset(0, 4),
                          )
                        ]),
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8),
                          child: Text(
                            frequency[i].classAcronym.isNotEmpty
                                ? '${frequency[i].acronym} - ${frequency[i].classAcronym}'
                                : '${frequency[i].acronym}',
                            style: AppTextStyles.bodyBold,
                            textAlign: TextAlign.center,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 16, vertical: 8),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                'Limite Previsto: ',
                                style: AppTextStyles.bodyBlue14,
                              ),
                              Text((frequency[i].limit).toInt().toString())
                            ],
                          ),
                        ),
                        Table(
                          border: TableBorder.all(
                              color: AppColors.mediumBlue, width: 1),
                          defaultVerticalAlignment:
                              TableCellVerticalAlignment.middle,
                          children: [
                            TableRow(children: [
                              Padding(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 8),
                                child: Text('Aulas Ministradas',
                                    style: AppTextStyles.bodyBlue16,
                                    textAlign: TextAlign.center),
                              ),
                              Text('Faltas',
                                  style: AppTextStyles.bodyBlue16,
                                  textAlign: TextAlign.center)
                            ]),
                            TableRow(children: [
                              Padding(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 5),
                                child: Text(
                                  (frequency[i].classesTaught).toString(),
                                  style: AppTextStyles.body,
                                  textAlign: TextAlign.center,
                                ),
                              ),
                              Text(
                                (frequency[i].absences).toString(),
                                style: AppTextStyles.body,
                                textAlign: TextAlign.center,
                              ),
                            ])
                          ],
                        ),
                      ],
                    ),
                  ),
                )
            ],
          ),
        ));
  }
}
