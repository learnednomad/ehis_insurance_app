package com.swe6623.ehismanagementsystem.Service;


import com.swe6623.ehismanagementsystem.DTO.ClaimDto;
import com.swe6623.ehismanagementsystem.DTO.ClaimDtoMapper;
import com.swe6623.ehismanagementsystem.Repository.ClaimsRepository;
import com.swe6623.ehismanagementsystem.Model.Claim;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClaimsService {
    private final ClaimsRepository claimsRepository;
    private final ClaimDtoMapper claimDtoMapper;

    @Autowired
    public ClaimsService(ClaimsRepository claimsRepository, ClaimDtoMapper claimDtoMapper) {
        this.claimsRepository = claimsRepository;
        this.claimDtoMapper = claimDtoMapper;
    }

    public List<ClaimDto> getAllClaims() {
        return claimsRepository.findAll().stream().map(claimDtoMapper).collect(Collectors.toList());
    }

    public Optional<ClaimDto> getClaimById(long claimId) {
        return claimsRepository.findById(claimId).map(claimDtoMapper);
    }

    public Claim createClaim(Claim claim) {
        return claimsRepository.save(claim);
    }

    public Claim updateClaim(long claimId, Claim claim) {
        claim.setClaimId(claimId);
        return claimsRepository.save(claim);
    }

    public void deleteClaim(long claimId) {
        claimsRepository.deleteById(claimId);
    }


}
