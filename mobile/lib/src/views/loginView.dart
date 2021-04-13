import 'package:flutter/material.dart';
import 'package:mobile/src/components/numberTextField.dart';

class LoginView extends StatefulWidget {
  @override
  _LoginViewState createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView>{
  StringBuffer matricula = new StringBuffer();
  StringBuffer senha = new StringBuffer();
  List cursos = [
    'Engenharia da Computação', 'Engenharia Biomédica', 'Engenharia de Automação'
  ];
  String curso;

  Widget _loginBody(){
    return Container(
        child: SizedBox(
          width: MediaQuery.of(this.context).size.width ,
          height: MediaQuery.of(this.context).size.height,
          child: Padding(
            padding: const EdgeInsets.all(30.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(height: MediaQuery.of(context).size.height/2.5),
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
                      borderRadius: BorderRadius.circular(8)
                    ),
                    filled: true,
                    fillColor: Colors.white,
                    labelText: ' Curso ',
                    labelStyle: TextStyle(
                      fontSize: 23,
                      backgroundColor: Colors.white,
                      color: Color(0xFF065CBE),
                    ),
                  ),
                  style: TextStyle(
                      fontSize: 20,
                      color: Colors.black
                    ),
                  icon: Icon(Icons.keyboard_arrow_down_sharp),
                ),

                SizedBox(height: 45),
                NumberTextField('Matrícula', matricula, false),

                SizedBox(height: 45),
                NumberTextField('Senha', senha, true),
                Container(
                  child: Text(
                    'Esqueceu a senha?',
                    style: TextStyle(
                      color: Color(0xFF065CBE),
                      height: 2,                     
                    ),
                  ),
                  alignment: Alignment.bottomLeft,
                ),

                SizedBox(height: 40),
                ElevatedButton(
                  child: Text(
                    "Entrar".toUpperCase(),
                    style: TextStyle(fontSize: 20)
                  ),

                  style: ButtonStyle(
                    foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
                    backgroundColor: MaterialStateProperty.all<Color>(Colors.orange),
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15)
                      ),
                    ),
                    minimumSize: MaterialStateProperty.all<Size>(Size(400, 60))
                  ),
                  
                  onPressed: () {
                    if (matricula.toString() == '123' && senha.toString() == '123') {
                      Navigator.of(context).pushReplacementNamed('/home');
                    }
                  },
                ),
              ],
            ),
          ),
        ),
      );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
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
            margin: EdgeInsets.zero,
            width: MediaQuery.of(context).size.width,
            height: 500,
            child: Image.asset(
              'assets/images/Lines_Background.png',
              fit: BoxFit.fitWidth,
            ),
          ),
          Container(
            height: MediaQuery.of(context).size.height - 500,
            child: Image.asset('assets/images/Inatel_Branco.png'),
            margin: EdgeInsetsDirectional.only(start: 40, end: 40),
          ),
          Container(
            height: MediaQuery.of(context).size.height - 350,
            alignment: Alignment.center,
            child: Text(
              'Portal Acadêmico',
              style: TextStyle(
                color: Colors.orange,
                fontSize: 28,
                fontWeight: FontWeight.bold
              ),
            )
          ),
          Container(
            child: SingleChildScrollView(
              child: _loginBody()
            ),
          ),
        ],
      )
    );
  }
}


