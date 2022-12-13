package com.nashtech.assetmanagement.dto.request;

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
public class CreateAssetRequestDto {
    private String assetName;
    private String categoryId;
    private String specification;
    private AssetState state;
    private Date installedDate;
    private String locationId;
    private String userId;
}
