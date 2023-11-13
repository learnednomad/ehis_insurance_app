import {VisitEntry, VisitResponse, Visit} from "../types";
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


// export const getVisits = async (): Promise < VisitResponse[] > => {
//     const response = await axios.get(import.meta.env.VITE_API_URL + "/visits", getAxiosConfig());
//     return response.data._embedded.visits;
// }


export const getVisits = async (): Promise<VisitResponse[]> => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/visits/", getAxiosConfig());
        return response.data;
    } catch (error) {
        // Handle the error, e.g., log it or return a default value
        console.error("Error while fetching visits:", error);
        throw error; // Optionally re-throw the error to be handled elsewhere
    }
};

//deleteVisits
export const deleteVisit= async (link: string): Promise<VisitResponse> => {
    const response = await axios.delete(link, getAxiosConfig());
    return response.data
}



// import { ClientResponse, Client} from '../types';
// Add a new visit
export const addVisit = async (visit: Visit): Promise<VisitResponse> => {
    const response = await axios.post(import.meta.env.VITE_API_URL + "/visits/add-visit", visit, getAxiosConfig());
    return response.data;
}




// Add updateClient function
export const updateVisits = async(visitEntry: VisitEntry): Promise<VisitResponse> => {
    const response = await axios.put(visitEntry.url, visitEntry.visit,getAxiosConfig());
    return response.data;
}

