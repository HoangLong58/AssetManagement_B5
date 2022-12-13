package com.nashtech.assetmanagement.mapper;

import com.nashtech.assetmanagement.dto.response.RoleResponseDto;
import com.nashtech.assetmanagement.entities.Role;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class RoleMapper {

    ModelMapper modelMapper;


    public List<RoleResponseDto> roleListToResponseRoleDtoList(List<Role> roles) {
        List<RoleResponseDto> responseRoleDtoList = roles.stream()
                .map(role -> modelMapper.map(role, RoleResponseDto.class)).collect(Collectors.toList());
        return responseRoleDtoList;
    }

}