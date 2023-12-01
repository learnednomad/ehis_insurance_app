package com.swe6623.ehismanagementsystem.Service;

import com.swe6623.ehismanagementsystem.DTO.HospitalDto;
import com.swe6623.ehismanagementsystem.DTO.HospitalDtoMapper;
import com.swe6623.ehismanagementsystem.Repository.HospitalRepository;
import com.swe6623.ehismanagementsystem.Model.Hospital;
import com.swe6623.ehismanagementsystem.UserAccount.AppUser;
import com.swe6623.ehismanagementsystem.UserAccount.AppUserRepository;
import com.swe6623.ehismanagementsystem.UserAccount.Roles;
import com.swe6623.ehismanagementsystem.security.config.JwtService;
import com.swe6623.ehismanagementsystem.token.Token;
import com.swe6623.ehismanagementsystem.token.TokenRepository;
import com.swe6623.ehismanagementsystem.token.TokenType;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class HospitalService {
    private final HospitalRepository hospitalRepository;
    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final HospitalDtoMapper hospitalDtoMapper;



    public List<HospitalDto> getAllHospitals() {
        return hospitalRepository.findAll().stream().map(hospitalDtoMapper).collect(Collectors.toList());
    }

    public Optional<Hospital> getHospitalById(long hospitalID) {
        return hospitalRepository.findById(hospitalID);
    }

    public Hospital createHospital(Hospital hospital) {
        AppUser user = new AppUser()
                .builder()
                .name(hospital.getHospital_name())
                .username(hospital.getEmail())
                .password(passwordEncoder.encode("pass"))
                .enabled(true)
                .role(Roles.HOSPITAL)
                .hospital(hospital)
                .build();


        var savedUser = userRepository.save(user);
        var jtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jtToken);

        return hospitalRepository.save(hospital);
    }

    public Hospital updateHospital(int hospitalID, Hospital hospital) {
        hospital.setHospitalID(hospitalID);
        return hospitalRepository.save(hospital);
    }

    public void deleteHospital(long hospitalID) {
        hospitalRepository.deleteById(hospitalID);
    }


    private void saveUserToken(AppUser savedUser, String jtToken) {
        var token = Token.builder()
                .appUser(savedUser)
                .token(jtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false).build();
        tokenRepository.save(token);
    }

}
