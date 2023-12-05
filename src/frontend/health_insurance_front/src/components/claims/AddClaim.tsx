import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addClaim} from "../../api/claimsapi.ts";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Claim} from "../../types.ts";
import ClaimDialogContent from "./ClaimDialogContent.tsx";
import Button from "@mui/joy/Button";
import {Add} from "@mui/icons-material";

function AddClaim() {

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


  const queryClient = useQueryClient();

  const { mutate } = useMutation(addClaim, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })

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
    setClaim({...claim, [event.target.name]:
      event.target.value});
  }

  const handleSave = () => {
    mutate(claim);
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
    });
    handleClose();
  }

  return(
    <>
      <Button  variant="plain" startDecorator={<Add />} onClick={handleClickOpen}>
        New Claim
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New claim</DialogTitle>
        <ClaimDialogContent claim={claim} handleChange={handleChange}/>

        <DialogActions>
          <Button  size={"sm"} variant="plain" color={"danger"}  onClick={handleClose}>Cancel</Button>
          <Button size={"sm"} variant="soft" color={"success"} onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
export default AddClaim;