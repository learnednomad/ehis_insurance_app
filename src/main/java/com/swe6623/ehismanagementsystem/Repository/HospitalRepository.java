package com.swe6623.ehismanagementsystem.Repository;

import com.swe6623.ehismanagementsystem.Model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {
}
