package com.nashtech.assetmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @Column(length = 10, nullable = false)
    private String id;

    @Column(length = 150, nullable = false)
    private String name;

    @Column(name = "total_quantity")
    private Long totalQuantity;

    @OneToMany(mappedBy = "category")
    private List<Asset> assets;
}
