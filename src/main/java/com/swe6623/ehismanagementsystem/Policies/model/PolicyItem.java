package com.swe6623.ehismanagementsystem.Policies.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
