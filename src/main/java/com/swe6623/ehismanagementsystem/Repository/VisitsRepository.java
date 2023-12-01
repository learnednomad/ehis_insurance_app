package com.swe6623.ehismanagementsystem.Repository;


import com.swe6623.ehismanagementsystem.Model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitsRepository extends JpaRepository<Visit, Long> {
    List<Visit> findAllByClient_ClientId(Long clientId);

    List<Visit> findAllByClient_AppUser_Name(String username);

    List<Visit> findAllByHospital_HospitalID(Long hospitalId);
}
