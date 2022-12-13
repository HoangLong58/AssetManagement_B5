package com.nashtech.assetmanagement.mapper;

import com.nashtech.assetmanagement.dto.response.AssignmentResponseDto;
import com.nashtech.assetmanagement.dto.response.ListAssignmentResponseDto;
import com.nashtech.assetmanagement.entities.Assignment;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class AssignmentContent {

    private final ModelMapper mapper;

    public AssignmentResponseDto mapToAssignmentDto(Assignment assignment) {
        return mapper.map(assignment, AssignmentResponseDto.class);
    }

    public ListAssignmentResponseDto getAssignmentResponse(Page<Assignment> assignmentPage) {
        List<Assignment> assignments = assignmentPage.getContent();
        List<AssignmentResponseDto> assignmentContent = assignments.stream()
                .map(this::mapToAssignmentDto)
                .collect(Collectors.toList());
        return ListAssignmentResponseDto.builder()
                .assignmentContent(assignmentContent)
                .pageNo(assignmentPage.getNumber())
                .pageSize(assignmentPage.getSize())
                .totalElements(assignmentPage.getTotalElements())
                .totalPages(assignmentPage.getTotalPages())
                .last(assignmentPage.isLast())
                .build();
    }
}
