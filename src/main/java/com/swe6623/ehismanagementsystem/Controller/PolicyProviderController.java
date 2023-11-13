package com.swe6623.ehismanagementsystem.Controller;

import com.swe6623.ehismanagementsystem.Model.PolicyProvider;
import com.swe6623.ehismanagementsystem.Service.PolicyProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/providers")
public class PolicyProviderController {

    private final PolicyProviderService service;

    @Autowired
    public PolicyProviderController(PolicyProviderService service) {
        this.service = service;
    }

    @GetMapping("/")
    @ResponseBody
    public List<PolicyProvider> getAllProviders() {
        return service.getAllProviders();
    }

    @GetMapping("/{id}")
    public Optional<PolicyProvider> getProviderById(@PathVariable Long id) {
        return service.getProviderById(id);
    }

//    @PostMapping("/add-provider")
//    public PolicyProvider createProvider(@RequestBody PolicyProvider provider) {
//        return service.createProvider(provider);
//    }


    @PostMapping("/add-provider")
    public ResponseEntity<?> createProvider(@RequestBody PolicyProvider provider) {
        try {
            PolicyProvider createdProvider = service.createProvider(provider);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProvider);
        } catch (Exception e) {
            // Handle the exception, log it, and return an error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON data: " + e.getMessage());
        }
    }

//    @PutMapping("/{id}")
//    public PolicyProvider updateProvider(@PathVariable Long id, @RequestBody PolicyProvider provider) {
//        return service.updateProvider(id, provider);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProvider(@PathVariable Long id, @RequestBody PolicyProvider provider) {
        try {
            PolicyProvider updatedProvider = service.updateProvider(id, provider);
            return ResponseEntity.ok(updatedProvider);
        } catch (Exception e) {
            // Handle the exception, log it, and return an error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON data: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteProvider(@PathVariable Long id) {
        service.deleteProvider(id);
    }
}

