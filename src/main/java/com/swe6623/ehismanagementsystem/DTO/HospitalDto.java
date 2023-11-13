package com.swe6623.ehismanagementsystem.DTO;

import com.swe6623.ehismanagementsystem.Model.HealthService;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HospitalDto {

    private int hospitalID;
    private String hospital_name;
    private String address;
    private String phone_number;
    private Set<HealthServicesDto> offeredServices;

    /**
     * DTO for {@link HealthService}
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class HealthServicesDto implements Serializable {
        private Long serviceID;
        private String serviceName;
        private String description;
        private double cost;
    }
}
