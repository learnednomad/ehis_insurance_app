package com.swe6623.ehismanagementsystem.Service;

import com.swe6623.ehismanagementsystem.DTO.VisitCreateDto;
import com.swe6623.ehismanagementsystem.DTO.VisitDto;
import com.swe6623.ehismanagementsystem.Model.Visit;
import java.util.List;

public interface VisitsService {
    VisitDto findVisitById(Long id);
    List<VisitDto> findAllVisits();
    Visit saveVisit(Visit visit);

    Visit saveVisit(VisitDto visitDto);

    void deleteVisit(Long id);
}
