package com.swe6623.ehismanagementsystem.Repository;

import com.swe6623.ehismanagementsystem.Model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    // You can add custom query methods here if needed

}
