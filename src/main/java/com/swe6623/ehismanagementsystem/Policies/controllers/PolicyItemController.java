package com.swe6623.ehismanagementsystem.Policies.controllers;

import com.swe6623.ehismanagementsystem.Policies.model.PolicyItem;
import com.swe6623.ehismanagementsystem.Policies.services.PolicyItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/policy-items")
public class PolicyItemController {

    private final PolicyItemService policyItemService;

    @Autowired
    public PolicyItemController(PolicyItemService policyItemService) {
        this.policyItemService = policyItemService;
    }


    // GET: Get all policy items
    @GetMapping("/")
    public ResponseEntity<List<PolicyItem>> getAllPolicyItems() {
        List<PolicyItem> policyItems = policyItemService.getAllPolicyItems();
        return new ResponseEntity<>(policyItems, HttpStatus.OK);
    }

    // GET: Get a policy item by ID
    @GetMapping("/{id}")
    public ResponseEntity<PolicyItem> getPolicyItemById(@PathVariable Long id) {
        Optional<PolicyItem> policyItem = policyItemService.getPolicyItemById(id);
        if (policyItem.isPresent()) {
            return new ResponseEntity<>(policyItem.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // POST: Create a new policy item
    @PostMapping("/")
    public ResponseEntity<PolicyItem> createPolicyItem(@RequestBody PolicyItem policyItem) {
        PolicyItem createdItem = policyItemService.createPolicyItem(policyItem);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    // PUT: Update a policy item
    @PutMapping("/{id}")
    public ResponseEntity<PolicyItem> updatePolicyItem(@PathVariable Long id, @RequestBody PolicyItem policyItem) {
        PolicyItem updatedItem = policyItemService.updatePolicyItem(id, policyItem);
        if (updatedItem != null) {
            return new ResponseEntity<>(updatedItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE: Delete a policy item by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePolicyItem(@PathVariable Long id) {
        policyItemService.deletePolicyItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
