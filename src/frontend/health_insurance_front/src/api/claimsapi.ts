import {ClaimsResponse, Claim, ClaimEntry} from "../types.ts";
import axios from "axios";

export const getClaims = async (): Promise<ClaimsResponse[]> => {
    const response = await axios.get("http://localhost:2600/api/v1/claims/");
    return response.data;
}


//Add Claims
export const addClaim = async (claim: Claim): Promise<ClaimsResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}claims/add-claim`, claim, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}



//Delete Claims
export const deleteClaim = async (claimId): Promise<ClaimsResponse> => {
    try {
        const response = await axios.delete(import.meta.env.VITE_API_URL+`claims/${claimId}`);
        // You might return some data from the response if needed
        return response.data;
    } catch (error) {
        // Handle errors (e.g., network errors, server errors)
        console.error('Error deleting claim:', error);
        throw error;
    }
};


export const updateClaim = async (claimEntry: ClaimEntry):
    Promise<ClaimsResponse> => {
    const response = await axios.put(claimEntry.url, claimEntry.claim, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.data;
}