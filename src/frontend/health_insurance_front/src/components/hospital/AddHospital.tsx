import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Hospital} from "../../types.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addHospital} from "../../api/hospitalapi.ts";
import HospitalDialogContent from "./HospitalDialogContent.tsx";
import Button from "@mui/joy/Button";
import {Add} from "@mui/icons-material";

function AddHospital() {
    const [open, setOpen] = useState(false);
    const [hospital, setHospital] = useState<Hospital>({
        email: "",
        address: "",
        claims: [],
        hospitalID: 0,
        hospital_name: "",
        offeredServices: [],
        phone_number: "",
        visits: []
    });


    const queryClient = useQueryClient();

    const { mutate } = useMutation(addHospital, {
        onSuccess: () => {
            queryClient.invalidateQueries(["hospitals"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    // Open the modal form
    const handleClickOpen = () => {
        setOpen(true);
    };

// Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        setHospital({...hospital, [event.target.name]:
            event.target.value});
    }

    const handleSave = () => {
        mutate(hospital);
        setHospital({
            email: "",
            address: "",
            claims: [],
            hospitalID: 0,
            hospital_name: "",
            offeredServices: [],
            phone_number: "",
            visits: []
        });
        handleClose();
    }

return(
    <>
        <Button  variant="plain" startDecorator={<Add />} onClick={handleClickOpen}>
            New Location
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New location</DialogTitle>
            <HospitalDialogContent hospital={hospital} handleChange={handleChange}/>
            <DialogActions>
                <Button  size={"sm"} variant="plain" color={"danger"}  onClick={handleClose}>Cancel</Button>
                <Button size={"sm"} variant="soft" color={"success"} onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>

    </>
);
}
export default AddHospital;