package com.swe6623.ehismanagementsystem.DTO;

import com.swe6623.ehismanagementsystem.Model.Client;
import com.swe6623.ehismanagementsystem.Model.Hospital;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class HospitalDtoMapper implements Function<Hospital,HospitalDto> {
    @Override
    public HospitalDto apply(Hospital hospital) {
        return new HospitalDto(
                hospital.getHospitalID(),
                hospital.getHospital_name(),
                hospital.getAddress(),
                hospital.getPhone_number(),
                hospital.getEmail()
        );
    }
}
