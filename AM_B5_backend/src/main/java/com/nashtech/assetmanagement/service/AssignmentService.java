package com.nashtech.assetmanagement.service;

import com.nashtech.assetmanagement.dto.request.AssignmentRequestDto;
import com.nashtech.assetmanagement.dto.request.ChangeAssignmentStateRequestDto;
import com.nashtech.assetmanagement.dto.response.AssignmentResponseDto;
import com.nashtech.assetmanagement.dto.response.ListAssignmentResponseDto;
import com.nashtech.assetmanagement.dto.response.MessageResponse;

import java.util.List;

public interface AssignmentService {


    AssignmentResponseDto createNewAssignment(AssignmentRequestDto request);

    List<AssignmentResponseDto> getListAssignmentByAssetCode(String assetCode);

    ListAssignmentResponseDto getAssignmentsByCondition(int pageNo,
                                                        int pageSize,
                                                        String text,
                                                        List<String> states,
                                                        String assignedDateStr);

    List<AssignmentResponseDto> getListAssignmentByUser(String userId, String sortBy, String sortDirection);

    //589 - Respond to his/her own assignment
    MessageResponse updateAssignmentState(ChangeAssignmentStateRequestDto changeAssignmentStateRequestDto);
}
