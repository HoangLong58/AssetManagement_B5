package com.nashtech.assetmanagement.dto.request;


import com.nashtech.assetmanagement.utils.AppConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FirstLoginRequestDto {
    @NotEmpty
    private String userName;
    @Pattern(regexp = AppConstants.STRONG_PASSWORD_REGEX,
            message = "Password must contain at least 1 uppercase, 1 lowercase, 1 " +
                    "special character and 1 digit.")
    private String newPassword;

}
