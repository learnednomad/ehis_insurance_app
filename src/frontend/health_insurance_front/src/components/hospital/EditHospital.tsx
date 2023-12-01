import { useState } from 'react';
import {updateHospital} from "../../api/hospitalapi.ts";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Hospital, HospitalEntry, HospitalResponse} from "../../types.ts";
import HospitalDialogContent from "./HospitalDialogContent.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import IconButton from "@mui/joy/IconButton";
import {Edit} from "@mui/icons-material";
import {Tooltip} from "@mui/joy";
import Button from "@mui/joy/Button";


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

            <Tooltip title="Edit">
                <IconButton  size={"sm"} color={"primary"} onClick={handleClickOpen}>
                    <Edit fontSize={"small"}/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Hospital</DialogTitle>
                <HospitalDialogContent hospital={hospital} handleChange={handleChange}/>
                <DialogActions>
                    <Button  variant="plain" color={"danger"}  onClick={handleClose}>Cancel</Button>
                    <Button  variant="soft" color={"success"} onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>


        </>
    );
}
export default EditHospital;