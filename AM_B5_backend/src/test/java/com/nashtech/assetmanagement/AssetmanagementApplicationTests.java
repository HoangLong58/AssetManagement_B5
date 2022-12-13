package com.nashtech.assetmanagement;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
@Sql(scripts = {"/data_test.sql"})
class AssetmanagementApplicationTests {

    @Test
    void contextLoads() {
    }

}
