import { useState } from 'react';
import {updateVisit} from "../../api/visitapi.ts";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Visit, VisitResponse, VisitEntry} from "../../types.ts";
import VisitDialogContent from "./VisitDialogContent.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";



type FormProps = {
    visitdata: VisitResponse;
}

function EditVisit({ visitdata }: FormProps) {

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

    // Get query client
    const queryClient = useQueryClient();
// Use useMutation hook
    const { mutate } = useMutation(updateVisit, {
        onSuccess: () => {
            queryClient.invalidateQueries(["visits"]);
        },
        onError: (err) => {
            console.error(err);
        }
    });



    const handleClickOpen = () => {
        setVisit({
            clientClientId: visitdata.clientClientId,
            clientFirst_name: visitdata.clientFirst_name,
            clientLast_name: visitdata.clientLast_name,
            date: visitdata.date,
            hospitalHospitalID: visitdata.hospitalHospitalID,
            hospitalHospital_name: visitdata.hospitalHospital_name,
            visitID: visitdata.visitID
        });

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const url = "http://localhost:2600/api/v1/visits/"+ visitdata.visitID;
        const visitEntry:VisitEntry = { visit, url}
        mutate(visitEntry)

        setVisit({
            clientClientId: 0,
            clientFirst_name: "",
            clientLast_name: "",
            date: "",
            hospitalHospitalID: 0,
            hospitalHospital_name: "",
            visitID: 0
        })
        setOpen(false);
    }


    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        setVisit({...visit, [event.target.name]: event.target.value});
    }

    return(
        <>


            <button onClick={handleClickOpen}>
                Edit
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Visit</DialogTitle>
                <VisitDialogContent visit={visit} handleChange={handleChange}/>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>

        </>
    );
}
export default EditVisit;