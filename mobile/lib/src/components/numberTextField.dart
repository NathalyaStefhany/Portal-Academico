import 'package:flutter/material.dart';

// ignore: must_be_immutable
class NumberTextField extends StatelessWidget{
  String labelText;
  StringBuffer input;
  bool obscureText;

  NumberTextField(String labelText, StringBuffer input, bool obscureText){
    this.labelText = labelText;
    this.input = input;
    this.obscureText = obscureText;

  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      keyboardType: TextInputType.number,
      decoration: InputDecoration(
        labelText: labelText,
        labelStyle: TextStyle(
          fontSize: 23
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8)
        ),
        filled: true,
        fillColor: Colors.white
      ),
      obscureText: obscureText,
      onChanged: (value) {
        input.clear();
        input.write(value);
      },
    ); 
  }
  
}