package com.swe6623.ehismanagementsystem.Controller;

import com.swe6623.ehismanagementsystem.DTO.ClaimDto;
import com.swe6623.ehismanagementsystem.Service.ClaimsService;
import com.swe6623.ehismanagementsystem.Model.Claim;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/claims")
public class ClaimsController {
    private final ClaimsService claimsService;


    @Autowired
    public ClaimsController(ClaimsService claimsService) {
        this.claimsService = claimsService;
    }

    @GetMapping("/")
    public List<ClaimDto> getAllClaims() {
        return claimsService.getAllClaims();
    }

    @GetMapping("/{claimId}")
    public ResponseEntity<ClaimDto> getClaimById(@PathVariable long claimId) {
        Optional<ClaimDto> claim = claimsService.getClaimById(claimId);
        return claim.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add-claim")
    public ResponseEntity<Claim> createClaim(@RequestBody Claim claim) {
        Claim createdClaim = claimsService.createClaim(claim);
        return new ResponseEntity<>(createdClaim, HttpStatus.CREATED);
    }

    @PutMapping("/{claimId}")
    public ResponseEntity<Claim> updateClaim(@PathVariable long claimId, @RequestBody Claim claim) {
        Claim updatedClaim = claimsService.updateClaim(claimId, claim);
        return new ResponseEntity<>(updatedClaim, HttpStatus.OK);
    }

    @DeleteMapping("/{claimId}")
    public ResponseEntity<Void> deleteClaim(@PathVariable long claimId) {
        claimsService.deleteClaim(claimId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
