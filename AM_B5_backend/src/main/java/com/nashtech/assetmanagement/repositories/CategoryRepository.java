package com.nashtech.assetmanagement.repositories;

import com.nashtech.assetmanagement.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, String> {

    boolean existsCategoriesById(String id);

    boolean existsCategoriesByName(String name);
}
