import {Visit, VisitResponse, VisitEntry} from "../types.ts";
import axios, {AxiosRequestConfig} from "axios";


const getAxiosConfig = (): AxiosRequestConfig => {
    const token = localStorage.getItem("jwt");
    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    };
};

// @ts-ignore
const uid = JSON.parse(localStorage.getItem('user_id'));

export const getVisits = async (): Promise<VisitResponse[]> => {
    const response = await axios.get("http://localhost:2600/api/v1/visits/",getAxiosConfig());
    return response.data;
}


export const getClientVisits = async (): Promise<VisitResponse[]> => {
    const response = await axios.get(`http://localhost:2600/api/v1/visits/clients/${uid}`, getAxiosConfig());
    return response.data;
}


export const getHospitalVisits = async (): Promise<VisitResponse[]> => {
    const response = await axios.get(`http://localhost:2600/api/v1/visits/hosp/${uid}`, getAxiosConfig());
    return response.data;
}



export const addVisit = async (visit: Visit): Promise<VisitResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}visits/add-visit`, visit,getAxiosConfig());
    return response.data;
}


export const deleteVisit = async (visitID:number): Promise<VisitResponse> => {
    try {
        console.log("Deleting client with ID:", visitID);
        const response = await axios.delete(import.meta.env.VITE_API_URL + `visits/${visitID}`, getAxiosConfig());
        console.log("Delete response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting visit:', error);
        throw error;
    }
};


export const updateVisit = async (visitEntry: VisitEntry):
    Promise<VisitResponse> => {
    const response = await axios.put(visitEntry.url, visitEntry.visit, getAxiosConfig());
    return response.data;
}