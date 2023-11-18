import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addClaim} from "../../api/claimsapi.ts";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Claim} from "../../types.ts";
import ClaimDialogContent from "./ClaimDialogContent.tsx";

function AddClaim() {

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


  const queryClient = useQueryClient();

  const { mutate } = useMutation(addClaim, {
    onSuccess: () => {
      queryClient.invalidateQueries(["claims"]);
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
      <button onClick={handleClickOpen}>New Claim</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New claim</DialogTitle>
        <ClaimDialogContent claim={claim} handleChange={handleChange}/>

        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>

    </>
  );
}
export default AddClaim;