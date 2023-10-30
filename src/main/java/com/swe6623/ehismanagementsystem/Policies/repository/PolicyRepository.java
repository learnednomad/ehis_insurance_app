package com.swe6623.ehismanagementsystem.Policies.repository;

import com.swe6623.ehismanagementsystem.Policies.model.Policy;
import com.swe6623.ehismanagementsystem.PolicyProvider.PolicyProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
}
