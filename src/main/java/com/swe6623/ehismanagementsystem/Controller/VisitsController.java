package com.swe6623.ehismanagementsystem.Controller;



import com.swe6623.ehismanagementsystem.DTO.VisitDto;
import com.swe6623.ehismanagementsystem.Model.Visit;
import com.swe6623.ehismanagementsystem.Service.VisitsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/visits")
public class VisitsController {

    private final VisitsService visitsService;

    @Autowired
    public VisitsController(VisitsService visitsService) {
        this.visitsService = visitsService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisitDto> getVisitById(@PathVariable Long id) {
        VisitDto visit = visitsService.findVisitById(id);
        return visit != null ? ResponseEntity.ok(visit) : ResponseEntity.notFound().build();
    }

    @GetMapping("/")
    public List<VisitDto> getAllVisits() {
        return visitsService.findAllVisits();
    }


    @GetMapping("clients/{id}")
    public List<VisitDto> getClientVisits(@PathVariable Long id) {

        return visitsService.findAllVisitsByClient(id);
    }

    @PostMapping("/add-visit")
    public Visit createVisit(@RequestBody VisitDto visit) {
        return visitsService.saveVisit(visit);
    }

    @PutMapping("/{id}")
    public Visit updateVisit(@PathVariable Long id, @RequestBody VisitDto visit) {
        // Assuming that the visit with the given ID exists, update it
        return visitsService.updateVisit(visit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        visitsService.deleteVisit(id);
        return ResponseEntity.ok().build();
    }
}
