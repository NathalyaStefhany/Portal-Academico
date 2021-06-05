import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/src/components/numberTextField.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

import 'package:mobile/src/views/home/homeView.dart';

class LoginView extends StatefulWidget {
  @override
  _LoginViewState createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView>{
  String url = DotEnv().env['URL'] + "/login/student";
  StringBuffer matricula = new StringBuffer();
  StringBuffer senha = new StringBuffer();
  List cursos = [
    'Engenharia da Computação', 'Engenharia Biomédica', 'Engenharia de Automação'
  ];
  String curso;
  bool error = false;

  Map data;

  Future<bool> login() async {
    http.Response response = await http.post(
      Uri.parse(url), 
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: json.encode({
        "matriculationNumber": int.parse(matricula.toString()),
        "password": senha.toString()
      })
    ); 

    setState(() {
      data = json.decode(response.body);
    });

    if(data['matriculationNumber'] != null) return true;
    else{
      setState(() {
        error = true;
      });

      return false;
    }
  }

  Widget _loginBody(){
    return Container(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 30.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(height: MediaQuery.of(context).size.height * 0.1),
            DropdownButtonFormField(
              value: curso,
              onChanged: (value) {
                setState(() {
                  curso = value;
                });
              },
              items: cursos.map((c) {
                return DropdownMenuItem(
                  value: c,
                  child: Text(c),
                );
              }).toList(),
              decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                filled: true,
                fillColor: Colors.white,
                labelText: ' Curso ',
                labelStyle: AppTextStyles.body18
              ),
              style: AppTextStyles.body18,
              icon: Icon(Icons.keyboard_arrow_down_sharp),
            ),

            SizedBox(height: 40),
            NumberTextField('Matrícula', matricula, false),

            SizedBox(height: 40),
            NumberTextField('Senha', senha, true),

            SizedBox(height: 5),
            Container(
              child: Text(
                'Esqueceu a senha?',
                style: AppTextStyles.bodyBlue14,
              ),
              alignment: Alignment.bottomLeft,
            ),
            SizedBox(height: MediaQuery.of(context).size.height * 0.13),
          ],
        ),
      ),     
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.center,
                end: Alignment.bottomCenter,
                colors: [
                  Color(0xFF065CBE),
                  Colors.white
                ],
              )
            ),
          ),
          Container(
            width: MediaQuery.of(context).size.width,
            height: 500,
            child: Image.asset(
              'assets/images/Lines_Background.png',
              fit: BoxFit.fitWidth,
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 40, left: 40, right: 40),
            child: SafeArea(
              top: true,
              child: Column(
                children: [
                  Container(
                    child: Image.asset('assets/images/Inatel_Branco.png'),
                  ),
                  Container(
                    alignment: Alignment.center,
                    child: Text(
                      'Portal Acadêmico',
                      style: AppTextStyles.titleOrange,
                    )
                  ),
                ],
              ),
            ),
          ),
          Container(
            alignment: Alignment(-0.4, 0.4),
            padding: const EdgeInsets.symmetric(vertical: 30),
            child: SizedBox(
              height: 400,
              child: SingleChildScrollView(
                  child: _loginBody()
              ),
            ),
          ),
          Container(
            alignment: Alignment.bottomCenter,
            padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 30),
            child: ElevatedButton(
              child: Text(
                "Entrar".toUpperCase(),
                style: AppTextStyles.buttonWhite,
              ),
              style: ButtonStyle(
                  foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.orange),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                    RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15)),
                  ),
                  minimumSize: MaterialStateProperty.all<Size>(Size(400, 60))),
              onPressed: () async {
                if (await login()) {
                  Navigator.of(context).push(new MaterialPageRoute(
                    builder: (BuildContext context) => new HomeView(data: data)
                  ));
                }
              },
            ),
          ),
          SizedBox(height: 5),
          Container(
            child: error ? Text(
              'Usuário e/ou senha incorretos!',
              style: AppTextStyles.bodyRed14,
            ) : Text(''),
            alignment: Alignment.bottomCenter,
          ),
        ],
      )
    );
  }
}