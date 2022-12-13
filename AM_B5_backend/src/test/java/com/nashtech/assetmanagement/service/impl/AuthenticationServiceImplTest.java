package com.nashtech.assetmanagement.service.impl;

import com.nashtech.assetmanagement.entities.Users;
import com.nashtech.assetmanagement.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AuthenticationServiceImplTest {

    UserRepository userRepository;
    AuthenticationServiceImpl authenticationServiceImpl;
    Authentication authentication;
    Users expectedUser;

    @BeforeEach
    void setUp() {
        authentication = mock(Authentication.class);
        userRepository = mock(UserRepository.class);
        expectedUser = mock(Users.class);
        authenticationServiceImpl = new AuthenticationServiceImpl(userRepository);
    }


    @Test
    void itShouldReturnUserWhenAuthenticationIsValid() {
        //given
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(authentication.getName()).thenReturn("username");
        when(userRepository.findByUserName("username")).thenReturn(Optional.of(expectedUser));
        //when
        Users actualUser = authenticationServiceImpl.getUser();
        //then
        assertThat(actualUser).isEqualTo(expectedUser);

    }


}