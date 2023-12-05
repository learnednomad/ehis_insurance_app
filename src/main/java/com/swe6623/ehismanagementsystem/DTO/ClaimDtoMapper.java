package com.swe6623.ehismanagementsystem.DTO;

import com.swe6623.ehismanagementsystem.Model.Claim;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ClaimDtoMapper implements Function<Claim,ClaimDto> {
    @Override
    public ClaimDto apply(Claim claim) {
        return new ClaimDto(
                claim.getClaimId(),
                claim.getClient().getClientId(),
                claim.getClient().getFirst_name(),
                claim.getClient().getLast_name(),
                claim.getDateOfService(),
                claim.getClaimAmount(),
                claim.getClaimStatus(),
                claim.getHospital().getHospitalID(),
                claim.getHospital().getHospital_name(),
                claim.getDiagnosisCodes()
        );

    }
}







