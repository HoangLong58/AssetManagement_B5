package com.nashtech.assetmanagement.mapper;

import com.nashtech.assetmanagement.dto.response.LocationResponseDto;
import com.nashtech.assetmanagement.entities.Location;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LocationMapper {
    @Autowired
    ModelMapper modelMapper;

    public LocationResponseDto locationToLocationDTO(Location location) {
        return modelMapper.map(location, LocationResponseDto.class);
    }

    public List<LocationResponseDto> locationListToLocationResponseDtoList(List<Location> locations) {
        List<LocationResponseDto> locationResponseDTOList = locations.stream()
                .map(location -> modelMapper.map(location, LocationResponseDto.class)).collect(Collectors.toList());
        return locationResponseDTOList;
    }
}
