package com.nashtech.assetmanagement.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestDto {

    @NotEmpty(message = "Category code must not be empty.")
    private String id;

    @NotEmpty(message = "Category name must not be empty.")
    private String name;
}
