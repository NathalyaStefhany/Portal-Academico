import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:http/http.dart' as http;

class Schedule {
  String horario;
  String seg;
  String ter;
  String qua;
  String qui;
  String sex;
  String sab;

  Schedule(
      this.horario, this.seg, this.ter, this.qua, this.qui, this.sex, this.sab);
}

class OpenSchedule extends StatefulWidget {
  final Map<dynamic, dynamic> studentInfo;

  OpenSchedule({this.studentInfo});

  @override
  _OpenScheduleViewState createState() => _OpenScheduleViewState();
}

class _OpenScheduleViewState extends State<OpenSchedule> {
  String matriculationNumber;
  String link;
  List<Schedule> schedule = [
    Schedule('08:00', '', '', '', '', '', ''),
    Schedule('08:50', '', '', '', '', '', ''),
    Schedule('10:00', '', '', '', '', '', ''),
    Schedule('10:50', '', '', '', '', '', ''),
    Schedule('13:30', '', '', '', '', '', ''),
    Schedule('14:20', '', '', '', '', '', ''),
    Schedule('15:30', '', '', '', '', '', ''),
    Schedule('18:20', '', '', '', '', '', ''),
    Schedule('19:30', '', '', '', '', '', ''),
    Schedule('20:20', '', '', '', '', '', ''),
    Schedule('21:30', '', '', '', '', '', ''),
    Schedule('22:20', '', '', '', '', '', ''),
  ];

  getFrequency() async {
    String url =
        DotEnv().env['URL'] + "/student/openingHours/$matriculationNumber";
    http.Response response = await http.get(
      Uri.parse(url),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    List result = await json.decode(response.body);

    List<Schedule> partialSchedule = [
      Schedule('08:00', '', '', '', '', '', ''),
      Schedule('08:50', '', '', '', '', '', ''),
      Schedule('10:00', '', '', '', '', '', ''),
      Schedule('10:50', '', '', '', '', '', ''),
      Schedule('13:30', '', '', '', '', '', ''),
      Schedule('14:20', '', '', '', '', '', ''),
      Schedule('15:30', '', '', '', '', '', ''),
      Schedule('16:20', '', '', '', '', '', ''),
      Schedule('17:30', '', '', '', '', '', ''),
      Schedule('18:20', '', '', '', '', '', ''),
      Schedule('19:30', '', '', '', '', '', ''),
      Schedule('20:20', '', '', '', '', '', ''),
      Schedule('21:30', '', '', '', '', '', ''),
      Schedule('22:20', '', '', '', '', '', ''),
    ];
    List<String> times = [
      "08:00",
      "08:50",
      "10:00",
      "10:50",
      "13:30",
      "14:20",
      "15:30",
      "16:20",
      "17:30",
      "18:20",
      "19:30",
      "20:20",
      "21:30",
      "22:20"
    ];

    int i = 0;
    times.forEach((t) {
      result.forEach((subject) {
        String acronym;

        subject["Class"].toString().isEmpty
            ? acronym = subject["Acronym"]
            : acronym = '${subject["Acronym"]}- ${subject["Class"]}';

        subject["ClassDates"].forEach((classDate) {
          if (classDate["Weekday"] == "Segunda" && classDate["Time"] == t)
            partialSchedule[i].seg = acronym;

          if (classDate["Weekday"] == "Terça" && classDate["Time"] == t)
            partialSchedule[i].ter = acronym;

          if (classDate["Weekday"] == "Quarta" && classDate["Time"] == t)
            partialSchedule[i].qua = acronym;

          if (classDate["Weekday"] == "Quinta" && classDate["Time"] == t)
            partialSchedule[i].qui = acronym;

          if (classDate["Weekday"] == "Sexta" && classDate["Time"] == t)
            partialSchedule[i].sex = acronym;

          if (classDate["Weekday"] == "Sabado" && classDate["Time"] == t)
            partialSchedule[i].sab = acronym;
        });
      });
      i++;
    });

    setState(() {
      schedule = partialSchedule;
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
    return Container(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 5),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.fromBorderSide(
                      BorderSide(color: AppColors.darkBlue)),
                ),
                child: Table(
                  defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                  children: [
                    TableRow(
                        decoration: BoxDecoration(
                            color: AppColors.darkBlue,
                            borderRadius: BorderRadius.only(
                                topRight: Radius.circular(9),
                                topLeft: Radius.circular(9))),
                        children: [
                          Text('   '),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('SEG',
                                textAlign: TextAlign.center,
                                style: AppTextStyles.bodyWhiteBold),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('TER',
                                textAlign: TextAlign.center,
                                style: AppTextStyles.bodyWhiteBold),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('QUA',
                                textAlign: TextAlign.center,
                                style: AppTextStyles.bodyWhiteBold),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('QUI',
                                textAlign: TextAlign.center,
                                style: AppTextStyles.bodyWhiteBold),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('SEX',
                                textAlign: TextAlign.center,
                                style: AppTextStyles.bodyWhiteBold),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('SAB',
                                textAlign: TextAlign.center,
                                style: AppTextStyles.bodyWhiteBold),
                          ),
                        ]),
                    for (var i = 0; i < schedule.length; i++)
                      TableRow(
                          decoration: BoxDecoration(
                            color: i % 2 != 0
                                ? AppColors.lightBlue
                                : AppColors.white,
                          ),
                          children: [
                            Padding(
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              child: Text(schedule[i].horario,
                                  textAlign: TextAlign.center,
                                  style: AppTextStyles.bodyBold),
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 2, vertical: 8),
                              child: Text(schedule[i].seg,
                                  textAlign: TextAlign.center,
                                  style: AppTextStyles.body14),
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 2, vertical: 8),
                              child: Text(schedule[i].ter,
                                  textAlign: TextAlign.center,
                                  style: AppTextStyles.body14),
                            ),
                            Padding(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 2, vertical: 8),
                                child: Text(schedule[i].qua,
                                    textAlign: TextAlign.center,
                                    style: AppTextStyles.body14)),
                            Padding(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 2, vertical: 8),
                                child: Text(schedule[i].qui,
                                    textAlign: TextAlign.center,
                                    style: AppTextStyles.body14)),
                            Padding(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 2, vertical: 8),
                                child: Text(schedule[i].sex,
                                    textAlign: TextAlign.center,
                                    style: AppTextStyles.body14)),
                            Padding(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 2, vertical: 8),
                                child: Text(schedule[i].sab,
                                    textAlign: TextAlign.center,
                                    style: AppTextStyles.body14)),
                          ])
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
