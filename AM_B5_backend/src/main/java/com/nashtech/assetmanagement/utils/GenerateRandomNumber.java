package com.nashtech.assetmanagement.utils;

import static org.apache.commons.lang3.RandomStringUtils.randomNumeric;

public class GenerateRandomNumber {

    public static String randomNumber() {
        return randomNumeric(6);
    }
}
