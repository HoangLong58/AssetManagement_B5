package com.nashtech.assetmanagement.controller.rest.user;

import com.nashtech.assetmanagement.dto.request.ChangePassRequestDto;
import com.nashtech.assetmanagement.dto.request.FirstLoginRequestDto;
import com.nashtech.assetmanagement.dto.request.UserRequestDto;
import com.nashtech.assetmanagement.dto.response.LocationResponseDto;
import com.nashtech.assetmanagement.dto.response.MessageResponse;
import com.nashtech.assetmanagement.dto.response.UserResponseDto;
import com.nashtech.assetmanagement.dto.response.UserContentResponseDto;
import com.nashtech.assetmanagement.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@Tag(name = "User Password Management",
        description = "Provide the ability of change/ update password of the current user")
@RequestMapping("/users/api")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @Operation(summary = "Update user's password at the first login time",
            description = "This require user to change his/ her password for the first login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "UPDATED - Successfully updated new password"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @PutMapping("/first-login")
    public ResponseEntity<?> changePasswordFirstLogin(@Valid @RequestBody FirstLoginRequestDto requestFirstLogin) {
        MessageResponse responseMessage=
                userService.changePasswordFirstLogin(requestFirstLogin.getUserName(),
                        requestFirstLogin.getNewPassword());

        return new ResponseEntity<>(responseMessage,responseMessage.getStatus());
    }


    @Operation(summary = "Change password",
            description = "Users can change his/ her password to the desired password")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "UPDATED - Successfully updated new password"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "403", description = "CONFLICT - The new password is the same with the old one"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @PutMapping("/password")
    public ResponseEntity<UserResponseDto> changePassword(@Valid @RequestBody ChangePassRequestDto requestChangePassDto){
        return ResponseEntity.ok(userService.changePassword(requestChangePassDto));
    }
}
