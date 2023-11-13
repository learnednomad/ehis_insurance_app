package com.swe6623.ehismanagementsystem.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Dependent {

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
