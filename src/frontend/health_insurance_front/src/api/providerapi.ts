import {Provider, ProviderResponse, ProviderEntry} from "../types.ts";
import axios, {AxiosRequestConfig} from "axios";


const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem("jwt");
    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    };
};

export const getProviders = async (): Promise<ProviderResponse[]> => {
    const response = await axios.get("http://localhost:2600/api/v1/providers/",getAxiosConfig());
    return response.data;
}

export const addProvider = async (provider: Provider): Promise<ProviderResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}providers/add-provider`, provider, getAxiosConfig());
    return response.data;
}

//delete function
export const deleteProvider = async (provider_id:number): Promise<ProviderResponse> => {
    try {
        console.log("Deleting client with ID:", provider_id);
        const response = await axios.delete(import.meta.env.VITE_API_URL + `providers/${provider_id}`,getAxiosConfig());
        console.log("Delete response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting claim:', error);
        throw error;
    }
};

export const updateProvider = async (providerEntry: ProviderEntry):
    Promise<ProviderResponse> => {
    const response = await axios.put(providerEntry.url, providerEntry.provider,getAxiosConfig());
    return response.data;
}