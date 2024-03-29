import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/menuView.dart';
import 'package:http/http.dart' as http;
import 'package:open_file/open_file.dart';
import 'package:path_provider/path_provider.dart';

class Material {
  final String acronym;
  final String title;
  final String docId;

  Material(this.acronym, this.title, this.docId);
}

class ClassMaterialView extends StatefulWidget {
  final Map<dynamic, dynamic> studentInfo;

  ClassMaterialView({this.studentInfo});

  @override
  _ClassMaterialViewState createState() => _ClassMaterialViewState();
}

class _ClassMaterialViewState extends State<ClassMaterialView> {
  List<Material> material = [];
  List subjects = [];
  String subject = "";
  String matriculationNumber;

  listSubjects() async {
    String url = DotEnv().env['URL'] + "/student/classes/$matriculationNumber";
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

  listMaterial(String subject) async {
    String url;

    if (!subject.contains('-')) {
      url = DotEnv().env['URL'] + '/class/listFiles/$subject/""';
    } else {
      var fullSubject = subject.split("-");
      String acronym = fullSubject[0].trim();
      String classValue = fullSubject[1].trim();
      url = DotEnv().env['URL'] + '/class/listFiles/$acronym/$classValue';
    }

    http.Response response = await http.get(
      Uri.parse(url),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    List result = await json.decode(response.body);
    List<Material> materialsOfGet = [];

    result.forEach((mat) {
      materialsOfGet.add(new Material(subject, mat["Description"], mat["_id"]));
    });

    setState(() {
      material = materialsOfGet;
    });
  }

  downloadFile(String subject, String docId) async {
    String url;

    if (!subject.contains('-')) {
      url = DotEnv().env['URL'] + '/class/download/$subject/""/$docId';
    } else {
      var fullSubject = subject.split("-");
      String acronym = fullSubject[0].trim();
      String classValue = fullSubject[1].trim();
      url = DotEnv().env['URL'] + '/class/download/$acronym/$classValue/$docId';
    }

    http.Response response = await http.get(
      Uri.parse(url),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    var result = await json.decode(response.body);
    print(result[0]["Description"]);

    var bytes = base64Decode(result[0]["Content"]);
    final output = await getTemporaryDirectory();
    final file = File("${output.path}/${result[0]["Description"]}");
    await file.writeAsBytes(bytes.buffer.asUint8List());

    print("${output.path}/${result[0]["Description"]}");
    await OpenFile.open("${output.path}/${result[0]["Description"]}");
  }

  void asyncInit() async {
    await listSubjects();
    await listMaterial(subject);
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
                      listMaterial(subject);
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
                                    downloadFile(material[i].acronym, material[i].docId);
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: Text("Download iniciado..."),
                                        backgroundColor: Colors.blue[900],
                                        elevation: 100.0,
                                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(80)),
                                        behavior: SnackBarBehavior.floating,
                                        duration: Duration(seconds: 2),

                                      )
                                    );
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
