package com.nashtech.assetmanagement.service;

import com.nashtech.assetmanagement.entities.Users;
import org.springframework.security.core.Authentication;

public interface AuthenticationService {
    Authentication getAuthentication();

    Users getUser();
}
