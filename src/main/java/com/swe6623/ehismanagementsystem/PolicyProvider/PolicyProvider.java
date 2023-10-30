package com.swe6623.ehismanagementsystem.PolicyProvider;

import com.swe6623.ehismanagementsystem.Policies.model.Policy;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "provider_table")
public class PolicyProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long provider_id;

    private String provider_name;
    private String provider_address;
    private String contact_person;
    private String phone_number;

    @CreationTimestamp
    private LocalDateTime date_created;
    @UpdateTimestamp
    private LocalDateTime date_modified;

    @OneToMany(mappedBy = "provider", orphanRemoval = true)
    private Set<Policy> policies = new LinkedHashSet<>();

    public void setProviderID(Long id) {
    }
}
