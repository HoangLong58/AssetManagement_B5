package com.nashtech.assetmanagement.service;

import com.nashtech.assetmanagement.dto.response.RoleResponseDto;
import com.nashtech.assetmanagement.entities.Role;

import java.util.List;

public interface RoleService {
    Role getRole(String name);

    Role getRole(Long id);

    List<RoleResponseDto> getRoleList();
}
