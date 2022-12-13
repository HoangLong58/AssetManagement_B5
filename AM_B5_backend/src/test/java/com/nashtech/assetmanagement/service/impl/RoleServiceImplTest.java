package com.nashtech.assetmanagement.service.impl;

import com.nashtech.assetmanagement.dto.response.RoleResponseDto;
import com.nashtech.assetmanagement.entities.Role;
import com.nashtech.assetmanagement.mapper.RoleMapper;
import com.nashtech.assetmanagement.repositories.RoleRepository;
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
public class RoleServiceImplTest {
    @Mock
    RoleRepository roleRepository;
    @Mock
    RoleMapper roleMapper;
    @InjectMocks
    RoleServiceImpl roleService;

    @Test
    void getRoleList_ShouldReturnResponseRoleDtoList_WhenRoleExist() {
        List<Role> roles = mock(ArrayList.class);
        List<RoleResponseDto> responseList = mock(ArrayList.class);
        when(roleRepository.findAll()).thenReturn(roles);
        when(roles.isEmpty()).thenReturn(false);
        when(roleMapper.roleListToResponseRoleDtoList(roles)).thenReturn(responseList);
        List<RoleResponseDto> result = roleService.getRoleList();
        assertThat(result).isEqualTo(responseList);
    }
}