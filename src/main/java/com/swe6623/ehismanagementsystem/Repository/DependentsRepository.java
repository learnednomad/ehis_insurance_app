package com.swe6623.ehismanagementsystem.Repository;

import com.swe6623.ehismanagementsystem.Model.Dependent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DependentsRepository extends JpaRepository<Dependent, Long> {
}
