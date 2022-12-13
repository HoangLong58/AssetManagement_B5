package com.nashtech.assetmanagement.dto.request;

import com.nashtech.assetmanagement.enums.AssetState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class EditAssetRequest {
    @NotBlank(message = "Asset name is required")
    private String name;

    @NotBlank(message = "Asset specification is required")
    private String specification;

    @NotBlank(message = "Asset installed date is required")
    private String installedDate;

    private AssetState state;

}
