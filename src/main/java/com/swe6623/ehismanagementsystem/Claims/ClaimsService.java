package com.swe6623.ehismanagementsystem.Claims;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClaimsService {
    private final ClaimsRepository claimsRepository;

    @Autowired
    public ClaimsService(ClaimsRepository claimsRepository) {
        this.claimsRepository = claimsRepository;
    }

    public List<Claims> getAllClaims() {
        return claimsRepository.findAll();
    }

    public Optional<Claims> getClaimById(long claimId) {
        return claimsRepository.findById(claimId);
    }

    public Claims createClaim(Claims claim) {
        return claimsRepository.save(claim);
    }

    public Claims updateClaim(long claimId, Claims claim) {
        claim.setClaimId(claimId);
        return claimsRepository.save(claim);
    }

    public void deleteClaim(long claimId) {
        claimsRepository.deleteById(claimId);
    }
}
