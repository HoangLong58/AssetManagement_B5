package com.nashtech.assetmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "assignment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Assignment {

    @EmbeddedId
    AssignmentId id;

    @ManyToOne
    @JoinColumn(name = "assigned_by")
    private Users assignedBy;

    @ManyToOne
    @MapsId("assignedTo")
    @JoinColumn(name = "assigned_to", columnDefinition = "VARCHAR(10)")
    private Users assignedTo;

    @ManyToOne
    @MapsId("assetCode")
    @JoinColumn(name = "asset_code", columnDefinition = "VARCHAR(10)")
    private Asset asset;

    @Column(length = 50)
    private String state;

    @Column()
    private String note;

}
