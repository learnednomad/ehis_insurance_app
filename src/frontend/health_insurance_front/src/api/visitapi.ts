import {Visit, VisitResponse, VisitEntry} from "../types.ts";
import axios from "axios";




export const getVisits = async (): Promise<VisitResponse[]> => {
    const response = await axios.get("http://localhost:2600/api/v1/visits/");
    return response.data;
}



export const addVisit = async (visit: Visit): Promise<VisitResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}visits/add-visit`, visit, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}


export const deleteVisit = async (visitID): Promise<VisitResponse> => {
    try {
        console.log("Deleting client with ID:", visitID);
        const response = await axios.delete(import.meta.env.VITE_API_URL + `visits/${visitID}`);
        console.log("Delete response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting claim:', error);
        throw error;
    }
};


export const updateVisit = async (visitEntry: VisitEntry):
    Promise<VisitResponse> => {
    const response = await axios.put(visitEntry.url, visitEntry.visit, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.data;
}