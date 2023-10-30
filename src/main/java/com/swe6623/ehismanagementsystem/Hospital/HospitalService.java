package com.swe6623.ehismanagementsystem.Hospital;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {
    private final HospitalRepository hospitalRepository;

    @Autowired
    public HospitalService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Optional<Hospital> getHospitalById(int hospitalID) {
        return hospitalRepository.findById(hospitalID);
    }

    public Hospital createHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public Hospital updateHospital(int hospitalID, Hospital hospital) {
        hospital.setHospitalID(hospitalID);
        return hospitalRepository.save(hospital);
    }

    public void deleteHospital(int hospitalID) {
        hospitalRepository.deleteById(hospitalID);
    }
}
