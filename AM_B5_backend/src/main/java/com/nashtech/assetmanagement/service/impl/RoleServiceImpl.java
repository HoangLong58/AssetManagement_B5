package com.nashtech.assetmanagement.service.impl;

import com.nashtech.assetmanagement.dto.response.RoleResponseDto;
import com.nashtech.assetmanagement.entities.Role;
import com.nashtech.assetmanagement.exception.ResourceNotFoundException;
import com.nashtech.assetmanagement.mapper.RoleMapper;
import com.nashtech.assetmanagement.repositories.RoleRepository;
import com.nashtech.assetmanagement.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    private final RoleMapper roleMapper;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    @Override
    public Role getRole(String name) {
        Role role =
                roleRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("Did not find role with name: " + name)
                );
        return role;
    }

    @Override
    public Role getRole(Long id) {
        Role role =
                roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Did not find role with id: " + id)
                );
        return role;
    }

    @Override
    public List<RoleResponseDto> getRoleList() {
        List<Role> roles = roleRepository.findAll();
        if (roles.isEmpty()) {
            throw new ResourceNotFoundException("Role list not found");
        }
        List<RoleResponseDto> responseList = roleMapper.roleListToResponseRoleDtoList(roles);
        return responseList;
    }

}
