import {Hospital, HospitalResponse, HospitalEntry} from "../types.ts";
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
export const getHospitals = async (): Promise<HospitalResponse[]> => {
    const response = await axios.get("http://localhost:2600/api/v1/hospitals",getAxiosConfig());
    return response.data;
}

// export const deleteHospital = async (link: string): Promise<HospitalResponse> => {
//     const response = await axios.delete(link);
//     return response.data
// }

export const addHospital = async (hospital: Hospital): Promise<HospitalResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}hospitals/add-hospital`, hospital,getAxiosConfig());
    return response.data;
}


export const deleteHospital = async (hospitalID:number): Promise<HospitalResponse> => {
    try {
        console.log("Deleting client with ID:", hospitalID);
        const response = await axios.delete(import.meta.env.VITE_API_URL + `hospitals/${hospitalID}`,getAxiosConfig());
        console.log("Delete response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting claim:', error);
        throw error;
    }
};

export const updateHospital = async (hospitalEntry: HospitalEntry):
    Promise<HospitalResponse> => {
    const response = await axios.put(hospitalEntry.url, hospitalEntry.hospital, getAxiosConfig());
    return response.data;
}