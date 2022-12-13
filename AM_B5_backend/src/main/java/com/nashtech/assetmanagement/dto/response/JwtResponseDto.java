package com.nashtech.assetmanagement.dto.response;

import com.nashtech.assetmanagement.enums.UserState;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtResponseDto {
    private String token;
    private String type = "Bearer";
    private String id;
    private String username;
    private UserState state;
    private List<String> roles;
    private String location;

    public JwtResponseDto(String token, String type, String id, String username, UserState state, List<String> roles, String location) {
        this.token = token;
        this.type = type;
        this.id = id;
        this.username = username;
        this.state = state;
        this.roles = roles;
        this.location = location;
    }


}