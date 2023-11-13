package com.swe6623.ehismanagementsystem.Controller;

import com.swe6623.ehismanagementsystem.Service.HealthServicesService;
import com.swe6623.ehismanagementsystem.Model.HealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/health-services")
public class HealthServicesController {
    private final HealthServicesService healthServicesService;

    @Autowired
    public HealthServicesController(HealthServicesService healthServicesService) {
        this.healthServicesService = healthServicesService;
    }

    @GetMapping("/")
    public List<HealthService> getAllHealthServices() {
        return healthServicesService.getAllHealthServices();
    }

    @GetMapping("/{serviceID}")
    public ResponseEntity<HealthService> getHealthServiceById(@PathVariable Long serviceID) {
        Optional<HealthService> healthService = healthServicesService.getHealthServicesById(serviceID);
        return healthService.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<HealthService> createHealthService(@RequestBody HealthService healthService) {
        HealthService createdHealthService = healthServicesService.createHealthService(healthService);
        return new ResponseEntity<>(createdHealthService, HttpStatus.CREATED);
    }

    @PutMapping("/{serviceID}")
    public ResponseEntity<HealthService> updateHealthService(@PathVariable Long serviceID, @RequestBody HealthService healthService) {
        HealthService updatedHealthService = healthServicesService.updateHealthService(serviceID, healthService);
        return new ResponseEntity<>(updatedHealthService, HttpStatus.OK);
    }

    @DeleteMapping("/{serviceID}")
    public ResponseEntity<Void> deleteHealthService(@PathVariable Long serviceID) {
        healthServicesService.deleteHealthService(serviceID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
