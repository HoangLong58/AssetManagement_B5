package com.nashtech.assetmanagement.repositories;

import com.nashtech.assetmanagement.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, String> {

    boolean existsByName(String locationName);

    Optional<Location> findByName(String locationName);

}
