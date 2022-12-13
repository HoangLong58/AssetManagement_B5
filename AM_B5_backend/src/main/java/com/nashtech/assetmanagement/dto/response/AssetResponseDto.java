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
public class AssetResponseDto {

    private String assetCode;
    private String assetName;
    private String categoryName;
    private String state;

    private String specification;
    private Date installedDate;

    private String locationCode;
    private String locationName;
    private String categoryId;
    private String userStaffcode;
}
