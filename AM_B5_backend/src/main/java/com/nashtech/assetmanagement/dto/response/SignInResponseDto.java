package com.nashtech.assetmanagement.dto.response;

import com.nashtech.assetmanagement.enums.UserState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignInResponseDto {
    private String staffCode;
    private String userName;
    private UserState state;
    private Collection<? extends GrantedAuthority> roles;
    private String token;


}

