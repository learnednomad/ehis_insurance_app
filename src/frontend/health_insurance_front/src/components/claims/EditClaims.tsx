// EditCar.tsx
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Claim, ClaimEntry, ClaimsResponse} from "../../types";
import ClaimsDialogContent from "./ClaimsDialogContent";
import {updateClaims} from "../../api/claims_api";
import {useMutation,useQueryClient} from "@tanstack/react-query";


type FormProps = {
    claimdata: ClaimsResponse;
}

function EditClaims({ claimdata }: FormProps) {
    const [open, setOpen] = useState(false);

    const [claim, setClaim] = useState<Claim>({
        claimAmount: 0,
        claimStatus: "",
        dateOfService: "",
        diagnosisCodes: "",
        procedureCodes: ""
    });

    // Add handleChange function

    const handleClickOpen = () => {
        setClaim({
            claimAmount: claimdata.claimAmount,
            claimStatus: claimdata.claimStatus,
            dateOfService: claimdata.dateOfService,
            diagnosisCodes: claimdata.diagnosisCodes,
            procedureCodes: claimdata.procedureCodes
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {

        const url = claimdata._links.self.href;
        const claimEntry: ClaimEntry = {claim, url}
        mutate(claimEntry);
        setClaim({
            claimAmount: 0,
            claimStatus: "",
            dateOfService: "",
            diagnosisCodes: "",
            procedureCodes: ""});

        handleClose();
    }


    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setClaim({...claim, [event.target.name]: event.target.value});
    }


    // Get query client
    const queryClient = useQueryClient();


    // Use useMutation hook
    const { mutate } = useMutation(updateClaims, {
        onSuccess: () => {
            queryClient.invalidateQueries(["claims"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    // render CarDialogContent inside the Dialog
    return(
        <>
            <button onClick={handleClickOpen}>
                Edit
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Claims</DialogTitle>
                <ClaimsDialogContent claim={claim} handleChange={handleChange}/>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default EditClaims;