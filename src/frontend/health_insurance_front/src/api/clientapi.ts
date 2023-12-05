import {Client, ClientResponse, ClientEntry} from "../types.ts";
import axios, {AxiosRequestConfig} from 'axios';


const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem("jwt");
    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    };
};
export const getClients = async (): Promise<ClientResponse[]> => {
    const response = await axios.get("http://localhost:2600/api/v1/clients",getAxiosConfig());
    return response.data;
}



export const addClient = async (client: Client): Promise<ClientResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}clients/add-clients`, client, getAxiosConfig());
    return response.data;
}

export const deleteClient = async (clientId:number): Promise<ClientResponse> => {
    try {
        console.log("Deleting client with ID:", clientId);
        const response = await axios.delete(import.meta.env.VITE_API_URL + `clients/${clientId}`,getAxiosConfig());
        console.log("Delete response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting claim:', error);
        throw error;
    }
};


export const updateClient = async (clientEntry: ClientEntry):
    Promise<ClientResponse> => {
    const response = await axios.put(clientEntry.url, clientEntry.client, getAxiosConfig());
    return response.data;
}