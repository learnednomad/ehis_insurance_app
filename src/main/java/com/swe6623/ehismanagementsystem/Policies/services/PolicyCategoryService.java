package com.swe6623.ehismanagementsystem.Policies.services;

import com.swe6623.ehismanagementsystem.Policies.model.PolicyCategory;
import com.swe6623.ehismanagementsystem.Policies.repository.PolicyCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyCategoryService {

    @Autowired
    private PolicyCategoryRepository policyCategoryRepository;

    public List<PolicyCategory> getAllPolicyCategories() {
        return policyCategoryRepository.findAll();
    }

    public PolicyCategory getPolicyCategoryById(Long id) {
        return policyCategoryRepository.findById(id).orElse(null);
    }

    public PolicyCategory createPolicyCategory(PolicyCategory policyCategory) {
        return policyCategoryRepository.save(policyCategory);
    }

    public PolicyCategory updatePolicyCategory(Long id, PolicyCategory policyCategory) {
        if (policyCategoryRepository.existsById(id)) {
            policyCategory.setCategoryId(id);
            return policyCategoryRepository.save(policyCategory);
        }
        return null;
    }

    public void deletePolicyCategory(Long id) {
        policyCategoryRepository.deleteById(id);
    }
}
