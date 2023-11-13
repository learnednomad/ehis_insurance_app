package com.swe6623.ehismanagementsystem.DTO;

import com.swe6623.ehismanagementsystem.UserAccount.AppUser;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppUserDto {

    private Long id; // Optional, might be used for updating an existing user
    private String username;
    private String password; // Note: This should be handled with care due to security concerns
    private Long clientId; // Optional: used if the user is associated with a client
    private Long hospitalId; // Optional: used if the user is associated with a hospital

    // Additional fields can be included as needed, such as email, contact information, etc.

    // Lombok annotations will generate constructors, getters, setters, and a toString method.
}
