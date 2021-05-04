import 'package:flutter/material.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';

class StudentInfo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 150,
      decoration: BoxDecoration(
        color: AppColors.blue,
        borderRadius: BorderRadius.all(Radius.circular(20)),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 10,
            blurRadius: 7,
            offset: Offset(0, 3), // changes position of shadow
          ),
        ],
      ),
      margin: EdgeInsets.all(5),
      child: Stack(children: [
        FittedBox(
            fit: BoxFit.contain,
            alignment: Alignment.center,
            child: Opacity(
              opacity: 0.1,
              child: Container(
                child: Image.asset('assets/images/Inatel_Branco.png'),
                margin: EdgeInsets.fromLTRB(100, 200, 300, 10),
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: Color(0xFF065CBE),
                ),
              ),
            )),
        Row(
          children: [
            Expanded(
              flex: 2,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: EdgeInsets.fromLTRB(20, 20, 10, 20),
                    child: Text(
                      'Olá, João!',
                      textAlign: TextAlign.left,
                      style: AppTextStyles.titleWhite
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.fromLTRB(20, 0, 10, 10),
                    child: Text(
                      'Matricula: 1234', 
                      textAlign: TextAlign.left,
                      style: AppTextStyles.bodyWhite
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.fromLTRB(20, 0, 10, 5),
                    child: Text(
                      'joaosilva@gec.inatel.br',
                      textAlign: TextAlign.left,
                      style: AppTextStyles.bodyWhite,
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              flex: 1,
              child: FittedBox(
                fit: BoxFit.contain,
                alignment: Alignment.topRight,
                child: Container(
                  child: Image.asset('assets/images/reading_book.png'),
                  margin: EdgeInsets.fromLTRB(50, 80, 100, 200),
                )
              )
            )
          ],
        ),
      ]
    )
    );
  }
}