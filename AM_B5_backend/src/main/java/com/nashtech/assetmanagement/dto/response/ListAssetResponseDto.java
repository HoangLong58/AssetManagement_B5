package com.nashtech.assetmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListAssetResponseDto {

    private List<AssetResponseDto> list;
    private Long totalPages;

}
