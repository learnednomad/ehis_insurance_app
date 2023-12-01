package com.swe6623.ehismanagementsystem.security.auth;


import com.swe6623.ehismanagementsystem.UserAccount.Roles;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
//    private String email;

    private String username;
    String password;
}
