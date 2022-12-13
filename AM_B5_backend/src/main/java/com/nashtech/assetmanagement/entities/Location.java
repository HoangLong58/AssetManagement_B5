package com.nashtech.assetmanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "location")
public class Location {

    @Id
    @Column(length = 10, nullable = false)
    private String code;

    @Column(length = 100, nullable = false)
    private String name;

    @OneToMany(mappedBy = "location")
    private List<Asset> assets;

    @OneToMany(mappedBy = "location")
    private List<Users> users;
}
