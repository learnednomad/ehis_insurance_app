package com.swe6623.ehismanagementsystem.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.swe6623.ehismanagementsystem.ExceptionHandling.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swe6623.ehismanagementsystem.DTO.ClaimDto;
import com.swe6623.ehismanagementsystem.DTO.ClaimDtoMapper;
import com.swe6623.ehismanagementsystem.Model.Claim;
import com.swe6623.ehismanagementsystem.Model.Client;
import com.swe6623.ehismanagementsystem.Model.Hospital;
import com.swe6623.ehismanagementsystem.Repository.ClaimsRepository;
import com.swe6623.ehismanagementsystem.Repository.ClientRepository;
import com.swe6623.ehismanagementsystem.Repository.HospitalRepository;

@Service
public class ClaimsService {
    private final ClaimsRepository claimsRepository;
    private final ClaimDtoMapper claimDtoMapper;
    private final ClientRepository clientRepository;
    private final HospitalRepository hospitalRepository;


    @Autowired
    public ClaimsService(ClaimsRepository claimsRepository, ClaimDtoMapper claimDtoMapper, ClientRepository clientRepository, HospitalRepository hospitalRepository) {
        this.claimsRepository = claimsRepository;
        this.claimDtoMapper = claimDtoMapper;
        this.clientRepository = clientRepository;
        this.hospitalRepository = hospitalRepository;
    }

    public List<ClaimDto> getAllClaims() {
        return claimsRepository.findAll().stream().map(claimDtoMapper).collect(Collectors.toList());
    }

    public Optional<ClaimDto> getClaimById(long claimId) {
        return claimsRepository.findById(claimId).map(claimDtoMapper);
    }

    public List<ClaimDto> getClientClaims(Long clientId) {
        return claimsRepository.findAllByClient_ClientId(clientId).stream().map(claimDtoMapper).collect(Collectors.toList());
    }

    public List<ClaimDto> getHospitalClaims(Long hospitalID) {
        return claimsRepository.findAllByHospital_HospitalID(hospitalID).stream().map(claimDtoMapper).collect(Collectors.toList());
    }

    public Claim createClaim(ClaimDto claim) {
        // Fetch client and hospital entities by ID
        Client client = clientRepository.findById(claim.clientClientId())
                .orElseThrow(() -> new IllegalArgumentException("Client with id " + claim.clientClientId() + " not found"));


        Hospital hospital = hospitalRepository.findById(claim.hospitalHospitalID())
                .orElseThrow(() -> new IllegalArgumentException("Hospital with id " + claim.hospitalHospitalID() + " not found"));


        Claim newC = new Claim().builder()
              .claimAmount(claim.claimAmount())
              .claimStatus(claim.claimStatus())
              .dateOfService(claim.dateOfService())
                .client(client)
                .hospital(hospital)
                .diagnosisCodes(claim.diagnosisCodes()).build();

        return claimsRepository.save(newC);
    }


    public Claim updateClaim(long claimId, ClaimDto claimDto) {

        Optional<Claim> claimOptional = claimsRepository.findById(claimId);
        if (claimOptional.isPresent()){
            Claim claim = claimOptional.get();
            claim.setClaimStatus(claimDto.claimStatus());
            claim.setClaimAmount(claimDto.claimAmount());
            claim.setDateOfService(claimDto.dateOfService());
            claim.setDiagnosisCodes(claimDto.diagnosisCodes());
            return claimsRepository.save(claim);
        }else {
            throw new EntityNotFoundException("Client with ID " + claimId + " not found");

        }


    }


    public Claim saveClaim(ClaimDto claimDto){

        // Fetch client and hospital entities by ID
        Client client = clientRepository.findById(claimDto.clientClientId())
                .orElseThrow(() -> new IllegalArgumentException("Client with id " + claimDto.clientClientId() + " not found"));

        Hospital hospital = hospitalRepository.findById(claimDto.hospitalHospitalID())
                .orElseThrow(() -> new IllegalArgumentException("Hospital with id " + claimDto.hospitalHospitalID() + " not found"));

        // Convert DTO to entity
        Claim claim = new Claim();
        claim.setDateOfService(claimDto.dateOfService());
        claim.setClient(client);
        claim.setHospital(hospital);
        claim.setClaimStatus("SUBMITTED");
        claim.setClaimAmount(claimDto.claimAmount());

        return claimsRepository.save(claim);
    }


    public void deleteClaim(long claimId) {
        claimsRepository.deleteById(claimId);
    }

}
