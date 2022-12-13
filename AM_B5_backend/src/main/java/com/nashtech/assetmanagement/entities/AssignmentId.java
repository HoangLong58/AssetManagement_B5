package com.nashtech.assetmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.sql.Date;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentId implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "assigned_to", columnDefinition = "VARCHAR(10)")
    String assignedTo;

    @Column(name = "asset_code", columnDefinition = "VARCHAR(10)")
    String assetCode;

    @Column(name = "assigned_date")
    private Date assignedDate;
}
