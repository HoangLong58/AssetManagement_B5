package com.nashtech.assetmanagement.mapper;

import com.nashtech.assetmanagement.dto.request.CategoryRequestDto;
import com.nashtech.assetmanagement.dto.response.CategoryResponseDto;
import com.nashtech.assetmanagement.entities.Category;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryMapper {

    private final ModelMapper mapper;


    public CategoryMapper(ModelMapper mapper) {
        this.mapper = mapper;
    }

    public CategoryResponseDto categoryToResponseCategoryDTO(Category category) {
        return mapper.map(category, CategoryResponseDto.class);
    }

    public List<CategoryResponseDto> ListCategoriesToListResponseCategories(List<Category> categories) {
        return mapper.map(categories,
                new TypeToken<List<CategoryResponseDto>>() {
                }.getType());
    }

    public Category RequestCategoryToCategory(CategoryRequestDto requestCategoryDTO) {
        return mapper.map(requestCategoryDTO, Category.class);
    }
}
