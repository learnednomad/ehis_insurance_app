import { useState } from 'react';
import {updateProvider} from "../../api/providerapi.ts";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Provider, ProviderEntry, ProviderResponse} from "../../types.ts";
import ProviderDialogContent from "./ProviderDialogContent.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";


type FormProps = {
    providerdata: ProviderResponse;
}
function EditProvider({ providerdata }: FormProps) {

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


    // Get query client
    const queryClient = useQueryClient();
// Use useMutation hook
    const { mutate } = useMutation(updateProvider, {
        onSuccess: () => {
            queryClient.invalidateQueries(["providers"]);
        },
        onError: (err) => {
            console.error(err);
        }
    });


    const handleClickOpen = () => {

        setProvider({
            contact_person: providerdata.contact_person,
            date_created: providerdata.date_created,
            date_modified: providerdata.date_modified,
            phone_number: providerdata.phone_number,
            policies: [],
            provider_address: providerdata.provider_address,
            provider_id: providerdata.provider_id,
            provider_name: providerdata.provider_name

        });

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const url = "http://localhost:2600/api/v1/providers/"+providerdata.provider_id;
        const providerEntry: ProviderEntry = {provider, url}
        mutate(providerEntry);

        setProvider({
            contact_person: "",
            date_created: "",
            date_modified: "",
            phone_number: "",
            policies: [],
            provider_address: "",
            provider_id: 0,
            provider_name: ""

        })
        setOpen(false);
    }




    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        setProvider({...provider, [event.target.name]: event.target.value});
    }


    return(
        <>

            <button onClick={handleClickOpen}>
                Edit
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Provider</DialogTitle>
                <ProviderDialogContent provider={provider} handleChange={handleChange}/>

                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>

        </>
    );
}
export default EditProvider;