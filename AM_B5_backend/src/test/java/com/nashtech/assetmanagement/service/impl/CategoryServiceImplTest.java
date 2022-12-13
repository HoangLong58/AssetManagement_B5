package com.nashtech.assetmanagement.service.impl;

import com.nashtech.assetmanagement.dto.request.CategoryRequestDto;
import com.nashtech.assetmanagement.dto.response.CategoryResponseDto;
import com.nashtech.assetmanagement.entities.Category;
import com.nashtech.assetmanagement.exception.NotUniqueException;
import com.nashtech.assetmanagement.mapper.CategoryMapper;
import com.nashtech.assetmanagement.repositories.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CategoryServiceImplTest {

    private CategoryRepository categoryRepository;
    private CategoryMapper categoryMapper;
    private Category category;

    private CategoryServiceImpl categoryServiceImpl;

    @BeforeEach
    void setUp() {
        category = mock(Category.class);
        categoryRepository = mock(CategoryRepository.class);
        categoryMapper = mock(CategoryMapper.class);
        categoryServiceImpl = new CategoryServiceImpl(categoryRepository, categoryMapper);
    }

    @Test
    public void getAllCategory_ShouldReturnListCategory_WhenRequestValid() {
        List<Category> categories = mock(List.class);
        List<CategoryResponseDto> expected = mock(List.class);
        when(categoryRepository.findAll()).thenReturn(categories);
        when(categoryMapper.ListCategoriesToListResponseCategories(categories)).thenReturn(expected);
        List<CategoryResponseDto> actual = categoryServiceImpl.getAllCategory();
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    public void createCategory_ShouldReturnCategory_WhenRequestValid() {
        CategoryRequestDto requestCategoryDTO = mock(CategoryRequestDto.class);
        when(categoryMapper.RequestCategoryToCategory(requestCategoryDTO)).thenReturn(category);
        when(categoryRepository.save(category)).thenReturn(category);
        CategoryResponseDto expected = mock(CategoryResponseDto.class);
        when(categoryMapper.categoryToResponseCategoryDTO(category)).thenReturn(expected);
        CategoryResponseDto actual = categoryServiceImpl.createCategory(requestCategoryDTO);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    public void createCategory_ShouldThrowNotUniqueException_WhenCategoryPrefixNotUnique() {
        CategoryRequestDto requestCategoryDTO = new CategoryRequestDto("LT", "Laptop");
        when(categoryRepository.existsCategoriesById("LT")).thenReturn(true);
        when(categoryRepository.existsCategoriesByName("Laptop")).thenReturn(false);
        NotUniqueException exception = assertThrows(NotUniqueException.class,
                () -> categoryServiceImpl.createCategory(requestCategoryDTO));
        assertThat(exception.getMessage()).isEqualTo("Prefix is already existed. Please enter a " +
                "different prefix.");
    }

    @Test
    public void createCategory_ShouldThrowNotUniqueException_WhenCategoryNotUnique() {
        CategoryRequestDto requestCategoryDTO = new CategoryRequestDto("LT", "Laptop");
        when(categoryRepository.existsCategoriesById("LT")).thenReturn(false);
        when(categoryRepository.existsCategoriesByName("Laptop")).thenReturn(true);
        NotUniqueException exception = assertThrows(NotUniqueException.class,
                () -> categoryServiceImpl.createCategory(requestCategoryDTO));
        assertThat(exception.getMessage()).isEqualTo("Category is already existed. Please enter a " +
                "different category.");
    }
}
