import 'package:flutter/material.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/home/widgets/classSchedule.dart';
import 'package:mobile/src/views/home/widgets/studentInfo.dart';

class HomeView extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return HomeViewState();
  }
}

class HomeViewState extends State<HomeView> {
  int counter = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: new Drawer(
        child: ListView(
          children: [
            SizedBox(height: 20),
            ListTile(
              leading: Icon(Icons.home),
              title: Text('Início', style: AppTextStyles.bodyBold),
              onTap: (){
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: Text('SERVIÇO ACADÊMICO', style: AppTextStyles.bodyGray14,)
            ),
            ListTile(
              leading: Icon(Icons.folder_open),
              title: Text('Material de Aula', style: AppTextStyles.bodyBold),
            ),
            ListTile(
              leading: Icon(Icons.assessment_outlined),
              title: Text('Notas', style: AppTextStyles.bodyBold),
            ),
            ListTile(
              leading: Icon(Icons.date_range),
              title: Text('Frequência', style: AppTextStyles.bodyBold),
            ),
            ListTile(
              leading: Icon(Icons.school_outlined),
              title: Text('Histórico', style: AppTextStyles.bodyBold),
            ),
            ListTile(
              leading: Icon(Icons.folder),
              title: Text('Coeficiente Acadêmico', style: AppTextStyles.bodyBold),
            ),
            ListTile(
              title: Text('CALENDÁRIO E HORÁRIOS', style: AppTextStyles.bodyGray14,)
            ),
            ListTile(
              leading: Icon(Icons.folder),
              title: Text('Horários do Semestre', style: AppTextStyles.bodyBold),
            ),
            ListTile(
              leading: Icon(Icons.access_time),
              title: Text('Horário de Atendimento', style: AppTextStyles.bodyBold),
            ),
            ListTile(
              leading: Icon(Icons.folder),
              title: Text('Provas', style: AppTextStyles.bodyBold),
            ),
            ListTile(
              leading: Icon(Icons.folder),
              title: Text('Reposição de Aula', style: AppTextStyles.bodyBold),
            ),
          ],
        ),
      ),
      appBar: AppBar(
        leading: Builder(
          builder: (context) => IconButton(
            icon: Icon(Icons.menu), 
            onPressed: (){
              Scaffold.of(context).openDrawer();
            }
          )
        ),
        title: Text('Início'),
        backgroundColor: AppColors.blue,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: 16),
            Container(
                child: StudentInfo(),
            ),
            Container(
              child: ClassSchedule(),
            )
          ],
        ),
      )
    );
  }
}
