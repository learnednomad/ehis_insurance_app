package com.swe6623.ehismanagementsystem.UserAccount;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
public interface AppUserRepository extends CrudRepository
        <AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
}
