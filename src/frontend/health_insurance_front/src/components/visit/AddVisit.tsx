import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Visit} from "../../types.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addVisit} from "../../api/visitapi.ts";
import VisitDialogContent from "./VisitDialogContent.tsx";

function AddVisit() {
    const [open, setOpen] = useState(false);
    const [visit, setVisit] = useState<Visit>({
        clientClientId: 0,
        clientFirst_name: "",
        clientLast_name: "",
        date: "",
        hospitalHospitalID: 0,
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

        <button onClick={handleClickOpen}>New Visit</button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New visit</DialogTitle>
            <VisitDialogContent visit={visit} handleChange={handleChange}/>
            <DialogActions>
                <button onClick={handleClose}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </DialogActions>
        </Dialog>


    </>
);
}
export default AddVisit;