import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Hospital,HospitalResponse} from "../../types";
import HospitalDialogContent from "./HospitalDialogContent";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {HospitalEntry, updateHospital} from "../../api/hospital_api";



type FormProps = {
    hospitalData: HospitalResponse;
}

function EditHospital({ hospitalData }: FormProps) {

    const [open, setOpen] = useState(false);
    const [hospital, setHospital] = useState<Hospital>({
        address: "",
        hospital_name: "",
        phone_number: ""
    });

    // Add handleChange function
    const handleClickOpen = () => {
        setHospital({
            address: hospitalData.address,
            hospital_name: hospitalData.hospital_name,
            phone_number: hospitalData.phone_number,
        });
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const url = hospitalData._links.self.href;
        const hospitalEntry: HospitalEntry = {hospital, url}
        mutate(hospitalEntry);
        setHospital({
            address: "",
            hospital_name: "",
            phone_number: "",
            });
        handleClose();
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setHospital({...hospital, [event.target.name]: event.target.value});
    }


    // Get query client
    const queryClient = useQueryClient();


    // Use useMutation hook
    const { mutate } = useMutation(updateHospital, {
        onSuccess: () => {
            queryClient.invalidateQueries(["hospitals"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    return(
        <>
            <button onClick={handleClickOpen}>
                Edit
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Hospital</DialogTitle>
                <HospitalDialogContent hospital={hospital} handleChange={handleChange}/>

                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default EditHospital;