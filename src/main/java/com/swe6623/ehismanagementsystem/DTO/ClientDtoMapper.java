package com.swe6623.ehismanagementsystem.DTO;

import com.swe6623.ehismanagementsystem.Model.Client;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ClientDtoMapper implements Function<Client, ClientDto> {

    @Override
    public ClientDto apply(Client client) {
        return new ClientDto(
                client.getClientId(),
                client.getFirst_name(),
                client.getLast_name(),
                client.getDateOfBirth(),
                client.getPhone_number(),
                client.getEmail(),
                client.getPolicy().getPolicyName(),
                client.getPolicy().getPremium(),
                client.getPolicy().getStartDate(),
                client.getPolicy().getEndDate()
        );

    }
}
