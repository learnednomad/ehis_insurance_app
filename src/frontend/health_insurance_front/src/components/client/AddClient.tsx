import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Client} from "../../types.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addClient} from "../../api/clientapi.ts";
import ClientDialogContent from "./ClientDialogContent.tsx";

function AddClient() {
    const [open, setOpen] = useState(false);
    const [client, setClient] = useState<Client>({
        clientId: "",
        dateOfBirth: "",
        email: "",
        firstName: "",
        lastName: "",
        phone_number: "",
        policyEndDate: "",
        policyPolicyName: "",
        policyPremium: 0,
        policyStartDate: "",
        policyPolicyId: 0

    });


    const queryClient = useQueryClient();

    const { mutate } = useMutation(addClient, {
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"]);
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
        setClient({...client, [event.target.name]:
            event.target.value});
    }

    const handleSave = () => {
        mutate(client);
        setClient({
            policyPolicyId: 0,
            clientId: "",
            dateOfBirth: "",
            email: "",
            firstName: "",
            lastName: "",
            phone_number: "",
            policyEndDate: "",
            policyPolicyName: "",
            policyPremium: 0,
            policyStartDate: ""
        });
        handleClose();
    }

return(
    <>

        <button onClick={handleClickOpen}>New Client</button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New client</DialogTitle>
            <ClientDialogContent client={client} handleChange={handleChange}/>
            <DialogActions>
                <button onClick={handleClose}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </DialogActions>
        </Dialog>

    </>
);
}
export default AddClient;