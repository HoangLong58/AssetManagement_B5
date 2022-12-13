package com.nashtech.assetmanagement.utils;

import static com.nashtech.assetmanagement.utils.AppConstants.*;

public class StateConverter {

    public static String getAssignmentState(String stateCode) {
        String upperSate = stateCode.toUpperCase();
        switch (upperSate) {
            case "WAITING_FOR_ACCEPTANCE":
                return WAITING_FOR_ACCEPTANCE;
            case "ACCEPTED":
                return ACCEPTED;
            case "DECLINED":
                return DECLINED;

            default:
                return null;
        }
    }
}
