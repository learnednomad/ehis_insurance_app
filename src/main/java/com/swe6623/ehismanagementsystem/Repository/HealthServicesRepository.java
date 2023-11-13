package com.swe6623.ehismanagementsystem.Repository;


import com.swe6623.ehismanagementsystem.Model.HealthService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthServicesRepository extends JpaRepository<HealthService, Long> {

}
