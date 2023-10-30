package com.swe6623.ehismanagementsystem.Claims;

import com.swe6623.ehismanagementsystem.Client.Client;
import com.swe6623.ehismanagementsystem.Hospital.Hospital;
import com.swe6623.ehismanagementsystem.Policies.model.Policy;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Claims {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long claimId;

    @ManyToOne
    @JoinColumn(name = "policyID")
    private Policy policy;

    @ManyToOne
    @JoinColumn(name = "hospitalID")
    private Hospital hospital;


    @ManyToOne
    @JoinColumn(name = "clientId")
    private Client client;



    private LocalDateTime dateOfService;
    private String diagnosisCodes;
    private String procedureCodes;
    private double claimAmount;
    private String claimStatus;

}
