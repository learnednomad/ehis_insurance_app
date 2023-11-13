import {ClaimsResponse, Claim, ClaimEntry } from "../types";
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


// export const getClaims = async (): Promise < ClaimsResponse[] > => {
//     const response = await axios.get(import.meta.env.VITE_API_URL + "/claims", getAxiosConfig());
//     return response.data._embedded.claims;
// }


export const getClaims = async (): Promise<ClaimsResponse[]> => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/api/claims/", getAxiosConfig());
        return response.data;
    } catch (error) {
        // Handle the error, e.g., log it or return a default value
        console.error("Error while fetching claims:", error);
        throw error; // Optionally re-throw the error to be handled elsewhere
    }
};

//deleteClaims
export const deleteClaim = async (link: string): Promise<ClaimsResponse> => {
    const response = await axios.delete(link, getAxiosConfig());
    return response.data
}



// import { ClientResponse, Client} from '../types';
// Add a new client
export const addClaim = async (claim: Claim): Promise<ClaimsResponse> => {
    const response = await axios.post(import.meta.env.VITE_API_URL + "/api/claims/add-claim", claim, getAxiosConfig());

    return response.data;
}




// Add updateClient function
export const updateClaims = async(claimEntry: ClaimEntry): Promise<ClaimsResponse> => {
    const response = await axios.put(claimEntry.url, claimEntry.claim,getAxiosConfig());
    return response.data;
}

