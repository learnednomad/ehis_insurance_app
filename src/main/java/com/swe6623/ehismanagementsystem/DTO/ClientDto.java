package com.swe6623.ehismanagementsystem.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

public record ClientDto(
        Long clientId,
        String firstName,
        String lastName,
        LocalDateTime dateOfBirth,
        String phone_number,
        String email,
        String policyPolicyName,
        double policyPremium,
        LocalDateTime policyStartDate,
        LocalDateTime policyEndDate,
        Long policyPolicyId) {



}
