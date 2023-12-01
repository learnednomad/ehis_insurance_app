package com.swe6623.ehismanagementsystem.Policies.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedHashSet;
import java.util.Set;



@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PolicyCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    private String categoryName;
    private String categoryDetails;

    @ManyToOne
    @JoinColumn(name = "policy_id")
    private Policy policy;

    @OneToMany(mappedBy = "policyCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PolicyItem> policyItems = new LinkedHashSet<>();
}
