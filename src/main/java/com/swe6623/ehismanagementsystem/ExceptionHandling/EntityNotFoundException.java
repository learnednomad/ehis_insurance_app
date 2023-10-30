package com.swe6623.ehismanagementsystem.ExceptionHandling;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(String message) {
        super(message);
    }
}
