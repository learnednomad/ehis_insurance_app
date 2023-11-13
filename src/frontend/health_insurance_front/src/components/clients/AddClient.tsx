import {useState} from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addClient } from '../../api/clientapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Client} from "../../types";
import ClientDialogContent from "./ClientDialogContent";
import Button from '@mui/material/Button';




function AddClient() {
    const [open, setOpen] = useState(false);
    const [client, setClient] = useState<Client>({
        address: "",
        dateOfBirth: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        policyName: ""
    });


    // Get query client

    const queryClient = useQueryClient();

// Open the modal form
    const handleClickOpen = () => {
        setOpen(true);
    };

// Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClient({...client, [event.target.name]:
            event.target.value});
    }


    // Add mutate
    const { mutate } = useMutation(addClient, {
        onSuccess: () => {
            queryClient.invalidateQueries(["client"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });


    //formatting dates
    function formatDateToJson(date) {
        if (!(date instanceof Date)) {
            return null;
        }

        return date.toISOString();
    }

    const currentDate = new Date();
    const formattedDate = formatDateToJson(client.dateOfBirth);


    // Save car and close modal form
    const handleSave = () => {
        mutate(client);
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
    }


    return(
        <div>
            <Button onClick={handleClickOpen}>New Client</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Client</DialogTitle>
                <ClientDialogContent client={client} handleChange={handleChange}/>


                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default AddClient;