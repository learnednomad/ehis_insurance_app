import {ClaimsResponse, Claim, ClaimEntry} from "../types.ts";
import axios, { AxiosRequestConfig } from 'axios';



const getAxiosConfig = (): AxiosRequestConfig => {
    const token = localStorage.getItem('jwt');
    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    };
};


// @ts-ignore
const uid = JSON.parse(localStorage.getItem('user_id'))



export const getClaims = async (): Promise<ClaimsResponse[]> => {
    const response = await axios.get("http://localhost:2600/api/v1/claims/", getAxiosConfig());
    return response.data;

}



export const getHospitalClaims = async (): Promise<ClaimsResponse[]> => {
    const response = await axios.get(`http://localhost:2600/api/v1/claims/hospital/${uid}`, getAxiosConfig());
    return response.data;
}


//Add Claims
export const addClaim = async (claim: Claim): Promise<ClaimsResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}claims/add-claim`, claim, getAxiosConfig());
    return response.data;
}



//Delete Claims
export const deleteClaim = async (claimId:number): Promise<ClaimsResponse> => {
    try {
        const response = await axios.delete(import.meta.env.VITE_API_URL+`claims/${claimId}`,getAxiosConfig());
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
    const response = await axios.put(claimEntry.url, claimEntry.claim, getAxiosConfig());
    return response.data;
}