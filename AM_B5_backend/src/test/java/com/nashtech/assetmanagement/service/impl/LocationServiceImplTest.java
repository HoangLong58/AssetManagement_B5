package com.nashtech.assetmanagement.service.impl;

import com.nashtech.assetmanagement.dto.response.LocationResponseDto;
import com.nashtech.assetmanagement.entities.Location;
import com.nashtech.assetmanagement.mapper.LocationMapper;
import com.nashtech.assetmanagement.repositories.LocationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class LocationServiceImplTest {
    @Mock
    LocationRepository locationRepository;
    @Mock
    LocationMapper locationMapper;
    @InjectMocks
    LocationServiceImpl locationService;

    @Test
    void getLocationList_ShouldReturnLocationResponseDtoList_WhenLocationExist() {
        List<Location> locationList = mock(ArrayList.class);
        List<LocationResponseDto> responseList = mock(ArrayList.class);
        when(locationRepository.findAll()).thenReturn(locationList);
        when(locationList.isEmpty()).thenReturn(false);
        when(locationMapper.locationListToLocationResponseDtoList(locationList)).thenReturn(responseList);
        List<LocationResponseDto> result = locationService.getLocationList();
        assertThat(result).isEqualTo(responseList);
    }
}
