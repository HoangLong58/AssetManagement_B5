package com.nashtech.assetmanagement.service.impl;


import com.nashtech.assetmanagement.dto.request.CategoryRequestDto;
import com.nashtech.assetmanagement.dto.response.CategoryResponseDto;
import com.nashtech.assetmanagement.entities.Category;
import com.nashtech.assetmanagement.exception.NotUniqueException;
import com.nashtech.assetmanagement.mapper.CategoryMapper;
import com.nashtech.assetmanagement.repositories.CategoryRepository;
import com.nashtech.assetmanagement.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    CategoryRepository categoryRepository;

    CategoryMapper categoryMapper;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public List<CategoryResponseDto> getAllCategory() {
        List<Category> categories = categoryRepository.findAll();
        return categoryMapper.ListCategoriesToListResponseCategories(categories);
    }

    @Override
    public CategoryResponseDto createCategory(CategoryRequestDto requestCategoryDTO) {
        if (categoryRepository.existsCategoriesById(requestCategoryDTO.getId())) {
            throw new NotUniqueException("Prefix is already existed. Please enter a " +
                    "different prefix.");
        }
        if (categoryRepository.existsCategoriesByName(requestCategoryDTO.getName())) {
            throw new NotUniqueException("Category is already existed. Please enter a " +
                    "different category.");
        }
        Category category = categoryMapper.RequestCategoryToCategory(requestCategoryDTO);
        category = categoryRepository.save(category);
        return categoryMapper.categoryToResponseCategoryDTO(category);
    }

}
