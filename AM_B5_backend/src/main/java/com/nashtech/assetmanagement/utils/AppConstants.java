package com.nashtech.assetmanagement.utils;

public class AppConstants {
    public static final String DEFAULT_PAGE_NUMBER = "0";
    public static final String DEFAULT_PAGE_SIZE = "20";
    public static final String DEFAULT_SORT_BY = "firstName";
    public static final String DEFAULT_SORT_DIRECTION = "asc";

    public static final String[] AUTH_WHITELIST = {
            // -- Swagger UI v3 (OpenAPI)
            "/user/api/auth/**",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/api-docs",
            "swagger-ui.html",
            "/user/api/auth/signin",
            "/swagger-ui.html/**"
            // other public endpoints of your API may be appended to this array
    };

    private AppConstants() {
    }

    public static final String ACCEPTED = "Accepted";
    public static final String WAITING_FOR_ACCEPTANCE = "Waiting for acceptance";
    public static final String DECLINED = "Declined";

    public static final String STRONG_PASSWORD_REGEX="^(?=.*[0-9])(?=.*[a-z])(?=" +
            ".*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";


}
