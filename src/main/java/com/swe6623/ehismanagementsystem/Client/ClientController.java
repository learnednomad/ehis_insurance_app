package com.swe6623.ehismanagementsystem.Client;

import com.swe6623.ehismanagementsystem.ExceptionHandling.EntityNotFoundException;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
   private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }


    @GetMapping("/")
    public List<Client> getClients(){
      return  clientService.getAllClients();
    }


    @GetMapping("/{clientId}")
    public Client getClientById(@PathVariable Long clientId) {
        return clientService.getClientById(clientId);
    }

    @PostMapping("/add-client")
    public Client createClient(@RequestBody Client client) {
        return clientService.createClient(client);
    }

    @PutMapping("/{clientId}")
    public Client updateClient(@PathVariable Long clientId, @RequestBody Client updatedClient) {
        return clientService.updateClient(clientId, updatedClient);
    }

    @DeleteMapping("/{clientId}")
    public void deleteClient(@PathVariable Long clientId) {
        clientService.deleteClient(clientId);
    }
}



