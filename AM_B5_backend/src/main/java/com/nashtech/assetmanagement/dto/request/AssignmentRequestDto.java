package com.nashtech.assetmanagement.dto.request;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentRequestDto {
    @NotEmpty
    String assignedBy;
    @NotEmpty
    String assignedTo;
    @NotEmpty
    String assetCode;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotEmpty
    private Date assignedDate;
    private String note;
}
