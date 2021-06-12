import 'package:flutter/material.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/views/home/widgets/openingSchedule.dart';
import 'package:mobile/src/views/menuView.dart';


class OpeningHoursView extends StatefulWidget {
  final Map<dynamic, dynamic> studentInfo;

  OpeningHoursView({this.studentInfo});

  @override
  OpeningHoursViewState createState() => OpeningHoursViewState();
}
class OpeningHoursViewState extends State<OpeningHoursView> {
  
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
        title: Text('Horários de Atendimento'),
        backgroundColor: AppColors.blue,
      ),
      body: SingleChildScrollView(
        child: Container(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 5),
            child: OpenSchedule(studentInfo: widget.studentInfo)
          ),
        ),
      )
    );
  }
}