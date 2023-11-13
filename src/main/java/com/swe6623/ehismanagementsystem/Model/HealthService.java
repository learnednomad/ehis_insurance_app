package com.swe6623.ehismanagementsystem.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class HealthService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceID;
    private String serviceName;
    private String description;
    private double cost;

    @ManyToMany(mappedBy = "offeredServices")
    private Set<Hospital> hospitals;
}
