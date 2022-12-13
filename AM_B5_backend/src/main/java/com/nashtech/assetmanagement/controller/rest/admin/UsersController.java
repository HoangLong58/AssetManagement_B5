package com.nashtech.assetmanagement.controller.rest.admin;

import com.nashtech.assetmanagement.dto.request.UserRequestDto;
import com.nashtech.assetmanagement.dto.response.*;
import com.nashtech.assetmanagement.service.UserService;
import com.nashtech.assetmanagement.utils.AppConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;


@Tag(name = "User Resources Management",
        description = "Provide the ability of user management and information")
@RestController
@AllArgsConstructor
@RequestMapping("/admin/api/users")
public class UsersController {

    private final UserService userService;


    @Operation(summary = "Create new user",
            description = "Admin provide then information of new user then user will be created")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "CREATED - Successfully created"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The user role or location resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public UserContentResponseDto createNewUser(@RequestBody @Valid UserRequestDto user) {
        return userService.createNewUser(user);
    }


    @Operation(summary = "Update user with new information",
            description = "Users provide new information  then user will be updated")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "UPDATED - Successfully updated"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The user with given ID resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserContentResponseDto editUser(@RequestBody @Valid UserRequestDto user, @PathVariable("id") String staffCode) {
        return userService.editUser(user, staffCode);
    }


    @Operation(summary = "Get location of a staff",
            description = "This return the id and name of the location of the specified staff")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully retrieved"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The location resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @GetMapping("/location/{staffCode}")
    public ResponseEntity<LocationResponseDto> getLocationByStaffCode(@PathVariable("staffCode") String id) {
        return ResponseEntity.ok(this.userService.getLocationByStaffCode(id));
    }


    @Operation(summary = "Get user list  by staff's code or staff's name",
            description = "Given staff's code or staff's name then this return all users matched with the given conditions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully retrieved"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The user resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @GetMapping("/searching/{location}")
    public ResponseEntity<?> getUserListByStaffCodeOrName(@RequestParam("text") String text, @PathVariable("location") String locationCode) {
        HashMap<String,Object> hashMap = new HashMap<>();
        List<UserContentResponseDto> result = this.userService.getUsersByStaffCodeOrNameAndLocationCode(text, locationCode);
        hashMap.put("list_user", result);
        hashMap.put("total", result.size());
        return ResponseEntity.ok(hashMap);
    }


    @Operation(summary = "Get all users",
            description = "This return list user in pagination sorted by first name ASC")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully retrieved"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The user resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public ListUsersResponseDto getAllStaffOrderByFirstNameAsc(
            @RequestParam(value = "textPattern", defaultValue = "") String searchText,
            @RequestParam("roles") List<String> roles,
            @RequestParam(
                    value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false)
                    int pageNo,
            @RequestParam(
                    value = "pageSize", defaultValue = "20", required = false)
                    int pageSize,
            @RequestParam(
                    value = "sortBy", defaultValue = "firstName", required = false)
                    String sortBy,
            @RequestParam(
                    value = "sortDirection", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false)
                    String sortDirection
    ) {
        return userService.getAllUsersBySearchingStaffCodeOrNameOrRole(pageNo, pageSize, sortBy, sortDirection, searchText, roles);
    }


    @Operation(summary = "Get user detailed information",
            description = "Given staff's code then this will return the detailed information of the specified user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully retrieved"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The user resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @GetMapping("/{staffCode}")
    @ResponseStatus(HttpStatus.OK)
    public SingleUserResponseDto getUserDetailInfo(@PathVariable("staffCode") String staffCode) {
        return userService.getUserDetailInfo(staffCode);
    }

    @Operation(summary = "Check if user has any assignments or not at this moment",
            description = "This check the specified user is having any assignments or not before disabled ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully retrieved"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The user resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @GetMapping("/checking/{staffCode}")
    public void checkExistsByAssigned(@PathVariable("staffCode") String staffCode) {
        userService.checkExistsAssignment(staffCode);
    }

    @Operation(summary = "Disable the specified user",
            description = "This permit to disabled the specified user in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "DELETED - Successfully disabled"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The user resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @DeleteMapping("/{staffCode}")
    public ResponseEntity<UserResponseDto> disableStaff(@PathVariable("staffCode") String staffCode) {
        UserResponseDto dto = userService.disableStaff(staffCode);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
