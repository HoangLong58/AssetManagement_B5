package com.nashtech.assetmanagement.sercurity.userdetail;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nashtech.assetmanagement.entities.Users;
import com.nashtech.assetmanagement.enums.UserState;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@ToString
public class UserPrinciple implements UserDetails {

    private String staffCode;

    private String userName;
    @JsonIgnore
    private String password;

    private UserState state;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrinciple(String staffCode,
                         String userName,
                         String password,
                         UserState state,
                         Collection<? extends GrantedAuthority> authorities) {
        this.staffCode = staffCode;
        this.userName = userName;
        this.password = password;
        this.state = state;
        this.authorities = authorities;
    }

    public static UserPrinciple build(Users users) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (users.getRole().getName().equalsIgnoreCase("admin"))
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

        if (users.getRole().getName().equalsIgnoreCase("staff"))
            authorities.add(new SimpleGrantedAuthority("ROLE_STAFF"));

        return new UserPrinciple(
                users.getStaffCode(),
                users.getUserName(),
                users.getPassword(),
                users.getState(),
                authorities);

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    public String getStaffCode() {
        return staffCode;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public UserState getState() {
        return state;
    }
}
