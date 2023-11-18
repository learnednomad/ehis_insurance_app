import { useState } from 'react';
import {updateHospital} from "../../api/hospitalapi.ts";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Hospital, HospitalEntry, HospitalResponse} from "../../types.ts";
import HospitalDialogContent from "./HospitalDialogContent.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";


type FormProps = {
    hospitaldata: HospitalResponse;
}
function EditHospital({ hospitaldata }: FormProps) {

    const [open, setOpen] = useState(false);

    const [hospital, setHospital] = useState<Hospital>({
        address: "",
        claims: [],
        hospitalID: 0,
        hospital_name: "",
        offeredServices: [],
        phone_number: "",
        visits: []

    });

    // Get query client
    const queryClient = useQueryClient();
// Use useMutation hook
    const { mutate } = useMutation(updateHospital, {
        onSuccess: () => {
            queryClient.invalidateQueries(["hospitals"]);
        },
        onError: (err) => {
            console.error(err);
        }
    });


    const handleClickOpen = () => {
        setHospital({
            address: hospitaldata.address,
            claims: [],
            hospitalID: hospitaldata.hospitalID,
            hospital_name: hospitaldata.hospital_name,
            offeredServices: [],
            phone_number: hospitaldata.phone_number,
            visits: []

        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const url = "http://localhost:2600/api/v1/hospitals/"+hospitaldata.hospitalID;
        const hospitalEntry: HospitalEntry = {hospital, url}
        mutate(hospitalEntry);

      setHospital({
          address: "",
          claims: [],
          hospitalID: 0,
          hospital_name: "",
          offeredServices: [],
          phone_number: "",
          visits: []

      })
        setOpen(false);
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        setHospital({...hospital, [event.target.name]: event.target.value});
    }

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