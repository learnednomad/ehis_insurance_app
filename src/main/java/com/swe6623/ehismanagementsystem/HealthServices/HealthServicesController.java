package com.swe6623.ehismanagementsystem.HealthServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/health-services")
public class HealthServicesController {
    private final HealthServicesService healthServicesService;

    @Autowired
    public HealthServicesController(HealthServicesService healthServicesService) {
        this.healthServicesService = healthServicesService;
    }

    @GetMapping("/")
    public List<HealthServices> getAllHealthServices() {
        return healthServicesService.getAllHealthServices();
    }

    @GetMapping("/{serviceID}")
    public ResponseEntity<HealthServices> getHealthServiceById(@PathVariable Long serviceID) {
        Optional<HealthServices> healthService = healthServicesService.getHealthServicesById(serviceID);
        return healthService.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<HealthServices> createHealthService(@RequestBody HealthServices healthServices) {
        HealthServices createdHealthService = healthServicesService.createHealthService(healthServices);
        return new ResponseEntity<>(createdHealthService, HttpStatus.CREATED);
    }

    @PutMapping("/{serviceID}")
    public ResponseEntity<HealthServices> updateHealthService(@PathVariable Long serviceID, @RequestBody HealthServices healthServices) {
        HealthServices updatedHealthService = healthServicesService.updateHealthService(serviceID, healthServices);
        return new ResponseEntity<>(updatedHealthService, HttpStatus.OK);
    }

    @DeleteMapping("/{serviceID}")
    public ResponseEntity<Void> deleteHealthService(@PathVariable Long serviceID) {
        healthServicesService.deleteHealthService(serviceID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
