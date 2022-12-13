package com.nashtech.assetmanagement.service;

import com.nashtech.assetmanagement.dto.request.CategoryRequestDto;
import com.nashtech.assetmanagement.dto.response.CategoryResponseDto;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDto> getAllCategory();

    CategoryResponseDto createCategory(CategoryRequestDto requestCategoryDTO);
}
