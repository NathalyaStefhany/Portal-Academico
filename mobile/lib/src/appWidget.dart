import 'package:flutter/material.dart';
import 'package:mobile/src/views/academicCoefficientView.dart';
import 'package:mobile/src/views/frequencyView.dart';
import 'package:mobile/src/views/gradeView.dart';
import 'package:mobile/src/views/historicView.dart';
import 'package:mobile/src/views/home/homeView.dart';
import 'package:mobile/src/views/loginView.dart';

class AppWidget extends StatelessWidget{

  final String title;

  const AppWidget({Key key, this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Color(0xFF065CBE),
        fontFamily: 'Manrope'
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => LoginView(),
        '/home': (context) => HomeView(),
        '/grades': (context) => GradeView(),
        '/academicCoef': (context) => AcademicCoefficientView(),
        '/historic': (context) => HistoricView(),
        '/frequency': (context) => FrequencyView(),
      },
    );
  }
}