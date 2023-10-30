package com.swe6623.ehismanagementsystem.Client;

import com.swe6623.ehismanagementsystem.ExceptionHandling.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    private final ClientRepository clientRepository;
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClients(){
        return clientRepository.findAll();
    }

    public Client getClientById(Long clientId) {
        Optional<Client> clientOptional = clientRepository.findById(clientId);
        if (clientOptional.isPresent()) {
            return clientOptional.get();
        } else {
            throw new EntityNotFoundException("Client with ID " + clientId + " not found");
        }
    }

    public Client createClient(Client client) {
        // You can add validation logic or other business rules here if needed.
        return clientRepository.save(client);
    }

    public Client updateClient(Long clientId, Client updatedClient) {
        Optional<Client> clientOptional = clientRepository.findById(clientId);
        if (clientOptional.isPresent()) {
            Client client = clientOptional.get();
            client.setFirst_name(updatedClient.getFirst_name());
            client.setLast_name(updatedClient.getLast_name());
            client.setDateOfBirth(updatedClient.getDateOfBirth());
            // Update other fields as needed.
            return clientRepository.save(client);
        } else {
            throw new EntityNotFoundException("Client with ID " + clientId + " not found");
        }
    }

    public void deleteClient(Long clientId) {
        clientRepository.deleteById(clientId);
    }




}

