package com.swe6623.ehismanagementsystem.UserAccount;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.swe6623.ehismanagementsystem.Model.Client;
import com.swe6623.ehismanagementsystem.Model.Hospital;
import com.swe6623.ehismanagementsystem.Model.PolicyProvider;
import com.swe6623.ehismanagementsystem.token.Token;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@Builder
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "app_users")
public class AppUser implements UserDetails {



    @OneToMany(mappedBy = "appUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Token> tokens = new ArrayList<>();

    public AppUser(Client client) {
        this.setClient(client);
        this.setName(client.getFirst_name()+ client.getLast_name());
        this.setPassword("PassWord");
        this.setRole(Roles.CLIENT);
        this.setUsername(client.getEmail());
    }

//    public AppUser(PolicyProvider provider) {
//        this.setProvider(provider);
//        this.setName(provider.getProvider_name());
//        this.setPassword("PassWord");
//        this.setRole(Roles.PROVIDER);
//        this.setUsername(provider.getEmail());
//    }

//    public AppUser(Hospital hospital) {
//        this.setHospital(hospital);
//        this.setName(hospital.getHospital_name());
//        this.setPassword("PassWord");
//        this.setRole(Roles.HOSPITAL);
//        this.setUsername(hospital.getEmail());
//    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // or SEQUENCE, if preferred
    @Column(nullable = false, updatable = false)
    private Long id;

    private String name;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "provider_id")
    private PolicyProvider provider;


    @Column(nullable = false, unique = true)
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING) // Use EnumType.STRING to store the enum value as a String
    @Column(nullable = false)
    private Roles role;

    /////////
    private boolean locked;
    private boolean enabled;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    @Override
    public boolean isEnabled() {
        return enabled;
    }


    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }



}


