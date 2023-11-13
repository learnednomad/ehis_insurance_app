package com.swe6623.ehismanagementsystem.UserAccount;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.swe6623.ehismanagementsystem.Model.Client;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "app_users")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // or SEQUENCE, if preferred
    @Column(nullable = false, updatable = false)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id")
    private Client client;

    @Column(nullable = false, unique = true)
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING) // Use EnumType.STRING to store the enum value as a String
    @Column(nullable = false)
    private UserRole role;
}

enum UserRole {
    ADMIN, CLIENT, HOSPITAL
}
