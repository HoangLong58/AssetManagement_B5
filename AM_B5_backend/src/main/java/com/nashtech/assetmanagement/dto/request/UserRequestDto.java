package com.nashtech.assetmanagement.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nashtech.assetmanagement.constraint.BirthDay;
import com.nashtech.assetmanagement.constraint.JoinedDate;
import com.nashtech.assetmanagement.constraint.NotWeekend;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JoinedDate(before = "birthDate", after = "joinedDate", message = "Joined date is not later than Date of Birth. Please select a different date")
public class UserRequestDto {
    @Size(max = 128)
    private String firstName;
    @Size(max = 128)
    private String lastName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotWeekend(message = "joined date is Saturday or Sunday. Please select a different date")
    private Date joinedDate;
    @NotNull(message = "birthDate must not be null")
    @BirthDay(message = "birthDate User is under 18. Please select a different date")
    @Past(message = "birthDate must be in the past")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthDate;
    @NotNull
    private Boolean gender;
    @NotEmpty
    private String locationName;
    @NotEmpty
    private String roleName;
}