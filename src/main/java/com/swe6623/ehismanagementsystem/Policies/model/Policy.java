package com.swe6623.ehismanagementsystem.Policies.model;

import com.swe6623.ehismanagementsystem.Model.Client;
import com.swe6623.ehismanagementsystem.Model.PolicyProvider;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long policyId;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private PolicyProvider provider;

    private String policyName;
    private String coverageDetails;
    private double premium;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @OneToMany(mappedBy = "policy", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PolicyCategory> policyCategories = new LinkedHashSet<>();

    @OneToMany(mappedBy = "policy")
    private Set<Client> clients = new LinkedHashSet<>();
}
