package com.nashtech.assetmanagement.controller.rest.admin;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nashtech.assetmanagement.enums.AssetState;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/admin/api/asset-states")
public class AssetStateController {

	@GetMapping
	public ResponseEntity<List<AssetState>> getListAssetState() {
		List<AssetState> list = Arrays.asList(AssetState.values());
		return new ResponseEntity<List<AssetState>>(list, HttpStatus.OK);
	}
}
