package com.nashtech.assetmanagement.exception;

public class DateInvalidException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public DateInvalidException() {
        super();
    }

    public DateInvalidException(String message) {
        super(message);
    }

    public DateInvalidException(String message, Throwable cause) {
        super(message, cause);
    }

}
