package com.nashtech.assetmanagement.mapper;

import com.nashtech.assetmanagement.dto.response.ListUsersResponseDto;
import com.nashtech.assetmanagement.dto.response.UserContentResponseDto;
import com.nashtech.assetmanagement.entities.Users;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class UsersContent {

    private final ModelMapper mapper;

    public UserContentResponseDto mapToDto(Users user) {
        return mapper.map(user, UserContentResponseDto.class);
    }

    public ListUsersResponseDto getUsersContent(Page<Users> usersPage) {
        List<Users> users = usersPage.getContent();
        List<UserContentResponseDto> usersContent = users.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

        return ListUsersResponseDto.builder()
                .userContent(usersContent)
                .pageNo(usersPage.getNumber())
                .pageSize(usersPage.getSize())
                .totalElements(usersPage.getTotalElements())
                .totalPages(usersPage.getTotalPages())
                .last(usersPage.isLast())
                .build();
    }
}
