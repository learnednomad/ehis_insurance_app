package com.swe6623.ehismanagementsystem.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visitID;

    @ManyToOne
    @JoinColumn(name = "hospitalID")
    private Hospital hospital;

    @ManyToOne
    @JoinColumn(name = "clientID")
    private Client client;

//    @OneToOne(mappedBy = "visit", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Claim claim;

    @ManyToMany
    @JoinTable(
            name = "visit_services",
            joinColumns = @JoinColumn(name = "visitID"),
            inverseJoinColumns = @JoinColumn(name = "serviceID"))
    private Set<HealthService> services;

    private LocalDateTime date;
}
