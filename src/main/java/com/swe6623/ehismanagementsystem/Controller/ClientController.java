package com.swe6623.ehismanagementsystem.Controller;

import com.swe6623.ehismanagementsystem.DTO.ClientDto;
import com.swe6623.ehismanagementsystem.Service.ClientService;
import com.swe6623.ehismanagementsystem.Model.Client;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/v1/clients")
public class ClientController {
   private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }


    @GetMapping
    public List<ClientDto> getClients(){
      return  clientService.getAllClients();
    }


    @GetMapping("/{clientId}")
    public ClientDto getClientById(@PathVariable Long clientId) {
        return clientService.getClientById(clientId);
    }

    @PostMapping("/add-client")
    public Client createClient(@RequestBody Client client) {
        return clientService.createClient(client);
    }


    @PostMapping("/add-clients")
    public Client createClient(@RequestBody ClientDto client) {
        return clientService.createClient(client);
    }

    @PutMapping("/{clientId}")
    public Client updateClient(@PathVariable Long clientId, @RequestBody Client updatedClient) {
        return clientService.updateClient(clientId, updatedClient);
    }

    @DeleteMapping("/{clientId}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long clientId) {
        clientService.deleteClient(clientId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}



