import { useState } from 'react';
import {updateClient} from "../../api/clientapi.ts";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Client, ClientEntry, ClientResponse} from "../../types.ts";
import ClientDialogContent from "./ClientDialogContent.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import IconButton from "@mui/joy/IconButton";
import {Edit} from "@mui/icons-material";
import {Tooltip} from "@mui/joy";
import Button from "@mui/joy/Button";

type FormProps = {
    clientdata: ClientResponse;
}
function EditClient({ clientdata }: FormProps) {

    const [open, setOpen] = useState(false);

    const [client, setClient] = useState<Client>({
        clientId: "",
        dateOfBirth: "",
        email: "",
        firstName: "",
        lastName: "",
        phone_number: "",
        policyEndDate: "",
        policyPolicyId: 0,
        policyPolicyName: "",
        policyPremium: 0,
        policyStartDate: ""

    });


    // Get query client
    const queryClient = useQueryClient();
// Use useMutation hook
    const { mutate } = useMutation(updateClient, {
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"]);
        },
        onError: (err) => {
            console.error(err);
        }
    });


    const handleClickOpen = () => {
        setClient({
            clientId: clientdata.clientId,
            dateOfBirth: clientdata.dateOfBirth,
            email: clientdata.email,
            firstName: clientdata.firstName,
            lastName: clientdata.lastName,
            phone_number: clientdata.phone_number,
            policyEndDate: clientdata.policyEndDate,
            policyPolicyId: clientdata.policyPolicyId,
            policyPolicyName: clientdata.policyPolicyName,
            policyPremium: clientdata.policyPremium,
            policyStartDate: clientdata.policyStartDate

        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const url = "http://localhost:2600/api/v1/clients/"+clientdata.clientId;
        const clientEntry: ClientEntry = {client, url}
        mutate(clientEntry);
        setClient({
            clientId: "",
            dateOfBirth: "",
            email: "",
            firstName: "",
            lastName: "",
            phone_number: "",
            policyEndDate: "",
            policyPolicyId: 0,
            policyPolicyName: "",
            policyPremium: 0,
            policyStartDate: ""

        })
        setOpen(false);
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        setClient({...client, [event.target.name]: event.target.value});
    }

    return(
        <>

            <Tooltip title="Edit">
                <IconButton  size={"sm"} color={"primary"} onClick={handleClickOpen}>
                    <Edit fontSize={"small"}/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Client</DialogTitle>
                <ClientDialogContent client={client} handleChange={handleChange}/>

                <DialogActions>
                    <Button  variant="plain" color={"danger"}  onClick={handleClose}>Cancel</Button>
                    <Button  variant="soft" color={"success"} onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>


        </>
    );
}
export default EditClient;