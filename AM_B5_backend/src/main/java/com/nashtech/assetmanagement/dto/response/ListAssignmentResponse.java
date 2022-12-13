package com.nashtech.assetmanagement.dto.response;

import lombok.*;

import java.util.List;

@Getter @Setter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListAssignmentResponse {

    List<AssignmentDto> assignmentContent;

    private int pageNo;

    private int pageSize;

    private long totalElements;

    private int totalPages;

    private boolean last;

}
