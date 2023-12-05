import { useState } from 'react';
import {updateClaim} from "../../api/claimsapi.ts";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Claim, ClaimEntry, ClaimsResponse} from "../../types.ts";
import ClaimDialogContent from "./ClaimDialogContent.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import IconButton from "@mui/joy/IconButton";
import {Edit} from "@mui/icons-material";
import {Tooltip} from "@mui/joy";
import Button from "@mui/joy/Button";
import useAuth from "../auth/useAuth.tsx";
import StatusUpdate from "./StatusUpdate.tsx";


type FormProps = {
    claimdata: ClaimsResponse;
}
function EditClaim({ claimdata }: FormProps) {

    const {userRole} =useAuth()
    const [open, setOpen] = useState(false);

    const [claim, setClaim] = useState<Claim>({
        diagnosisCodes: "",
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
            diagnosisCodes: claimdata.diagnosisCodes,
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
        const url = "http://localhost:2600/api/v1/claims/"+ claimdata.claimId;
        const claimEntry: ClaimEntry = {claim, url}
        mutate(claimEntry);

      setClaim({
          diagnosisCodes: "",
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

    const handleReject = () => {
        handleSave();
    }


    const handleApprove = () => {
        handleSave();
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        setClaim({...claim, [event.target.name]: event.target.value});
    }




    return(
        <>

            <Tooltip title="Edit">
                <IconButton  size={"sm"} color={"primary"} onClick={handleClickOpen}>
                    <Edit fontSize={"small"}/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Claim</DialogTitle>
                {(userRole==='HOSPITAL') &&  <ClaimDialogContent claim={claim} handleChange={handleChange}/> }
                {(userRole==='HOSPITAL') &&  <DialogActions>
                    <Button  variant="plain" color={"danger"}  onClick={handleClose}>Cancel</Button>
                    <Button  variant="soft" color={"success"} onClick={handleSave}>Save</Button>
                </DialogActions> }

                {(userRole==='ADMIN') &&  <StatusUpdate claim={claim} handleChange={handleChange} /> }
                {(userRole==='ADMIN') &&  <DialogActions>
                    <Button  variant="plain" color={"danger"}  onClick={handleReject}>Cancel</Button>
                    <Button  variant="soft" color={"success"} onClick={handleApprove}>Submit</Button>
                </DialogActions> }
            </Dialog>

        </>
    );
}
export default EditClaim;