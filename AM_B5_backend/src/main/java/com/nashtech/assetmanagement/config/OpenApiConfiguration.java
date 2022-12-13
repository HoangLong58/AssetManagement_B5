package com.nashtech.assetmanagement.config;


import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

@Configuration
public class OpenApiConfiguration {

    @Bean
    public OpenAPI openApi() {
        final String securitySchemeName = "BearerAuth";
        final String apiTitle = String.format("%s API", StringUtils.capitalize("Asset Management"));

        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(
                        new Components()
                                .addSecuritySchemes(securitySchemeName,
                                        new SecurityScheme()
                                                .name(securitySchemeName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                )
                .info(new Info().title(apiTitle).version("1.0"))

                .info(new Info()
                        .title("Asset Management Project")
                        .description("This document is specified by Group Java 2 - Rookies Batch 5")
                        .version("v1.0")
                        .contact(new Contact()
                                .name("Rookies B5 JAVA 02")
                                .url("#")
                                .email("#"))
                        .termsOfService("TOS")
                        .license(new License().name("License").url("#"))
                );

    }
}
