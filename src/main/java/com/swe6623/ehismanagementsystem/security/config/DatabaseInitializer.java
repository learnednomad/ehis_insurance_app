package com.swe6623.ehismanagementsystem.security.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.swe6623.ehismanagementsystem.UserAccount.AppUser;
import com.swe6623.ehismanagementsystem.UserAccount.AppUserRepository;
import com.swe6623.ehismanagementsystem.UserAccount.Roles;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final AppUserRepository userRepository;


    private final PasswordEncoder passwordEncoder;


    public DatabaseInitializer(AppUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Check if an admin user already exists

            // Create an admin user if it doesn't exist

        if (!userRepository.existsByUsername("admin")) {
            // Create an admin user if it doesn't exist
            AppUser adminUser = new AppUser();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("adminPassword"));
            adminUser.setRole(Roles.ADMIN);
            adminUser.setEnabled(true);
            userRepository.save(adminUser);
        }

    }
}
