package com.swe6623.ehismanagementsystem.Repository;


import com.swe6623.ehismanagementsystem.Model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitsRepository extends JpaRepository<Visit, Long> {

}
