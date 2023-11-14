package com.swe6623.ehismanagementsystem.Model;

import com.swe6623.ehismanagementsystem.Policies.model.Policy;
import com.swe6623.ehismanagementsystem.UserAccount.AppUser;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Builder
@Entity
@Table(name = "client_table")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clientId;
    private String first_name;
    private String last_name;
    private LocalDateTime dateOfBirth;
    private String photo_url;
    private String phone_number;
    private String email;
    private String address;

    @CreationTimestamp
    private LocalDateTime created_on;
    @UpdateTimestamp
    private LocalDateTime modified_on;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_id")
    private Policy policy;

    @OneToOne(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private AppUser appUser;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Claim> claims = new LinkedHashSet<>();

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Dependent> dependents = new LinkedHashSet<>();

    // Add a list of visits associated with the client
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Visit> visits = new LinkedHashSet<>();

}
