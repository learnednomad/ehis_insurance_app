package com.swe6623.ehismanagementsystem.Service;


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
    @Autowired
    public ClaimsService(ClaimsRepository claimsRepository) {
        this.claimsRepository = claimsRepository;
    }

    public List<Claim> getAllClaims() {
        return claimsRepository.findAll();
    }

    public Optional<Claim> getClaimById(long claimId) {
        return claimsRepository.findById(claimId);
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
