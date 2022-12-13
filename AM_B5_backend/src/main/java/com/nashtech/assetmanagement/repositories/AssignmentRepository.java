package com.nashtech.assetmanagement.repositories;

import java.sql.Date;
import java.util.List;

import com.nashtech.assetmanagement.entities.AssignmentId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nashtech.assetmanagement.entities.Asset;
import com.nashtech.assetmanagement.entities.Assignment;
import com.nashtech.assetmanagement.entities.Users;

public interface AssignmentRepository extends JpaRepository<Assignment, AssignmentId> {

    List<Assignment> findByAsset(Asset asset);

    Boolean existsByAssignedToOrAssignedBy(Users assignedTo, Users assignedBy);

    @Query(value = "from Assignment a where " +
            "(lower(a.asset.code)  like concat('%', :text, '%')" +
            "or lower(a.asset.name) like concat('%', :text, '%')" +
            "or lower(a.assignedTo.userName) like concat('%', :text, '%'))" +
            "and a.state in :states " +
            "and a.id.assignedDate = :assignedDate " +
            "order by a.asset.code asc ")
    Page<Assignment> getAssignmentByConditions(@Param("text") String textSearch,
                                               @Param("states") List<String> states,
                                               @Param("assignedDate") Date assignedDate,
                                               Pageable pageable);

    @Query(value = "from Assignment a where " +
            "(lower(a.asset.code)  like concat('%', :text, '%')" +
            "or lower(a.asset.name) like concat('%', :text, '%')" +
            "or lower(a.assignedTo.userName) like concat('%', :text, '%'))" +
            "and a.state in :states " +
            "order by a.asset.code asc " )
    Page<Assignment> getAssignmentWithoutAssignedDate(@Param("text") String textSearch,
                                               @Param("states") List<String> states,
                                               Pageable pageable);

    Boolean existsById_AssetCodeAndId_AssignedDateAndId_AssignedTo(String id_assetCode, Date id_assignedDate, String id_assignedTo);

    @Query("select e from Assignment e where  e.assignedTo.staffCode = :staffCode and e.id.assignedDate < CURRENT_DATE + 1")
    Page<Assignment> getListAssignmentByUser(String staffCode , Pageable pageable);
}
