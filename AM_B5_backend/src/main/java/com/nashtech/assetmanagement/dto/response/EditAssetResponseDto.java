package com.nashtech.assetmanagement.dto.response;

import com.nashtech.assetmanagement.enums.AssetState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EditAssetResponseDto {

    private String code;

    private String name;

    private String categoryName;

    private String specification;

    private String installedDate;

    private AssetState state;

    private String locationCode;
}
