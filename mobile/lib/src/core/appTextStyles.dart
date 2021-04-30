import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'appColors.dart';

class AppTextStyles {
  static final TextStyle title = GoogleFonts.manrope(
    color: AppColors.text,
    fontSize: 30,
    fontWeight: FontWeight.w600,
  );

  static final TextStyle titleWhite = GoogleFonts.manrope(
    color: AppColors.white,
    fontSize: 30,
    fontWeight: FontWeight.w600,
  );

  static final TextStyle titleOrange = GoogleFonts.manrope(
    color: AppColors.orange,
    fontSize: 30,
    fontWeight: FontWeight.bold,
  );

  static final TextStyle titleBold = GoogleFonts.manrope(
    color: AppColors.text,
    fontSize: 20,
    fontWeight: FontWeight.bold,
  );

  static final TextStyle heading = GoogleFonts.manrope(
    color: AppColors.text,
    fontSize: 26,
    fontWeight: FontWeight.bold,
  );

  static final TextStyle body = GoogleFonts.manrope(
    color: AppColors.text,
    fontSize: 16,
    fontWeight: FontWeight.normal,
  );

  static final TextStyle bodyWhite = GoogleFonts.manrope(
    color: AppColors.white,
    fontSize: 16,
    fontWeight: FontWeight.normal,
  );

  static final TextStyle bodyBold = GoogleFonts.manrope(
    color: AppColors.text,
    fontSize: 16,
    fontWeight: FontWeight.w600,
  );

  static final TextStyle bodyWhiteBold = GoogleFonts.manrope(
    color: AppColors.white,
    fontSize: 16,
    fontWeight: FontWeight.w600,
  );

  static final TextStyle body14 = GoogleFonts.manrope(
    color: AppColors.text,
    fontSize: 14,
    fontWeight: FontWeight.normal,
  );

  static final TextStyle body18 = GoogleFonts.manrope(
    color: AppColors.text,
    fontSize: 18,
    fontWeight: FontWeight.normal,
  );

  static final TextStyle bodyGray14 = GoogleFonts.manrope(
    color: AppColors.gray,
    fontSize: 14,
    fontWeight: FontWeight.w600,
  );

  static final TextStyle bodyBlue14 = GoogleFonts.manrope(
    color: AppColors.darkBlue,
    fontSize: 14,
    fontWeight: FontWeight.w600,
  );

  static final TextStyle buttonWhite = GoogleFonts.manrope(
    color: AppColors.white,
    fontSize: 18,
    fontWeight: FontWeight.bold,
  );
}
