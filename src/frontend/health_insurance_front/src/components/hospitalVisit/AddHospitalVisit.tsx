import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Visit} from "../../types.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addVisit} from "../../api/visitapi.ts";
import VisitDialogContent from "./VisitDialogContent.tsx";
import {Add} from "@mui/icons-material";
import Button from "@mui/joy/Button";

function AddHospitalVisit() {
    const i = JSON.parse(localStorage.getItem('user_id'));
    const [open, setOpen] = useState(false);
    const [visit, setVisit] = useState<Visit>({
        clientClientId: 0,
        clientFirst_name: "",
        clientLast_name: "",
        date: "",
        hospitalHospitalID: i,
        hospitalHospital_name: "",
        visitID: 0
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation(addVisit, {
        onSuccess: () => {
            queryClient.invalidateQueries(["visits"]);
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
        setVisit({...visit, [event.target.name]:
            event.target.value});
    }

    const handleSave = () => {
        mutate(visit);
        setVisit({
            clientClientId: 0,
            clientFirst_name: "",
            clientLast_name: "",
            date: "",
            hospitalHospitalID: 0,
            hospitalHospital_name: "",
            visitID: 0
        });
        handleClose();
    }

return(
    <>

        <Button  variant="plain" startDecorator={<Add />} onClick={handleClickOpen}>
            New Visit
        </Button>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New visit</DialogTitle>
            <VisitDialogContent visit={visit} handleChange={handleChange}/>
            <DialogActions>
                <Button  size={"sm"} variant="plain" color={"danger"}  onClick={handleClose}>Cancel</Button>
                <Button size={"sm"} variant="soft" color={"success"} onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>


    </>
);
}
export default AddHospitalVisit;