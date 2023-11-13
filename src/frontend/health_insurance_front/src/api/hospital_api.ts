import {HospitalResponse, Hospital, HospitalEntry } from "../types";
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




export const getHospitals = async (): Promise < HospitalResponse[] > => {
    const response = await axios.get(import.meta.env.VITE_API_URL +"/hospitals", getAxiosConfig());
    return response.data._embedded.hospitals;
}


export const deleteHospital = async (link: string): Promise<HospitalResponse> => {
    const response = await axios.delete(link, getAxiosConfig());
    return response.data
}

// import { HospitalResponse, Hospital} from '../types';
// Add a new hospital
export const addHospital = async (hospital: Hospital): Promise<HospitalResponse> => {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/api/hospitals/add', getAxiosConfig());
    return response.data;
}



// Add updateHospital function
export const updateHospital = async(hospitalEntry: HospitalEntry): Promise<HospitalResponse> => {
    const response = await axios.put(hospitalEntry.url, hospitalEntry.hospital, getAxiosConfig());
    return response.data;
}

