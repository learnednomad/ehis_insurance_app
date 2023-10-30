package com.swe6623.ehismanagementsystem.Hospital;

import com.swe6623.ehismanagementsystem.Claims.Claims;
import com.swe6623.ehismanagementsystem.HealthServices.HealthServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {
    private final HospitalService hospitalService;

    @Autowired
    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    @GetMapping
    public List<Hospital> getAllHospitals() {
        return hospitalService.getAllHospitals();
    }

    @GetMapping("/{hospitalID}")
    public ResponseEntity<Hospital> getHospitalById(@PathVariable int hospitalID) {
        Optional<Hospital> hospital = hospitalService.getHospitalById(hospitalID);
        return hospital.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Hospital> createHospital(@RequestBody Hospital hospital) {
        Hospital createdHospital = hospitalService.createHospital(hospital);
        return new ResponseEntity<>(createdHospital, HttpStatus.CREATED);
    }

    @PutMapping("/{hospitalID}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable int hospitalID, @RequestBody Hospital hospital) {
        Hospital updatedHospital = hospitalService.updateHospital(hospitalID, hospital);
        return new ResponseEntity<>(updatedHospital, HttpStatus.OK);
    }

    @DeleteMapping("/{hospitalID}")
    public ResponseEntity<Void> deleteHospital(@PathVariable int hospitalID) {
        hospitalService.deleteHospital(hospitalID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // You can add more methods to handle services, claims, or any other related actions.
}
