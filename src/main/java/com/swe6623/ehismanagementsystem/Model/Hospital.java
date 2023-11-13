package com.swe6623.ehismanagementsystem.Model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hospitalID;
    private String hospital_name;
    private String address;
    private String phone_number;

    // Visits are directly associated with the Hospital
    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Visit> visits = new LinkedHashSet<>();

    // Claims are indirectly associated via Visits
    @OneToMany(mappedBy = "hospital", orphanRemoval = true)
    private Set<Claim> claims = new LinkedHashSet<>();

    // Services offered directly by the Hospital
    @ManyToMany
    @JoinTable(
            name = "hospital_services",
            joinColumns = @JoinColumn(name = "hospital_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id"))
    private Set<HealthService> offeredServices;
}
