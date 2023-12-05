package com.swe6623.ehismanagementsystem.security.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.swe6623.ehismanagementsystem.Model.Client;
import com.swe6623.ehismanagementsystem.UserAccount.Roles;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    @JsonProperty("access_token")
    private String access_token;

    @JsonProperty("refresh_token")
    private String referesh_token;

    @JsonProperty
    private long id;

    private Client client;

    private Roles role;

    private String name;

}
