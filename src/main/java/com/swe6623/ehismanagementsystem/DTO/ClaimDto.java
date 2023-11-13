package com.swe6623.ehismanagementsystem.DTO;

import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

public record ClaimDto(
        long claimId,
        Long clientClientId,
        String clientFirst_name,
        String clientLast_name,
        LocalDateTime dateOfService,
        double claimAmount,
        String claimStatus,
        long hospitalHospitalID,
        String hospitalHospital_name)
{


}
