package com.swe6623.ehismanagementsystem.Policies.repository;

import com.swe6623.ehismanagementsystem.Policies.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
}
