package com.swe6623.ehismanagementsystem.Dependents;

import com.swe6623.ehismanagementsystem.Client.Client;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Dependents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dependentID;

    @ManyToOne
    @JoinColumn(name = "clientId")
    private Client client;

    private String firstName;
    private String lastName;
    private LocalDateTime dateOfBirth;
    private String gender;
    private String relationship;

}
