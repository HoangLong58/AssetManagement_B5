package com.nashtech.assetmanagement.dto.request;

import com.nashtech.assetmanagement.utils.AppConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePassRequestDto {
    private String staffCode;
    private String password;
    @Pattern(regexp = AppConstants.STRONG_PASSWORD_REGEX,
            message = "Password must contain at least 1 uppercase, 1 lowercase, 1 " +
                    "special character and 1 digit.")
    private String newPassword;
}
