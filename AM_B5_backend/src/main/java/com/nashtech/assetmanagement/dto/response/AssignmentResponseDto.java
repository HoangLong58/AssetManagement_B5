package com.nashtech.assetmanagement.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.sql.Date;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentResponseDto {

    private String assetCode;

    private String assetName;

    @JsonProperty("assignedTo")
    private String assignedToUsername;

    @JsonProperty("assignedBy")
    private String assignedByUsername;

    @JsonProperty("assignedDate")
    private Date IdAssignedDate;

    private String assetCategoryName;

    private String state;

    private String note;

    private String assetSpecification;

}
