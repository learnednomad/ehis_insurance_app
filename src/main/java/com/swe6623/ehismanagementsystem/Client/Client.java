package com.swe6623.ehismanagementsystem.Client;

import com.swe6623.ehismanagementsystem.Claims.Claims;
import com.swe6623.ehismanagementsystem.Dependents.Dependents;
import com.swe6623.ehismanagementsystem.Policies.model.Policy;
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
    @CreationTimestamp
    private LocalDateTime created_on;
    @UpdateTimestamp
    private LocalDateTime modified_on;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_id")
    private Policy policy;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Claims> claimses = new LinkedHashSet<>();

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Dependents> dependents = new LinkedHashSet<>();

}
