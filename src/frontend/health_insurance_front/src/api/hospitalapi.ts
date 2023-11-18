import {Hospital, HospitalResponse, HospitalEntry} from "../types.ts";
import axios from "axios";

export const getHospitals = async (): Promise<HospitalResponse[]> => {
    const response = await axios.get("http://localhost:2600/api/v1/hospitals");
    return response.data;
}

// export const deleteHospital = async (link: string): Promise<HospitalResponse> => {
//     const response = await axios.delete(link);
//     return response.data
// }

export const addHospital = async (hospital: Hospital): Promise<HospitalResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}hospitals/add-hospital`, hospital, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}


export const deleteHospital = async (hospitalID): Promise<HospitalResponse> => {
    try {
        console.log("Deleting client with ID:", hospitalID);
        const response = await axios.delete(import.meta.env.VITE_API_URL + `hospitals/${hospitalID}`);
        console.log("Delete response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting claim:', error);
        throw error;
    }
};

export const updateHospital = async (hospitalEntry: HospitalEntry):
    Promise<HospitalResponse> => {
    const response = await axios.put(hospitalEntry.url, hospitalEntry.hospital, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.data;
}