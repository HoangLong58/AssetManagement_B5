package com.nashtech.assetmanagement.service;

import com.nashtech.assetmanagement.dto.response.LocationResponseDto;

import java.util.List;

public interface LocationService {

    List<LocationResponseDto> getLocationList();
}
