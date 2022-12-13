package com.nashtech.assetmanagement.controller.rest.admin;

import com.nashtech.assetmanagement.dto.response.RoleResponseDto;
import com.nashtech.assetmanagement.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "User Role Resources",
        description = "Provide all user role available in the system")
@RestController
@RequestMapping("/admin/api/roles")
public class RoleController {
    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }


    @Operation(summary = "Get all user role",
            description = "This return all user role in the database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully retrieved"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The role resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @GetMapping()
    public ResponseEntity<List<RoleResponseDto>> getLocationList() {
        return ResponseEntity.ok(this.roleService.getRoleList());
    }
}