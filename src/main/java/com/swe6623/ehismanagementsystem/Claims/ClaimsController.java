package com.swe6623.ehismanagementsystem.Claims;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/claims")
public class ClaimsController {
    private final ClaimsService claimsService;

    @Autowired
    public ClaimsController(ClaimsService claimsService) {
        this.claimsService = claimsService;
    }

    @GetMapping
    public List<Claims> getAllClaims() {
        return claimsService.getAllClaims();
    }

    @GetMapping("/{claimId}")
    public ResponseEntity<Claims> getClaimById(@PathVariable long claimId) {
        Optional<Claims> claim = claimsService.getClaimById(claimId);
        return claim.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Claims> createClaim(@RequestBody Claims claim) {
        Claims createdClaim = claimsService.createClaim(claim);
        return new ResponseEntity<>(createdClaim, HttpStatus.CREATED);
    }

    @PutMapping("/{claimId}")
    public ResponseEntity<Claims> updateClaim(@PathVariable long claimId, @RequestBody Claims claim) {
        Claims updatedClaim = claimsService.updateClaim(claimId, claim);
        return new ResponseEntity<>(updatedClaim, HttpStatus.OK);
    }

    @DeleteMapping("/{claimId}")
    public ResponseEntity<Void> deleteClaim(@PathVariable long claimId) {
        claimsService.deleteClaim(claimId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
