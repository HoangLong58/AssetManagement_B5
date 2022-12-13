package com.nashtech.assetmanagement.mapper;


import com.nashtech.assetmanagement.dto.request.AssignmentRequestDto;
import com.nashtech.assetmanagement.dto.response.AssignmentResponseDto;
import com.nashtech.assetmanagement.entities.Assignment;
import com.nashtech.assetmanagement.entities.AssignmentId;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class AssignmentMapper {
    private final ModelMapper mapper;

    public Assignment MapRequestAssignmentToAssignment(AssignmentRequestDto request) {
        AssignmentId assignmentId = new AssignmentId(request.getAssignedTo(), request.getAssetCode(), request.getAssignedDate());
        Assignment assignment = new Assignment();
        assignment.setId(assignmentId);
        assignment.setNote(request.getNote());
        assignment.setState("Waiting for acceptance");
        return assignment;
    }

    public AssignmentResponseDto MapAssignmentToResponseDto(Assignment assignment) {
        AssignmentResponseDto responseDTO = new AssignmentResponseDto();
        responseDTO.setAssetCode(assignment.getAsset().getCode());
        responseDTO.setAssetName(assignment.getAsset().getName());
        responseDTO.setAssetSpecification(assignment.getAsset().getSpecification());
        responseDTO.setAssignedToUsername(assignment.getAssignedTo().getUserName());
        responseDTO.setAssignedByUsername(assignment.getAssignedBy().getUserName());
        responseDTO.setIdAssignedDate(assignment.getId().getAssignedDate());
        responseDTO.setNote(assignment.getNote());
        responseDTO.setState(assignment.getState());

        return responseDTO;
    }

    public List<AssignmentResponseDto> mapperListAssignment(List<Assignment> list) {
        List<AssignmentResponseDto> result = list.stream().map(item -> mapper.map(item, AssignmentResponseDto.class))
                .collect(Collectors.toList());
        return result;
    }
}
