package com.swe6623.ehismanagementsystem.Policies.repository;

import com.swe6623.ehismanagementsystem.Policies.model.PolicyItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyItemRepository extends JpaRepository<PolicyItem, Long> {
}
