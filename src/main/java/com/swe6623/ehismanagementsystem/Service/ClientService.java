package com.swe6623.ehismanagementsystem.Service;

import com.swe6623.ehismanagementsystem.DTO.ClientDto;
import com.swe6623.ehismanagementsystem.DTO.ClientDtoMapper;
import com.swe6623.ehismanagementsystem.Repository.ClientRepository;
import com.swe6623.ehismanagementsystem.ExceptionHandling.EntityNotFoundException;
import com.swe6623.ehismanagementsystem.Model.Client;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;
    private final ClientDtoMapper clientDtoMapper;

    public List<ClientDto> getAllClients(){
        return clientRepository.findAll().stream().map(clientDtoMapper).collect(Collectors.toList());
    }

    public ClientDto getClientById(Long clientId) {
        Optional<ClientDto> clientOptional = clientRepository.findById(clientId).map(clientDtoMapper);
        if (clientOptional.isPresent()) {
            return clientOptional.get();
        } else {
            throw new EntityNotFoundException("Client with ID " + clientId + " not found");
        }
    }

    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    public Client updateClient(Long clientId, Client updatedClient) {
        Optional<Client> clientOptional = clientRepository.findById(clientId);
        if (clientOptional.isPresent()) {
            Client client = clientOptional.get();
            client.setFirst_name(updatedClient.getFirst_name());
            client.setLast_name(updatedClient.getLast_name());
            client.setDateOfBirth(updatedClient.getDateOfBirth());
            return clientRepository.save(client);
        } else {
            throw new EntityNotFoundException("Client with ID " + clientId + " not found");
        }
    }

    public void deleteClient(Long clientId) {
        clientRepository.deleteById(clientId);
    }




}

