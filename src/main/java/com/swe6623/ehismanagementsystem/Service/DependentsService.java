package com.swe6623.ehismanagementsystem.Service;

import com.swe6623.ehismanagementsystem.Repository.DependentsRepository;
import com.swe6623.ehismanagementsystem.Model.Dependent;
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

    public List<Dependent> getAllDependents() {
        return dependentsRepository.findAll();
    }

    public Optional<Dependent> getDependentById(Long dependentID) {
        return dependentsRepository.findById(dependentID);
    }

    public Dependent createDependent(Dependent dependent) {
        // Check the maximum constraint of four dependents per client
        if (dependent.getClient().getDependents().size() < 4) {
            return dependentsRepository.save(dependent);
        } else {
            throw new IllegalArgumentException("Maximum dependents limit reached for the client.");
        }
    }

    public Dependent updateDependent(Long dependentID, Dependent dependent) {
        dependent.setDependentID(dependentID);
        return dependentsRepository.save(dependent);
    }

    public void deleteDependent(Long dependentID) {
        dependentsRepository.deleteById(dependentID);
    }
}
