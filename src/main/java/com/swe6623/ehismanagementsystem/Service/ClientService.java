package com.swe6623.ehismanagementsystem.Service;

import com.swe6623.ehismanagementsystem.DTO.ClientDto;
import com.swe6623.ehismanagementsystem.DTO.ClientDtoMapper;
import com.swe6623.ehismanagementsystem.Policies.model.Policy;
import com.swe6623.ehismanagementsystem.Policies.repository.PolicyRepository;
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
    private final PolicyRepository policyRepository;

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


    public Client createClient(ClientDto clientdto) {
        Policy policy = policyRepository.findByPolicyId(clientdto.policyPolicyId());
        Client client = new Client();
        client.setFirst_name(clientdto.firstName());
        client.setLast_name(clientdto.lastName());
        client.setDateOfBirth(clientdto.dateOfBirth());
        client.setPhone_number(clientdto.phone_number());
        client.setEmail(clientdto.email());
        client.setPolicy(policy);
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

