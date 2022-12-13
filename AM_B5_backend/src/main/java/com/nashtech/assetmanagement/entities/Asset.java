package com.nashtech.assetmanagement.entities;

import com.nashtech.assetmanagement.enums.AssetState;
import lombok.*;

import javax.persistence.*;
import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "asset")
public class Asset {

    @Id
    @Column(name = "asset_code", length = 10)
    private String code;

    @Column(name = "asset_name", length = 200)
    private String name;

    @Column
    private String specification;

    @Column(name = "installed_date")
    private Date installedDate;

    @Column
    @Enumerated(EnumType.STRING)
    private AssetState state;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
}
