package com.nashtech.assetmanagement.controller.rest.admin;

import java.net.URI;
import java.util.List;

import com.nashtech.assetmanagement.dto.request.ChangeAssignmentStateRequestDto;
import com.nashtech.assetmanagement.dto.response.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nashtech.assetmanagement.dto.request.AssignmentRequestDto;
import com.nashtech.assetmanagement.dto.response.AssignmentResponseDto;
import com.nashtech.assetmanagement.dto.response.ListAssignmentResponseDto;
import com.nashtech.assetmanagement.service.AssignmentService;
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

import java.net.URI;
import java.util.List;
import javax.validation.Valid;
@Tag(name = "Assignment Resources Management",
        description = "Provide the ability of assignment management and information")
@RestController
@AllArgsConstructor
@RequestMapping("/admin/api/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;

    @Operation(summary = "Get assignment list",
            description = "This provide assignment list in pagination by default or filtered")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully retrieved"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The assignment resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public ListAssignmentResponseDto getAssignmentListOrderByDefaultOrFilter(
            @RequestParam(
                    value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false)
            int pageNo,
            @RequestParam(
                    value = "pageSize", defaultValue = "20", required = false)
            int pageSize,
            @RequestParam(value = "text", defaultValue = "", required = false) String text,
            @RequestParam(value = "state", defaultValue = "", required = false) List<String> states,
            @RequestParam(value = "assigned-date", defaultValue = "", required = false) String assignedDate
    ) {
        return assignmentService
                .getAssignmentsByCondition(pageNo, pageSize, text, states, assignedDate);
    }


    @Operation(summary = "Create new assignment feature",
            description = "Create new assignment with all properties given")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "CREATED - Successfully created assignment"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @PostMapping()
    public ResponseEntity<AssignmentResponseDto> createNewAssignment(@RequestBody AssignmentRequestDto request) {
        return ResponseEntity.created(URI.create("/admin/api/assignment/create"))
                .body(this.assignmentService.createNewAssignment(request));
    }


    @Operation(summary = "Get list assignment of the specified asset",
            description = "Given asset code then this will return list assignment of the given asset")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully retrieved"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The assignment resource of this asset is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @GetMapping("/{assetId}")
    public ResponseEntity<List<AssignmentResponseDto>> getListAssignmentByAsset(@PathVariable("assetId")String assetId) {
        return new ResponseEntity<>(assignmentService.getListAssignmentByAssetCode(assetId), HttpStatus.OK);
    }

}
