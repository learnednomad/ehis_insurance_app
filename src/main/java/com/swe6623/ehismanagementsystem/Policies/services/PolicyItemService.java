package com.swe6623.ehismanagementsystem.Policies.services;

import com.swe6623.ehismanagementsystem.Policies.model.PolicyItem;
import com.swe6623.ehismanagementsystem.Policies.repository.PolicyItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyItemService {

    private final PolicyItemRepository policyItemRepository;

    @Autowired
    public PolicyItemService(PolicyItemRepository policyItemRepository) {
        this.policyItemRepository = policyItemRepository;
    }

    public List<PolicyItem> getAllPolicyItems() {
        return policyItemRepository.findAll();
    }

    public Optional<PolicyItem> getPolicyItemById(Long id) {
        return policyItemRepository.findById(id);
    }

    public PolicyItem createPolicyItem(PolicyItem policyItem) {
        // You can perform additional validation or business logic here if needed
        return policyItemRepository.save(policyItem);
    }

    public PolicyItem updatePolicyItem(Long id, PolicyItem policyItem) {
        if (policyItemRepository.existsById(id)) {
            policyItem.setItemID(id);
            return policyItemRepository.save(policyItem);
        }
        return null; // Handle not found case
    }

    public void deletePolicyItem(Long id) {
        policyItemRepository.deleteById(id);
    }
}



