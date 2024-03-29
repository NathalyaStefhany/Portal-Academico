import 'package:flutter/material.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/academicCoefficientView.dart';
import 'package:mobile/src/views/classMaterialView.dart';
import 'package:mobile/src/views/frequencyView.dart';
import 'package:mobile/src/views/gradeView.dart';
import 'package:mobile/src/views/historicView.dart';
import 'package:mobile/src/views/home/homeView.dart';
import 'package:mobile/src/views/openingHoursView.dart';
import 'package:mobile/src/views/replacementView.dart';
import 'package:mobile/src/views/testsView.dart';

class MenuView extends StatelessWidget {
  final Map<dynamic, dynamic> studentInfo;

  MenuView({this.studentInfo});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          SizedBox(height: 20),
          ListTile(
            leading: Icon(Icons.home),
            title: Text('Início', style: AppTextStyles.bodyBold),
            onTap: (){
              Navigator.of(context).push(new MaterialPageRoute(
                builder: (BuildContext context) => new HomeView(studentInfo: studentInfo)
              ));
            },
          ),
          ListTile(
            title: Text('SERVIÇO ACADÊMICO', style: AppTextStyles.bodyGray14,)
          ),
          ListTile(
            leading: Icon(Icons.folder_open),
            title: Text('Material de Aula', style: AppTextStyles.bodyBold),
            onTap: (){
              Navigator.of(context).push(new MaterialPageRoute(
                builder: (BuildContext context) => new ClassMaterialView(studentInfo: studentInfo)
              ));
            },
          ),
          ListTile(
            leading: Icon(Icons.assessment_outlined),
            title: Text('Notas', style: AppTextStyles.bodyBold),
            onTap: (){
              Navigator.of(context).push(new MaterialPageRoute(
                builder: (BuildContext context) => new GradeView(studentInfo: studentInfo)
              ));
            },
          ),
          ListTile(
            leading: Icon(Icons.date_range),
            title: Text('Frequência', style: AppTextStyles.bodyBold),
            onTap: (){
              Navigator.of(context).push(new MaterialPageRoute(
                builder: (BuildContext context) => new FrequencyView(studentInfo: studentInfo)
              ));
            },
          ),
          ListTile(
            leading: Icon(Icons.school_outlined),
            title: Text('Histórico', style: AppTextStyles.bodyBold),
            onTap: (){
              Navigator.of(context).push(new MaterialPageRoute(
                builder: (BuildContext context) => new HistoricView(studentInfo: studentInfo)
              ));
            },
          ),
          ListTile(
            leading: Icon(Icons.bar_chart_sharp),
            title: Text('Coeficiente Acadêmico', style: AppTextStyles.bodyBold),
            onTap: (){
              Navigator.of(context).push(new MaterialPageRoute(
                builder: (BuildContext context) => new AcademicCoefficientView(studentInfo: studentInfo)
              ));
            },
          ),
          ListTile(
            title: Text('CALENDÁRIO E HORÁRIOS', style: AppTextStyles.bodyGray14,)
          ),
          ListTile(
            leading: Icon(Icons.access_time),
            title: Text('Horário de Atendimento', style: AppTextStyles.bodyBold),
            onTap: (){
              Navigator.of(context).push(new MaterialPageRoute(
                builder: (BuildContext context) => new OpeningHoursView(studentInfo: studentInfo)
              ));
            },
          ),
          ListTile(
            leading: Icon(Icons.text_snippet_outlined),
            title: Text('Provas', style: AppTextStyles.bodyBold),
            onTap: (){
              Navigator.of(context).push(new MaterialPageRoute(
                builder: (BuildContext context) => new TestsView(studentInfo: studentInfo)
              ));
            },
          ),
          ListTile(
            leading: Icon(Icons.event),
            title: Text('Reposição de Aula', style: AppTextStyles.bodyBold),
            onTap: (){
              Navigator.of(context).push(new MaterialPageRoute(
                builder: (BuildContext context) => new ReplacementView(studentInfo: studentInfo)
              ));
            },
          ),
        ],
      ),
    );
  }
}