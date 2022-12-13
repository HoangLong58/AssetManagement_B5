package com.nashtech.assetmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private String staffCode;
    private String firstName;
    private String lastName;
    private String userName;
    private Date joinedDate;
    private Date birthDate;
    private Boolean gender;
    private String state;

}
