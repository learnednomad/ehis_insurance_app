package com.swe6623.ehismanagementsystem.Controller;

import com.swe6623.ehismanagementsystem.Model.Dependent;
import com.swe6623.ehismanagementsystem.Service.DependentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/dependents")
public class DependentsController {
    private final DependentsService dependentsService;

    @Autowired
    public DependentsController(DependentsService dependentsService) {
        this.dependentsService = dependentsService;
    }

    @GetMapping
    public List<Dependent> getAllDependents() {
        return dependentsService.getAllDependents();
    }

    @GetMapping("/{dependentID}")
    public ResponseEntity<Dependent> getDependentById(@PathVariable Long dependentID) {
        Optional<Dependent> dependent = dependentsService.getDependentById(dependentID);
        return dependent.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Dependent> createDependent(@RequestBody Dependent dependent) {
        Dependent createdDependent = dependentsService.createDependent(dependent);
        return new ResponseEntity<>(createdDependent, HttpStatus.CREATED);
    }

    @PutMapping("/{dependentID}")
    public ResponseEntity<Dependent> updateDependent(@PathVariable Long dependentID, @RequestBody Dependent dependent) {
        Dependent updatedDependent = dependentsService.updateDependent(dependentID, dependent);
        return new ResponseEntity<>(updatedDependent, HttpStatus.OK);
    }

    @DeleteMapping("/{dependentID}")
    public ResponseEntity<Void> deleteDependent(@PathVariable Long dependentID) {
        dependentsService.deleteDependent(dependentID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
