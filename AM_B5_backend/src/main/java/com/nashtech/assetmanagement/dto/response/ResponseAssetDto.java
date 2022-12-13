package com.nashtech.assetmanagement.dto.response;

import com.nashtech.assetmanagement.enums.AssetState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseAssetDto {
    private String assetCode;
    private String assetName;
    private String specification;
    private Date installedDate;
    private AssetState state;
    private String locationCode;
}
