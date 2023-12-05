package com.swe6623.ehismanagementsystem.DTO;

public record PolicyProviderDTO(
         long provider_id,
         String provider_name,
         String provider_address,
         String contact_person,
         String phone_number,
         String email) {
}
