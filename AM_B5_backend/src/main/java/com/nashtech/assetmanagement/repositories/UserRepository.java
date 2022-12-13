package com.nashtech.assetmanagement.repositories;

import com.nashtech.assetmanagement.entities.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, String> {
    Optional<Users> findByUserName(String userName);

    boolean existsByUserName(String userName);

    @Query(value = " select u from Users u where not u.staffCode = :staffCode and u.location.code = :location")
    Page<Users> findAllByOrderByFirstNameAsc(Pageable pageable, @Param("staffCode") String staffCode, @Param("location") String location);

    @Query(value = "select staff_code from users where staff_code LIKE 'SD%'", nativeQuery = true)
    List<String> findAllStaffCode();

    @Query(value = " select * from users where" +
            " (lower(staff_code) LIKE %:text% OR lower(concat(first_name,' ',last_name)) LIKE %:text%)" +
            "and location_id=:locationCode", nativeQuery = true)
    List<Users> findByStaffCodeOrNameAndLocationCode(@Param("text") String text, String locationCode);


    int countUsersByFirstNameAndLastNameLikeIgnoreCase(String firstName, String lastName);

    Optional<Users> findByStaffCode(String staffCode);


    @Query(value = "select u from Users u " +
            "where ( lower(u.staffCode) like concat('%', :text, '%') or " +
            "lower( concat(u.firstName, ' ', u.lastName) ) like concat('%', :text, '%'))" +
            "and lower(u.location.code) = :location " +
            "and upper(u.role.name) in :roles " +
            "and u.staffCode <> :loggedStaffCode " +
            "and u.state <> 'INACTIVE'", nativeQuery = false)
    Page<Users> searchByStaffCodeOrNameWithRole(@Param("text") String text,
                                                @Param("loggedStaffCode") String loggedStaffCode,
                                                @Param("location") String adminLocation,
                                                @Param("roles") List<String> roles,
                                                Pageable pageable);
}
