package com.swe6623.ehismanagementsystem.DTO;


import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HealthServicesDto {

    private Long serviceId;
    private String serviceName;
    private String description;
    private double cost;

}
