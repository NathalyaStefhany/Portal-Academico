import 'package:flutter/material.dart';
import 'package:mobile/src/views/homeView.dart';
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
      },
    );
  }
}