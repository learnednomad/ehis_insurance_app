package com.swe6623.ehismanagementsystem.Dependents;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DependentsService {
    private final DependentsRepository dependentsRepository;

    @Autowired
    public DependentsService(DependentsRepository dependentsRepository) {
        this.dependentsRepository = dependentsRepository;
    }

    public List<Dependents> getAllDependents() {
        return dependentsRepository.findAll();
    }

    public Optional<Dependents> getDependentById(Long dependentID) {
        return dependentsRepository.findById(dependentID);
    }

    public Dependents createDependent(Dependents dependent) {
        // Check the maximum constraint of four dependents per client
        if (dependent.getClient().getDependents().size() < 4) {
            return dependentsRepository.save(dependent);
        } else {
            throw new IllegalArgumentException("Maximum dependents limit reached for the client.");
        }
    }

    public Dependents updateDependent(Long dependentID, Dependents dependent) {
        dependent.setDependentID(dependentID);
        return dependentsRepository.save(dependent);
    }

    public void deleteDependent(Long dependentID) {
        dependentsRepository.deleteById(dependentID);
    }
}
