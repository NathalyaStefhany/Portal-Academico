import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';
import 'package:http/http.dart' as http;

class Material {
  final String acronym;
  final String title;

  Material(this.acronym, this.title);
}

class ClassMaterialView extends StatefulWidget {
  final Map<dynamic, dynamic> data;

  ClassMaterialView({this.data});

  @override
  _ClassMaterialViewState createState() => _ClassMaterialViewState();
}

class _ClassMaterialViewState extends State<ClassMaterialView> {
  final List<Material> material = [
    Material('C213', 'Aula 1 - Introdução aos Sistemas de Controle.pdf'),
    Material('C317', 'Aula 1 - Milestone 1 Planejamento.docx')
  ];

  List subjects = [];

  String subject = "";

  Future<void> listSubjects() async {
    String url = DotEnv().env['URL'] + "/student/classes/1420";
    http.Response response = await http.get(
      Uri.parse(url),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    List result = await json.decode(response.body);
    List subjectsOfGet = [];
    result.forEach((acronym) {
      subjectsOfGet.add(acronym["Acronym"].toString());
    });

    setState(() {
      subjects = subjectsOfGet;
      subject = subjectsOfGet[0];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: MenuView(),
        appBar: AppBar(
          leading: Builder(
              builder: (context) => IconButton(
                  icon: Icon(Icons.menu),
                  onPressed: () {
                    Scaffold.of(context).openDrawer();
                  })),
          title: Text('Material de Aula'),
          backgroundColor: AppColors.blue,
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                DropdownButtonFormField(
                  value: subject,
                  items: subjects.map((value) {
                    return DropdownMenuItem(value: value, child: Text(value));
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      subject = value;
                    });
                  },
                  focusColor: AppColors.green,
                  style: AppTextStyles.body,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    filled: true,
                    fillColor: Colors.white,
                    labelText: ' Disciplina ',
                    labelStyle: AppTextStyles.bodyBlue16,
                  ),
                  icon: Icon(Icons.keyboard_arrow_down_sharp),
                  autofocus: true,
                ),
                SizedBox(height: 16),
                Container(
                  decoration: BoxDecoration(
                    color: AppColors.white,
                    border: Border.fromBorderSide(
                        BorderSide(color: AppColors.darkBlue, width: 2)),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Table(
                    defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                    columnWidths: {
                      0: FlexColumnWidth(1),
                      1: FlexColumnWidth(3),
                      2: FlexColumnWidth(0.6),
                    },
                    children: [
                      TableRow(
                          decoration: BoxDecoration(
                              border: Border(
                                  bottom: BorderSide(
                                      color: AppColors.darkBlue, width: 2))),
                          children: [
                            Padding(
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              child: Text('Sigla',
                                  style: AppTextStyles.bodyBlue16,
                                  textAlign: TextAlign.center),
                            ),
                            Text('Título',
                                style: AppTextStyles.bodyBlue16,
                                textAlign: TextAlign.center),
                            Text('',
                                style: AppTextStyles.bodyBlue16,
                                textAlign: TextAlign.center)
                          ]),
                      for (var i = 0; i < material.length; i++)
                        TableRow(
                            decoration: BoxDecoration(
                                border: Border(
                                    bottom: BorderSide(
                                        color: AppColors.mediumBlue,
                                        width: 1,
                                        style: i != material.length - 1
                                            ? BorderStyle.solid
                                            : BorderStyle.none))),
                            children: [
                              Padding(
                                padding: const EdgeInsets.symmetric(
                                    vertical: 8, horizontal: 2),
                                child: Text(material[i].acronym,
                                    style: AppTextStyles.body,
                                    textAlign: TextAlign.center),
                              ),
                              Text(
                                material[i].title,
                                style: AppTextStyles.body14,
                                textAlign: TextAlign.start,
                              ),
                              IconButton(
                                  icon: Icon(
                                    Icons.file_download,
                                    color: AppColors.darkBlue,
                                  ),
                                  onPressed: () {
                                    listSubjects();
                                  })
                            ])
                    ],
                  ),
                )
              ],
            ),
          ),
        ));
  }
}
