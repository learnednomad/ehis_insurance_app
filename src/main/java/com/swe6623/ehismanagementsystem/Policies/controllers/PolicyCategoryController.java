package com.swe6623.ehismanagementsystem.Policies.controllers;

import com.swe6623.ehismanagementsystem.Policies.model.PolicyCategory;
import com.swe6623.ehismanagementsystem.Policies.services.PolicyCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/policy-category")
public class PolicyCategoryController {

    @Autowired
    private PolicyCategoryService policyCategoryService;

    @GetMapping("/")
    public List<PolicyCategory> getAllPolicyCategories() {
        return policyCategoryService.getAllPolicyCategories();
    }

    @GetMapping("/{id}")
    public PolicyCategory getPolicyCategoryById(@PathVariable Long id) {
        return policyCategoryService.getPolicyCategoryById(id);
    }

    @PostMapping
    public PolicyCategory createPolicyCategory(@RequestBody PolicyCategory policyCategory) {
        return policyCategoryService.createPolicyCategory(policyCategory);
    }

    @PutMapping("/{id}")
    public PolicyCategory updatePolicyCategory(@PathVariable Long id, @RequestBody PolicyCategory policyCategory) {
        return policyCategoryService.updatePolicyCategory(id, policyCategory);
    }

    @DeleteMapping("/{id}")
    public void deletePolicyCategory(@PathVariable Long id) {
        policyCategoryService.deletePolicyCategory(id);
    }
}

