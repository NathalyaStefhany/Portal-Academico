import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'src/appWidget.dart';

main() async {
  await DotEnv().load('.env');
  runApp(AppWidget());
}