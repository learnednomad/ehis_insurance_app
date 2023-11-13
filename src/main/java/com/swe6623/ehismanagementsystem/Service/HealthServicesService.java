package com.swe6623.ehismanagementsystem.Service;

import com.swe6623.ehismanagementsystem.Repository.HealthServicesRepository;
import com.swe6623.ehismanagementsystem.Model.HealthService;
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

    public List<HealthService> getAllHealthServices() {
        return healthServicesRepository.findAll();
    }

    public Optional<HealthService> getHealthServicesById(Long serviceID) {
        return healthServicesRepository.findById(serviceID);
    }

    public HealthService createHealthService(HealthService healthService) {
        return healthServicesRepository.save(healthService);
    }

    public HealthService updateHealthService(Long serviceID, HealthService healthService) {
        healthService.setServiceID(serviceID);
        return healthServicesRepository.save(healthService);
    }

    public void deleteHealthService(Long serviceID) {
        healthServicesRepository.deleteById(serviceID);
    }
}
