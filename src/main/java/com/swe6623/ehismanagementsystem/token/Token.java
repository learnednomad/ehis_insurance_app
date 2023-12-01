package com.swe6623.ehismanagementsystem.token;


import com.swe6623.ehismanagementsystem.UserAccount.AppUser;
import com.swe6623.ehismanagementsystem.UserAccount.Roles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Token {
    @Id
    @GeneratedValue
    private Long id;

    private String token;

    @Enumerated(value = EnumType.STRING)
    private TokenType tokenType;


    private boolean expired;
    private boolean revoked;

    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private AppUser appUser;
}
