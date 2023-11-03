package com.swe6623.ehismanagementsystem.Hospital;


import com.swe6623.ehismanagementsystem.Claims.Claims;
import com.swe6623.ehismanagementsystem.HealthServices.HealthServices;
import jakarta.persistence.*;
import lombok.Data;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int hospitalID;
    private String hospital_name;
    private String address;
    private String phone_number;

    @OneToMany(mappedBy = "hospital", orphanRemoval = true)
    private Set<Claims> claims = new LinkedHashSet<>();


    @ManyToMany
    @JoinTable(
            name = "hospital_services",
            joinColumns = @JoinColumn(name = "hospital_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id"))
    private Set<HealthServices> offeredServices;
}
