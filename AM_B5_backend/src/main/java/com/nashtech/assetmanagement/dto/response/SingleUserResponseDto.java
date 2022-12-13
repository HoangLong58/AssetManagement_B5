package com.nashtech.assetmanagement.dto.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SingleUserResponseDto {

    private String staffCode;

    private String firstName;

    private String lastName;

    private String username;

    private Date birthDate;

    private Boolean gender;

    private Date joinedDate;

    private String roleName;

    private String locationCode;


}
