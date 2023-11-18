import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Provider} from "../../types.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addProvider} from "../../api/providerapi.ts";
import ProviderDialogContent from "./ProviderDialogContent.tsx";

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

            <button onClick={handleClickOpen}>New Provider</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New provider</DialogTitle>
                <ProviderDialogContent provider={provider} handleChange={handleChange}/>

                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>

        </>
    );
}
export default AddProvider;