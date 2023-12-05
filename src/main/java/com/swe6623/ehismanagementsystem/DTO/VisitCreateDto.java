package com.swe6623.ehismanagementsystem.DTO;

public record VisitCreateDto(Long clientId,
                             Long hospitalId,
                             String serviceProvided,
                             int serviceCost,
                             String date) {
    // Add other fields as needed
}
