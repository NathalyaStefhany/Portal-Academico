import 'package:flutter/material.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/views/home/widgets/classSchedule.dart';
import 'package:mobile/src/views/home/widgets/studentInfo.dart';
import 'package:mobile/src/views/menuView.dart';

class HomeView extends StatefulWidget {
  final Map<dynamic, dynamic> studentInfo;

  HomeView({this.studentInfo});

  @override
  HomeViewState createState() => HomeViewState();
}

class HomeViewState extends State<HomeView> {
  int counter = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: MenuView(studentInfo: widget.studentInfo),
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
                child: StudentInfo(studentInfo: widget.studentInfo),
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
