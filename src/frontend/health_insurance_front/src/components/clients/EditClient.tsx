import { useState } from 'react';
import { Client, ClientResponse } from '../../types';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ClientDialogContent from "./ClientDialogContent";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {ClientEntry, updateClient} from "../../api/clientapi";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


type FormProps = {
    clientdata: ClientResponse;
}

function EditClient({ clientdata }: FormProps) {
    const [open,setOpen] = useState(false);
    const [client, setClient] = useState<Client>({
        address: "", dateOfBirth: "", email: "", first_name: "", last_name: "", phone_number: "", policyName: ""

    });

    //handle Click Open
    const handleClickOpen =()=> {
        setClient({
            address: clientdata.address,
            email: clientdata.email,
            phone_number: clientdata.phone_number,
            policyName: clientdata._links.policy.href,
            first_name: clientdata.first_name,
            last_name: clientdata.last_name,
            dateOfBirth:clientdata.dateOfBirth,
        });
        setOpen(true);
    };

    const handleClose =()=> {
        setOpen(false);
    };


    const handleSave = () => {
        const url = clientdata._links.self.href;
        const clientEntry: ClientEntry = {client, url}
        mutate(clientEntry);
        setClient({

            address: "",
            dateOfBirth: "",
            email: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            policyName: ""


        });
        handleClose();
        // setOpen(false);
    }


    // Add handleChange function
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setClient({...client, [event.target.name]: event.target.value});
    }



// Get query client
    const queryClient = useQueryClient();

// Use useMutation hook
    const { mutate } = useMutation(updateClient, {
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });






// render CarDialogContent inside the Dialog

    return(
        <>
            <IconButton size="small" onClick={handleClickOpen}>
                <EditIcon/>
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit client</DialogTitle>

                <ClientDialogContent client={client} handleChange={handleChange}/>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default EditClient;