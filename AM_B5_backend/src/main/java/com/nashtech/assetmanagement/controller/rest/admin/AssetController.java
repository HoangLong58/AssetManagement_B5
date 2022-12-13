package com.nashtech.assetmanagement.controller.rest.admin;


import com.nashtech.assetmanagement.dto.request.CreateAssetRequestDto;
import com.nashtech.assetmanagement.dto.request.EditAssetRequestDto;
import com.nashtech.assetmanagement.dto.response.*;
import com.nashtech.assetmanagement.enums.AssetState;
import com.nashtech.assetmanagement.service.AssetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Tag(name = "Assets Resources Management",
        description = "Provide the ability of assets management and information")
@RestController
@RequestMapping("/admin/api/assets")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create new asset feature",
            description = "Create new asset with name, installed date , specification and asset state ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "CREATED - Successfully created asset"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    public ResponseAssetDto createAsset(@Valid @RequestBody CreateAssetRequestDto requestCreateAsset) {
        return assetService.createAsset(requestCreateAsset);
    }


    @Operation(summary = "Get someone's own asset",
            description = "Users can view all his/ her assets here")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully retrieved"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The asset resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @GetMapping("/{userId}")
    public ResponseEntity<ListAssetResponseDto> getListAsset(
            @PathVariable("userId") String userId,
            @RequestParam(name = "page") Integer page,
            @RequestParam(name = "size") Integer size,
            @RequestParam(required = false, defaultValue = "", value = "keyword") String keyword,
            @RequestParam(required = false, defaultValue = "", value = "sortBy") String sortBy,
            @RequestParam(required = false, defaultValue = "", value = "sortDirection") String sortDirection,
            @RequestParam(required = false, defaultValue = "", value = "categoryIds") List<String> categoryIds,
            @RequestParam(required = false, defaultValue = "", value = "states") List<String> states) {

        ListAssetResponseDto result = assetService.getListAsset(userId, categoryIds, states, keyword, sortBy,
                sortDirection, page, size);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @Operation(summary = "Retrieved assets by asset code, name or location",
            description = "Get assets with  given name or code and location of asset")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully retrieved"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The asset resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @GetMapping("/searching/{location}")
    public ResponseEntity<?> searchAssetByCodeOrName(@RequestParam("text") String text,
                                                           @PathVariable("location") String locationCode) {
        HashMap<String,Object> hashMap = new HashMap<>();
        List<AssetResponseDto> result = assetService.getAssetByCodeOrNameAndLocationCode(text, locationCode);
        hashMap.put("list_asset", result);
        hashMap.put("total", result.size());
        return ResponseEntity.ok(hashMap);
    }


    @Operation(summary = "Update assets with new information",
            description = "Users provide new information of asset then asset will be updated")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "UPDATED - Successfully updated"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The asset with given ID resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EditAssetResponseDto editAsset(@Valid @RequestBody EditAssetRequestDto editAssetRequest,
                                          @PathVariable("id") String id) {
        return assetService.editAsset(editAssetRequest, id);
    }


    @Operation(summary = "Delete assets",
            description = "If asset is not belonged to any assignments, Admin can delete it")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully processed"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The asset with given ID resource is not found"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @DeleteMapping("/{assetCode}")
    public ResponseEntity<?> deleteAssetByAssetCode(@PathVariable("assetCode") String assetCode) {
        MessageResponse responseMessage = assetService.deleteAssetByAssetCode(assetCode);
        return new ResponseEntity<>(responseMessage, responseMessage.getStatus());
    }

    @Operation(summary = "Get all states of asset",
            description = "This return all of the states of asset entity")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK - Successfully retrieved"),
            @ApiResponse(responseCode = "400",
                    description = "Bad Request - The request is invalid",
                    content = {@Content(examples = {@ExampleObject()})}),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED - The request is unauthorized"),
            @ApiResponse(responseCode = "403", description = "FORBIDDEN - You don’t have permission to access"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND - The asset state resource is not found"),
            @ApiResponse(responseCode = "409",
                    description = "CONFLICT - The asset cannot deleted cause it's already belonged to an existing assignment"),
            @ApiResponse(responseCode = "500",
                    description = "Internal Error - There were some error while processing in server",
                    content = {@Content(examples = {@ExampleObject()})})
    })
    @GetMapping("/asset/states")
    public ResponseEntity<List<AssetState>> getListAssetState() {
        List<AssetState> list = Arrays.asList(AssetState.values());
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
