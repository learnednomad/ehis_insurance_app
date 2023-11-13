package com.swe6623.ehismanagementsystem.Controller;

import com.swe6623.ehismanagementsystem.Service.HospitalService;
import com.swe6623.ehismanagementsystem.Model.Hospital;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/hospitals")
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

    @PostMapping("/add-hospital")
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

}
