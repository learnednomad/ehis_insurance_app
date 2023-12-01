package com.swe6623.ehismanagementsystem.security.auth;

import java.io.IOException;

import com.swe6623.ehismanagementsystem.Model.Client;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swe6623.ehismanagementsystem.Repository.ClientRepository;
import com.swe6623.ehismanagementsystem.UserAccount.AppUser;
import com.swe6623.ehismanagementsystem.UserAccount.AppUserRepository;
import com.swe6623.ehismanagementsystem.UserAccount.Roles;
import com.swe6623.ehismanagementsystem.security.config.JwtService;
import com.swe6623.ehismanagementsystem.token.Token;
import com.swe6623.ehismanagementsystem.token.TokenRepository;
import com.swe6623.ehismanagementsystem.token.TokenType;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {



    private final ClientRepository clientRepository;


    private final AppUserRepository appUserRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        var user = AppUser
                .builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Roles.CLIENT)
                .enabled(true)
                .build();

        var savedUser = appUserRepository.save(user);
        var jtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        saveUserToken(savedUser, jtToken);
        return AuthenticationResponse
                .builder()
                .access_token(jtToken)
                .referesh_token(refreshToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword())
        );
        var user = appUserRepository.findByUsername(request.getUsername()).orElseThrow(()-> new UsernameNotFoundException("User not found!!"));
        var jtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user,jtToken);

        if (user.getClient() == null){
        return AuthenticationResponse
                .builder()
                .access_token(jtToken)
                .referesh_token(refreshToken)
                .role(user.getRole())
                .build();
        }else if(user.getClient() != null){
            return AuthenticationResponse
                    .builder()
                    .id(user.getClient().getClientId())
                    .access_token(jtToken)
                    .role(user.getRole())
                    .referesh_token(refreshToken)
                    .build();
        }else if(user.getHospital() != null){
            return AuthenticationResponse
                    .builder()
                    .id(user.getHospital().getHospitalID())
                    .access_token(jtToken)
                    .role(user.getRole())
                    .referesh_token(refreshToken)
                    .build();
        }else if(user.getProvider() != null){
            return AuthenticationResponse
                    .builder()
                    .id(user.getProvider().getProvider_id())
                    .access_token(jtToken)
                    .role(user.getRole())
                    .referesh_token(refreshToken)
                    .build();
        }

        return null;
    }

    private void revokeAllUserTokens(AppUser user){
        var validToken = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validToken.isEmpty())
            return;
        validToken.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepository.saveAll(validToken);
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

    public void refreshToken(HttpServletRequest request,
                             HttpServletResponse response) throws IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            return;
        }

        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);

        if (username != null) {
            var user = this.appUserRepository.findByUsername(username).orElseThrow();

            if (jwtService.isTokenValid(refreshToken,user) ){
                var access_token = jwtService.generateToken(user);

                revokeAllUserTokens(user);
                saveUserToken(user,access_token);

                var authResponse = AuthenticationResponse.builder()
                        .access_token(access_token)
                        .referesh_token(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(),authResponse);
            }
        }
    }
}
