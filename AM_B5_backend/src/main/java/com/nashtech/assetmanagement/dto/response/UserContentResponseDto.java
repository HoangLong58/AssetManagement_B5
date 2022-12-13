package com.nashtech.assetmanagement.dto.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserContentResponseDto {

    private String staffCode;

    private String firstName;

    private String lastName;

    private Date birthDate;

    private Boolean gender;

    private String username;

    private Date joinedDate;

    private String locationCode;

    private String roleName;

}
