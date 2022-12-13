package com.nashtech.assetmanagement.entities;

import com.nashtech.assetmanagement.enums.UserState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class Users {

    @Id
    @Column(nullable = false, length = 10)
    private String staffCode;

    @Column(name = "first_name", length = 150)
    private String firstName;

    @Column(name = "last_name", length = 150)
    private String lastName;

    @NaturalId
    @Column(name = "username", length = 250, unique = true)
    private String userName;

    @Column(name = "password", length = 250)
    private String password;

    @Column(name = "joined_date")
    private Date joinedDate;

    @Column(name = "birth_date")
    private Date birthDate;

    @Column
    private Boolean gender;

    @Column
    @Enumerated(EnumType.STRING)
    private UserState state;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;


    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @OneToMany(mappedBy = "assignedBy")
    private List<Assignment> assignments;

}
