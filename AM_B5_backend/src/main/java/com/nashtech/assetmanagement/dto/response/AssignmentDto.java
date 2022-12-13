package com.nashtech.assetmanagement.dto.response;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nashtech.assetmanagement.entities.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter @Setter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDto {

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
