package com.nashtech.assetmanagement.utils;

import lombok.extern.slf4j.Slf4j;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

@Slf4j
public class UserGenerateUtil {
    public static int getBiggestStaffCode(List<String> staffCodeList) {
        int max = 0;
        for (String staffCode : staffCodeList) {
            String parts[] = staffCode.split("SD");
            int value = Integer.parseInt(parts[1]);
            if (value > max) {
                max = value;
            }
        }
        return max;
    }

    public static String generateUserName(String firstName, String lastName, int sameName) {
        String[] eachWord = lastName.split(" ");
        StringBuilder end = new StringBuilder();
        for (String str : eachWord) {
            end.append(str.charAt(0));
        }
        if (sameName > 0) {
            return firstName.toLowerCase() + end.toString().toLowerCase() + sameName;
        }
        return firstName.toLowerCase() + end.toString().toLowerCase();
    }

    public static String generatePassword(String userName, Date birthDate) {
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(birthDate);
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int month = calendar.get(Calendar.MONTH) + 1;
        int year = calendar.get(Calendar.YEAR);
        log.info("birthday: " + birthDate + "\nday: " + day + "\nmonth: " + month + "\nyear:" + year);
        String monthString;
        String dayString;
        if (day < 10) {
            dayString = "0" + day;
        } else {
            dayString = "" + day;
        }
        if (month < 10) {
            monthString = "0" + month;
        } else {
            monthString = "" + month;
        }
        return userName + "@" + dayString + monthString + year;
    }

    public static String generateStaffCode(int number) {
        int code = number + 1;
        if (code < 10) {
            return "SD000" + code;
        } else if (code < 100) {
            return "SD00" + code;
        } else if (code < 1000) {
            return "SD0" + code;
        } else return "SD" + code;
    }
}
