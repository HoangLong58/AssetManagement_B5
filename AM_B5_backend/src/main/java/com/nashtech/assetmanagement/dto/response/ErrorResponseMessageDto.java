package com.nashtech.assetmanagement.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
public class ErrorResponseMessageDto {
    private HttpStatus status;
    private String message;
    private List<String> errors;
    @JsonProperty("timestamp")
    private Date timeStamp;

    public ErrorResponseMessageDto(HttpStatus status, String message, List<String> errors, Date timeStamp) {
        this.timeStamp = timeStamp;
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    public ErrorResponseMessageDto(HttpStatus status, String message, String error, Date timeStamp) {
        this.timeStamp = timeStamp;
        this.status = status;
        this.message = message;
        errors = Arrays.asList(error);
    }

    public ErrorResponseMessageDto(HttpStatus status, String message, Date timeStamp) {
        this.status = status;
        this.message = message;
        this.timeStamp = timeStamp;
    }
}
