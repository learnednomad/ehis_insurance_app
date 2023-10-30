package com.swe6623.ehismanagementsystem.Policies.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class PolicyItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemID;
    private String itemName;
    private String itemDescription;
    private double itemCoverage;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private PolicyCategory policyCategory;
}
