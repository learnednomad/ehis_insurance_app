import { useState } from 'react';
import {updateClaim} from "../../api/claimsapi.ts";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Claim, ClaimEntry, ClaimsResponse} from "../../types.ts";
import ClaimDialogContent from "./ClaimDialogContent.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";


type FormProps = {
    claimdata: ClaimsResponse;
}
function EditClaim({ claimdata }: FormProps) {

    const [open, setOpen] = useState(false);

    const [claim, setClaim] = useState<Claim>({
        claimAmount: 0,
        claimId: 0,
        claimStatus: "",
        clientClientId: 0,
        clientFirst_name: "",
        clientLast_name: "",
        dateOfService: "",
        hospitalHospitalID: 0,
        hospitalHospital_name: ""
    });

    // Get query client
    const queryClient = useQueryClient();
// Use useMutation hook
    const { mutate } = useMutation(updateClaim, {
        onSuccess: () => {
            queryClient.invalidateQueries(["claims"]);
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const handleClickOpen = () => {
        setClaim({
            claimAmount: claimdata.claimAmount,
            claimId: claimdata.claimId,
            claimStatus: claimdata.claimStatus,
            clientClientId: claimdata.clientClientId,
            clientFirst_name: claimdata.clientFirst_name,
            clientLast_name: claimdata.clientLast_name,
            dateOfService: claimdata.dateOfService,
            hospitalHospitalID: claimdata.hospitalHospitalID,
            hospitalHospital_name: claimdata.hospitalHospital_name
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const url = "http://localhost:2600/api/v1/claims/"+claimdata.claimId;
        const claimEntry: ClaimEntry = {claim, url}
        mutate(claimEntry);

      setClaim({
          claimAmount: 0,
          claimId: 0,
          claimStatus: "",
          clientClientId: 0,
          clientFirst_name: "",
          clientLast_name: "",
          dateOfService: "",
          hospitalHospitalID: 0,
          hospitalHospital_name: ""
      })
        setOpen(false);
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        setClaim({...claim, [event.target.name]: event.target.value});
    }

    return(
        <>

            <button onClick={handleClickOpen}>
                Edit
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Claim</DialogTitle>
                <ClaimDialogContent claim={claim} handleChange={handleChange}/>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>

        </>
    );
}
export default EditClaim;