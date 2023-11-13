package com.swe6623.ehismanagementsystem.DTO;

import com.swe6623.ehismanagementsystem.Model.Visit;
import org.springframework.stereotype.Service;

import java.util.function.Function;


@Service
public class VisitSetMapper implements Function<Visit,VisitDto> {

    @Override
    public VisitDto apply(Visit visit) {
        return new VisitDto(
                visit.getClient().getClientId(),
                visit.getVisitID(),
                visit.getClient().getFirst_name(),
                visit.getClient().getLast_name(),
                visit.getHospital().getHospital_name(),
                visit.getDate(),visit.getHospital().getHospitalID()
        );
    }
}
