import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Provider} from "../../types.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addProvider} from "../../api/providerapi.ts";
import ProviderDialogContent from "./ProviderDialogContent.tsx";
import Button from "@mui/joy/Button";
import {Add} from "@mui/icons-material";

function AddProvider() {
    const [open, setOpen] = useState(false);
    const [provider, setProvider] = useState<Provider>({
        contact_person: "",
        date_created: "",
        date_modified: "",
        phone_number: "",
        policies: [],
        provider_address: "",
        provider_id: 0,
        provider_name: ""

    });



    const queryClient = useQueryClient();

    const { mutate } = useMutation(addProvider, {
        onSuccess: () => {
            queryClient.invalidateQueries(["providers"]);
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
        setProvider({...provider, [event.target.name]:
            event.target.value});
    }

    const handleSave = () => {
        mutate(provider);
        setProvider({
            contact_person: "",
            date_created: "",
            date_modified: "",
            phone_number: "",
            policies: [],
            provider_address: "",
            provider_id: 0,
            provider_name: ""
        });
        handleClose();

    }

    return(
        <>

            <Button  variant="plain" startDecorator={<Add />} onClick={handleClickOpen}>
                New Provider
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New provider</DialogTitle>
                <ProviderDialogContent provider={provider} handleChange={handleChange}/>

                <DialogActions>
                    <Button  size={"sm"} variant="plain" color={"danger"}  onClick={handleClose}>Cancel</Button>
                    <Button size={"sm"} variant="soft" color={"success"} onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}
export default AddProvider;