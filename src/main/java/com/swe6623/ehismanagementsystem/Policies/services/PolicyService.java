package com.swe6623.ehismanagementsystem.Policies.services;

import com.swe6623.ehismanagementsystem.Policies.model.Policy;
import com.swe6623.ehismanagementsystem.Policies.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }


    public Policy getPolicyById(Long id) {
        return policyRepository.findById(id).orElse(null);
    }

    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    public Policy updatePolicy(Long id, Policy policy) {
        if (policyRepository.existsById(id)) {
            policy.setPolicyId(id);
            return policyRepository.save(policy);
        }
        return null;
    }

    public void deletePolicy(Long id) {
        policyRepository.deleteById(id);
    }
}
