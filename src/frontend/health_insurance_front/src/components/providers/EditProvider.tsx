import {useEffect, useState} from 'react';
import {Policy, Provider, ProviderResponse} from "../../types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ProviderDialogContent from "./ProviderDialogContent";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProviderEntry, updateProvider} from "../../api/provider_api";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


type FormProps = {
    providerdata: ProviderResponse;
}

function EditProvider({ providerdata }: FormProps) {
    const [open,setOpen] = useState(false);
    const [provider, setProvider] = useState<Provider>({

        provider_name: '',
        provider_address: '',
        contact_person: '',
        phone_number: '',
        // date_created: "",
        // date_modified: "",
        policies: []

    });



    //handle Click Open
    const handleClickOpen =()=> {
        setProvider({
            provider_name: providerdata.provider_name,
            provider_address: providerdata.provider_address,
            contact_person: providerdata.contact_person,
            phone_number: providerdata.phone_number,
            // date_created: providerdata.date_created,
            // date_modified: providerdata.date_modified,
            policies: []
        });
        setOpen(true);
    };

    const handleClose =()=> {
        setOpen(false);
    };


    const handleSave = () => {
        const url = providerdata._links.self.href
        const providerEntry: ProviderEntry = {provider, url}
        mutate(providerEntry);
        setProvider({
            provider_name: "",
            provider_address: "",
            contact_person: "",
            phone_number: "",
            policies:[],
            // date_created: "",
            // date_modified: ""
        });
        handleClose();
        // setOpen(false);
    }


    // Add handleChange function
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setProvider({...provider, [event.target.name]: event.target.value});
    }



// Get query client
    const queryClient = useQueryClient();

// Use useMutation hook
    const { mutate } = useMutation(updateProvider, {
        onSuccess: () => {
            queryClient.invalidateQueries(["providers"]);
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
                <DialogTitle>Edit provider</DialogTitle>

                <ProviderDialogContent provider ={provider} handleChange={handleChange}/>



                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default EditProvider;