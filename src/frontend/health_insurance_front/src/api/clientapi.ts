import {ClientResponse, Client, ClientEntry } from "../types";
import axios, { AxiosRequestConfig } from 'axios';


const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem("jwt");
    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    };
};



export const getClients = async (): Promise < ClientResponse[] > => {
    const token = sessionStorage.getItem("jwt");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/clients`, getAxiosConfig());
    return response.data._embedded.clients;
}

export const deleteClient = async (link: string): Promise<ClientResponse> => {
    const token = sessionStorage.getItem("jwt");
    const response = await axios.delete(link, getAxiosConfig());
    return response.data
}

// import { ClientResponse, Client} from '../types';
// Add a new client
export const addClient = async (client: Client): Promise<ClientResponse> => {
    const token = sessionStorage.getItem("jwt");

    const response = await axios.post("http://localhost:2600/api/clients/add-client", client, getAxiosConfig());
    return response.data;
}


// Add updateClient function
export const updateClient = async(clientEntry: ClientEntry): Promise<ClientResponse> => {
    const token = sessionStorage.getItem("jwt");
    const response = await axios.put(clientEntry.url, clientEntry.client, getAxiosConfig());
    return response.data;
}

