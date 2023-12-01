package com.swe6623.ehismanagementsystem.Service.Impl;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swe6623.ehismanagementsystem.DTO.VisitDto;
import com.swe6623.ehismanagementsystem.DTO.VisitDtoMapper;
import com.swe6623.ehismanagementsystem.Model.*;
import com.swe6623.ehismanagementsystem.Repository.ClaimsRepository;
import com.swe6623.ehismanagementsystem.Repository.ClientRepository;
import com.swe6623.ehismanagementsystem.Repository.HospitalRepository;
import com.swe6623.ehismanagementsystem.Repository.VisitsRepository;
import com.swe6623.ehismanagementsystem.Service.VisitsService;

@Service
public class VisitsServiceImpl implements VisitsService {


    @Autowired
    private final VisitsRepository visitsRepository;
    private final ClaimsRepository claimsRepository;
    private final VisitDtoMapper visitDtoMapper;
    private final ClientRepository clientRepository;
    private final HospitalRepository hospitalRepository;




    @Autowired
    public VisitsServiceImpl(VisitsRepository visitsRepository, ClaimsRepository claimsRepository, VisitDtoMapper visitDtoMapper, ClientRepository clientRepository, HospitalRepository hospitalRepository) {
        this.visitsRepository = visitsRepository;
        this.claimsRepository = claimsRepository;
        this.visitDtoMapper = visitDtoMapper;
        this.clientRepository = clientRepository;
        this.hospitalRepository = hospitalRepository;
    }

    @Override
    public VisitDto findVisitById(Long id) {
        return visitsRepository.findById(id).map(visitDtoMapper).orElse(null);
    }

    @Override
    public List<VisitDto> findAllVisits() {
        return visitsRepository.findAll().stream().map(visitDtoMapper).collect(Collectors.toList());
    }


    @Override
    public Visit saveVisit(Visit visit) {
        // Save the visit
        Visit savedVisit = visitsRepository.save(visit);

        //Create and save the claim
        createClaimForVisit(savedVisit.getVisitID());

        // Return the saved visit
        return savedVisit;
    }

    @Override
    public Visit saveVisit(VisitDto visitDto) {
        // Fetch client and hospital entities by ID
        Client client = clientRepository.findById(visitDto.clientClientId())
                .orElseThrow(() -> new IllegalArgumentException("Client with id " + visitDto.clientClientId() + " not found"));

        Hospital hospital = hospitalRepository.findById(visitDto.hospitalHospitalID())
                .orElseThrow(() -> new IllegalArgumentException("Hospital with id " + visitDto.hospitalHospitalID() + " not found"));

        // Convert DTO to entity
        Visit visit = new Visit();
        visit.setDate(visitDto.date());
        visit.setClient(client);
        visit.setHospital(hospital);

        // Save the visit
        Visit savedVisit = visitsRepository.save(visit);
        // Create and save the claim
        createClaimForVisit(savedVisit.getVisitID());

        // Return the saved visit
        return savedVisit;
    }

    @Override
    public void deleteVisit(Long id) {
        visitsRepository.deleteById(id);
    }

    @Override
    public Visit updateVisit(VisitDto visitDto) {

        // Fetch client and hospital entities by ID
        Client client = clientRepository.findById(visitDto.clientClientId())
                .orElseThrow(() -> new IllegalArgumentException("Client with id " + visitDto.clientClientId() + " not found"));

        Hospital hospital = hospitalRepository.findById(visitDto.hospitalHospitalID())
                .orElseThrow(() -> new IllegalArgumentException("Hospital with id " + visitDto.hospitalHospitalID() + " not found"));

        // Convert DTO to entity
        Visit visit = visitsRepository.findById(visitDto.visitID())
                .orElseThrow(() -> new IllegalArgumentException("Visit with id " + visitDto.visitID() + " not found"));

        visit.setDate(visitDto.date());
        visit.setClient(client);
        visit.setHospital(hospital);

        // Save the visit
        Visit savedVisit = visitsRepository.save(visit);

        // Return the saved visit
        return savedVisit;
    }



    public Claim createClaimForVisit(Long visitId) {
        // Retrieve the visit from the database
        Visit visit = visitsRepository.findById(visitId).orElse(null);

        if (visit == null) {
            throw new IllegalStateException("Visit with id " + visitId + " does not exist.");
        }

        // Create a new claim instance
        Claim claim = new Claim();
        // Set the details of the claim based on the visit
        claim.setDateOfService(visit.getDate());
        claim.setHospital(visit.getHospital());
        claim.setClient(visit.getClient());
        // Set default or calculated values for the following fields
        claim.setDiagnosisCodes("Default diagnosis");

        claim.setClaimStatus("SUBMITTED");  // or another appropriate default status

        // Save the new claim to the database
        return claimsRepository.save(claim);

    }

    private double calculateClaimAmount(Visit visit) {
        Set<HealthService> services = visit.getServices();
        double amount = 0;
        for (HealthService a:
                services) {
            amount += a.getCost();
        }
        return amount;
    }


    @Override
    public List<VisitDto> findAllVisitsByClient(Long id) {
        return visitsRepository
                .findAllByClient_ClientId(id)
                .stream().map(visitDtoMapper)
                .collect(Collectors.toList());
    }

//    @Override
//    public List<VisitDto> findAllVisitsByClient(String username) {
//       Client client = clientRepository.findClientByAppUserUsername(username);
//        return findAllVisitsByClient(client.getClientId());
//    }


}
