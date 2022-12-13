package com.nashtech.assetmanagement.repository;


import com.nashtech.assetmanagement.entities.Asset;
import com.nashtech.assetmanagement.entities.Category;
import com.nashtech.assetmanagement.entities.Location;
import com.nashtech.assetmanagement.entities.Users;
import com.nashtech.assetmanagement.enums.AssetState;
import com.nashtech.assetmanagement.repositories.AssetRepository;
import com.nashtech.assetmanagement.repositories.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Sql(scripts = {"file:src/main/resources/data_test.sql"})
@ActiveProfiles("test")
@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class AssetRepositoryTest {
    @Autowired
    AssetRepository assetRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    void dataLoad() {
        assertEquals(3, assetRepository.findAll().size());
    }

    @Test
    void findAssetByNameOrCodeAndLocationCode_ShouldReturnListAsset_WhenNameAndLocationCodeCorrect() {
        List<Asset> assetListByCode = assetRepository.findAssetByNameOrCodeAndLocationCode("lt", "HCM");
        String patternCode = "(.*[Ll][Tt].*)";
        assertTrue(assetListByCode.get(0).getCode().matches(patternCode) || assetListByCode.get(0).getName().matches(patternCode));
        assertThat(assetListByCode.get(0).getLocation().getCode()).isEqualTo("HCM");
        List<Asset> assetListByName = assetRepository.findAssetByNameOrCodeAndLocationCode("lap", "HCM");
        String patternName = (".*[Ll][Aa][Pp].*");
        assertTrue(assetListByName.get(0).getName().matches(patternName) || assetListByName.get(0).getCode().matches(patternName));
        assertThat(assetListByName.get(0).getLocation().getCode()).isEqualTo("HCM");
    }

    //=============US 579=============

    @DisplayName("test for getListAsset by userId and filter: categories, states; search: asset name or code")
    @Test
    void getListAsset_ShouldReturnPageAsset_WhenDataRequestValid() {

        Users users = new Users();
        users.setStaffCode("SD0004");
        users.setUserName("huet");
        userRepository.save(users);

        Location location = new Location();
        location.setCode("HCM");

        Category category = new Category();
        category.setId("PC");

        Asset asset = new Asset("code", "name", "specification", new Date(), AssetState.AVAILABLE, location, category, users);
        Asset asset1 = new Asset("code1", "name", "specification", new Date(), AssetState.NOT_AVAILABLE, location, category, users);
        assetRepository.save(asset);
        assetRepository.save(asset1);

        List<String> listcategories = new ArrayList<>();
        listcategories.add("Laptop");
        listcategories.add("PC");

        List<AssetState> listStates = new ArrayList<>();
        listStates.add(AssetState.ASSIGNED);
        listStates.add(AssetState.AVAILABLE);

        Pageable pageable = PageRequest.of(0, 2);

        Page<Asset> pageAsset = assetRepository.getListAsset("SD0004", listcategories, listStates, "code", pageable);
        assertEquals(1, pageAsset.getTotalPages());
        assertEquals(1, pageAsset.getTotalElements());
    }

    @DisplayName("test for getListAsset by userId and filter: categories ; search: asset name or code")
    @Test
    void getListAssetByCategory_ShouldReturnPageAsset_WhenDataRequestValid() {
        Users users = new Users();
        users.setStaffCode("SD0004");
        users.setUserName("huet");
        userRepository.save(users);

        Location location = new Location();
        location.setCode("HCM");

        Category category = new Category();
        category.setId("PC");

        Asset asset = new Asset("code", "name", "specification", new Date(), AssetState.AVAILABLE, location, category, users);
        Asset asset1 = new Asset("code1", "name", "specification", new Date(), AssetState.AVAILABLE, location, category, users);
        assetRepository.save(asset);
        assetRepository.save(asset1);

        List<String> listcategories = new ArrayList<>();
        listcategories.add("Laptop");
        listcategories.add("PC");

        Pageable pageable = PageRequest.of(0, 2);

        Page<Asset> pageAsset = assetRepository.getListAssetByCategory("SD0004", listcategories, "code1", pageable);
        assertEquals(1, pageAsset.getTotalPages());
        assertEquals(1, pageAsset.getTotalElements());
    }

    @DisplayName("test for getListAsset by userId and filter: states; search: asset name or code")
    @Test
    void getListAssetByState_ShouldReturnPageAsset_WhenDataRequestValid() {
        Users users = new Users();
        users.setStaffCode("SD0004");
        users.setUserName("huet");
        userRepository.save(users);

        Location location = new Location();
        location.setCode("HCM");

        Category category = new Category();
        category.setId("PC");

        Asset asset = new Asset("code", "name", "specification", new Date(), AssetState.AVAILABLE, location, category, users);
        Asset asset1 = new Asset("code1", "name", "specification", new Date(), AssetState.NOT_AVAILABLE, location, category, users);
        assetRepository.save(asset);
        assetRepository.save(asset1);

        List<AssetState> listStates = new ArrayList<>();
        listStates.add(AssetState.ASSIGNED);
        listStates.add(AssetState.NOT_AVAILABLE);

        Pageable pageable = PageRequest.of(0, 2);

        Page<Asset> pageAsset = assetRepository.getListAssetByState("SD0004", listStates, "code1", pageable);
        assertEquals(1, pageAsset.getTotalPages());
        assertEquals(1, pageAsset.getTotalElements());
    }
}
