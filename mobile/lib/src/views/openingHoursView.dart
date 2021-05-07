import 'package:flutter/material.dart';
import 'package:mobile/src/core/appColors.dart';
import 'package:mobile/src/core/appTextStyles.dart';
import 'package:mobile/src/views/home/widgets/classSchedule.dart';
import 'package:mobile/src/views/menuView.dart';

class OpeningHoursView extends StatelessWidget {
  final List<Schedule> schedule = [
    Schedule('08:00', 'C213', 'C214', 'M210', 'C213 L1', '', ''),
    Schedule('08:50', 'C213', 'C214', 'M210', 'C213 L1', '', ''),
    Schedule('10:00', '', 'C115 L2', 'C214', 'T106 L1', 'F005', ''),
    Schedule('10:50', '', 'C115 L2', 'C214', 'T106 L1', 'F005', ''),
    Schedule('13:30', '', '', '', '', '', '' ),
    Schedule('14:20', '', '', '', '', '', ''),
    Schedule('15:30', '', '', '', '', '', ''),
    Schedule('18:20', '', '', '', '', '', ''),
    Schedule('19:30', '', '', '', '', '', ''),
    Schedule('20:20', '', '', '', '', '', ''),
    Schedule('21:30', '', '', '', '', '', ''),
    Schedule('22:20', '', '', '', '', '', ''),
  ];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: MenuView(),
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
            padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 5),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    border: Border.fromBorderSide(BorderSide(color: AppColors.darkBlue)),
                  ),
                  child: Table(
                    defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                    children: [
                      TableRow(
                        decoration: BoxDecoration(
                          color: AppColors.darkBlue, 
                          borderRadius: BorderRadius.only(
                            topRight: Radius.circular(9), 
                            topLeft: Radius.circular(9)
                          )
                        ),
                        children: [
                          Text('   '),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('SEG', textAlign: TextAlign.center, style: AppTextStyles.bodyWhiteBold),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('TER', textAlign: TextAlign.center, style: AppTextStyles.bodyWhiteBold),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('QUA', textAlign: TextAlign.center, style: AppTextStyles.bodyWhiteBold),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('QUI', textAlign: TextAlign.center, style: AppTextStyles.bodyWhiteBold),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('SEX', textAlign: TextAlign.center, style: AppTextStyles.bodyWhiteBold),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: Text('SAB', textAlign: TextAlign.center, style: AppTextStyles.bodyWhiteBold),
                          ),
                        ]
                      ),
                      for(var i = 0; i < schedule.length; i++)
                        TableRow(
                          decoration: BoxDecoration(
                            color: i % 2 != 0 ? AppColors.lightBlue : AppColors.white,
                          ),
                          children: [
                            Padding(
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              child: Text(
                                schedule[i].horario, 
                                textAlign: TextAlign.center, 
                                style: AppTextStyles.bodyBold
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 8),
                              child: Text(
                                schedule[i].seg, 
                                textAlign: TextAlign.center, 
                                style: AppTextStyles.body14
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 2,vertical: 8),
                              child: Text(
                                schedule[i].ter, 
                                textAlign: TextAlign.center, 
                                style: AppTextStyles.body14
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 8),
                              child: Text(
                                schedule[i].qua, 
                                textAlign: TextAlign.center, 
                                style: AppTextStyles.body14
                              )
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 8),
                              child: Text(
                                schedule[i].qui, 
                                textAlign: TextAlign.center, 
                                style: AppTextStyles.body14
                              )
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 8),
                              child: Text(
                                schedule[i].sex, 
                                textAlign: TextAlign.center, 
                                style: AppTextStyles.body14
                              )
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 8),
                              child: Text(
                                schedule[i].sab, 
                                textAlign: TextAlign.center, 
                                style: AppTextStyles.body14
                              )
                            ),
                          ]
                        )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      )
    );
  }
}