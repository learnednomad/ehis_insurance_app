package com.swe6623.ehismanagementsystem.Service;

import com.swe6623.ehismanagementsystem.DTO.AppUserDto;
import com.swe6623.ehismanagementsystem.Model.Client;
import com.swe6623.ehismanagementsystem.Model.Hospital;
import com.swe6623.ehismanagementsystem.Model.PolicyProvider;
import com.swe6623.ehismanagementsystem.Repository.ClientRepository;
import com.swe6623.ehismanagementsystem.Repository.HospitalRepository;
import com.swe6623.ehismanagementsystem.Repository.PolicyProviderRepository;
import com.swe6623.ehismanagementsystem.UserAccount.AppUser;
import com.swe6623.ehismanagementsystem.UserAccount.AppUserRepository;
import com.swe6623.ehismanagementsystem.UserAccount.Roles;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {
    private final static String USER_NOT_FOUND = " user with username %s not found";
    private final AppUserRepository appUserRepository;
    private final ClientRepository clientRepository;
    private final HospitalRepository hospitalRepository;
    private final PolicyProviderRepository policyProviderRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return appUserRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException(String.format(USER_NOT_FOUND,username)));
    }




    public AppUser save(AppUserDto appUserDto){

        // Fetch client and hospital entities by ID
        Client client = clientRepository.findById(appUserDto.clientId())
                .orElseThrow(() -> new IllegalArgumentException("Client with id " + appUserDto.clientId() + " not found"));

        Hospital hospital = hospitalRepository.findById(appUserDto.hospitalId())
                .orElseThrow(() -> new IllegalArgumentException("Hospital with id " + appUserDto.hospitalId() + " not found"));

        PolicyProvider provider = policyProviderRepository.findById(appUserDto.providerProvider_id())
                .orElseThrow(() -> new IllegalArgumentException("Provider with id " + appUserDto.providerProvider_id() + " not found"));

        if (client !=null){
        AppUser user = new AppUser(client);
        return appUserRepository.save(user);

//        }else if(hospital != null){
//            AppUser user = new AppUser(hospital);
//            return appUserRepository.save(user);
//
//        } else if (provider != null) {
//            AppUser user = new AppUser(provider);
//            return appUserRepository.save(user);

        }else {

            AppUser user = new AppUser();
            user.setName(appUserDto.name());
            user.setPassword(appUserDto.password());
            user.setRole(Roles.ADMIN);
            return appUserRepository.save(user);
        }

    }





}
