package com.swe6623.ehismanagementsystem.HealthServices;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthServicesRepository extends JpaRepository<HealthServices, Long> {

}
