package com.swe6623.ehismanagementsystem.HealthServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HealthServicesService {
    private final HealthServicesRepository healthServicesRepository;

    @Autowired
    public HealthServicesService(HealthServicesRepository healthServicesRepository) {
        this.healthServicesRepository = healthServicesRepository;
    }

    public List<HealthServices> getAllHealthServices() {
        return healthServicesRepository.findAll();
    }

    public Optional<HealthServices> getHealthServicesById(Long serviceID) {
        return healthServicesRepository.findById(serviceID);
    }

    public HealthServices createHealthService(HealthServices healthServices) {
        return healthServicesRepository.save(healthServices);
    }

    public HealthServices updateHealthService(Long serviceID, HealthServices healthServices) {
        healthServices.setServiceID(serviceID);
        return healthServicesRepository.save(healthServices);
    }

    public void deleteHealthService(Long serviceID) {
        healthServicesRepository.deleteById(serviceID);
    }
}
