package com.swe6623.ehismanagementsystem.Model;

import com.swe6623.ehismanagementsystem.Policies.model.Policy;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long claimId;

    @ManyToOne
    @JoinColumn(name = "hospitalID")
    private Hospital hospital;

    @ManyToOne
    @JoinColumn(name = "clientId")
    private Client client;

    // Link to the visit that the claim is based on
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "visitID")
//    private Visit visit;


    private LocalDateTime dateOfService;
    private String diagnosisCodes;
    private String procedureCodes;
    private double claimAmount;
    private String claimStatus;

}
