import {ProviderResponse, Provider, ProviderEntry,Policy} from "../types";
import axios from "axios";
import {AxiosRequestConfig} from "axios/index";




const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem("jwt");
    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    };
};






export const getProviders = async (): Promise < ProviderResponse[] > => {
    const response = await axios.get("http://localhost:2600/policyProviders", getAxiosConfig());
    return response.data._embedded.policyProviders;
}





export const deleteProvider = async (link: string): Promise<ProviderResponse> => {
    const response = await axios.delete(link, getAxiosConfig());
    return response.data
}

// Add a new provider
export const addProvider = async (provider: Provider): Promise<ProviderResponse> => {
    const response = await axios.post("http://localhost:2600/api/providers/add-provider", provider, getAxiosConfig());
    return response.data;
}




// Add updateProvider function
export const updateProvider = async(providerEntry: ProviderEntry): Promise<ProviderResponse> => {
    const response = await axios.put(providerEntry.url, providerEntry.provider,getAxiosConfig());
    return response.data;
}

