package com.swe6623.ehismanagementsystem.Repository;

import com.swe6623.ehismanagementsystem.Model.Claim;
import com.swe6623.ehismanagementsystem.Model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimsRepository extends JpaRepository<Claim, Long> {
    List<Claim> findAllByClient_ClientId(Long clientId);
    List<Claim> findAllByHospital_HospitalID(Long hospitalId);
}
