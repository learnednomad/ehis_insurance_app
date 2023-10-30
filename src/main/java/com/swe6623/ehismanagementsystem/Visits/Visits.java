package com.swe6623.ehismanagementsystem.Visits;

import com.swe6623.ehismanagementsystem.Claims.Claims;
import com.swe6623.ehismanagementsystem.HealthServices.HealthServices;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Visits {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visitID;

    @ManyToOne
    @JoinColumn(name = "claimID")
    private Claims claim;

    @ManyToOne
    @JoinColumn(name = "serviceID")
    private HealthServices service;

    private LocalDateTime date;
    private String providerID;
    private String clientID;
}
