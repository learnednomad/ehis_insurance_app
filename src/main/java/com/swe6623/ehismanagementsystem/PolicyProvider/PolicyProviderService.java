package com.swe6623.ehismanagementsystem.PolicyProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyProviderService {

    private final PolicyProviderRepository repository;

    @Autowired
    public PolicyProviderService(PolicyProviderRepository repository) {
        this.repository = repository;
    }

    public List<PolicyProvider> getAllProviders() {
        return repository.findAll();
    }

    public Optional<PolicyProvider> getProviderById(Long id) {
        return repository.findById(id);
    }

    public PolicyProvider createProvider(PolicyProvider provider) {
        return repository.save(provider);
    }

    public PolicyProvider updateProvider(Long id, PolicyProvider provider) {
        if (repository.existsById(id)) {
            provider.setProviderID(id);
            return repository.save(provider);
        } else {
            return null; // Handle not found case
        }
    }

    public void deleteProvider(Long id) {
        repository.deleteById(id);
    }
}
