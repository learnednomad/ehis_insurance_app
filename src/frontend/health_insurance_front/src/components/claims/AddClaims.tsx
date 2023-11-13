import {useState} from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {addClaim} from "../../api/claims_api";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Claim} from "../../types";
import ClientDialogContent from "../clients/ClientDialogContent";
import ClaimDialogContent from "./ClaimsDialogContent";

function AddClaims() {
    const [open, setOpen] = useState(false);
    const [claim, setClaim] = useState<Claim>({
        // client: "", hospital: "", policy: "",
        dateOfService : '',
        diagnosisCodes : '',
        procedureCodes :'',
        claimAmount:0,
        claimStatus:''
    });

    // Open the modal form
    const handleClickOpen = () => {
        setOpen(true);
    };

// Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setClaim({...claim, [event.target.name]:
            event.target.value});
    }

    // Get query client
    const queryClient = useQueryClient();
// Add mutate
    const { mutate } = useMutation(addClaim, {
        onSuccess: () => {
            queryClient.invalidateQueries(["claims"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });


    // Save claim and close modal form
    const handleSave = () => {
        mutate(claim);
        setClaim({
            // hospital: "",
            // policy: "",
            // client:'',
            dateOfService : '',
            diagnosisCodes: '',
            procedureCodes :'',
            claimAmount:0,
            claimStatus:''
        });
        handleClose();
    }

    return(
        <>

            <button onClick={handleClickOpen}>New Claim</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Claim</DialogTitle>
                <ClaimDialogContent claim={claim} handleChange={handleChange}/>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>


        </>
    );
}
export default AddClaims;