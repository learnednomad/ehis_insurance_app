package com.swe6623.ehismanagementsystem.DTO;

import com.swe6623.ehismanagementsystem.UserAccount.AppUser;

import com.swe6623.ehismanagementsystem.UserAccount.Roles;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;

//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@ToString
public record AppUserDto(Long id, // Optional, might be used for updating an existing user
                         String username,
                         String name,
                         String password, // Note: This should be handled with care due to security concerns
                         Long clientId,// Optional: used if the user is associated with a client
                         Long hospitalId,
                         long providerProvider_id, Roles role, boolean locked, boolean enabled){
}
