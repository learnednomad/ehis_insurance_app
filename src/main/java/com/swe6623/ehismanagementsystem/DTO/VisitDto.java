package com.swe6623.ehismanagementsystem.DTO;

import java.time.LocalDateTime;

public record VisitDto(Long clientClientId,
                       Long visitID,
                       String clientFirst_name,
                       String clientLast_name,
                       String hospitalHospital_name,
                       LocalDateTime date,
                       long hospitalHospitalID,

                       String serviceProvided,
                       int serviceCost){

}
