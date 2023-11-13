import {useState} from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {addProvider} from "../../api/provider_api";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Provider} from "../../types";
import ProviderDialogContent from "./ProviderDialogContent";
import Button from '@mui/material/Button';



function AddProvider() {
    const [open, setOpen] = useState(false);
    const [provider, setProvider] = useState<Provider>({

        contact_person: "",
        phone_number: "",
        provider_address: "",
        provider_name: "",
        // date_created: "",
        // date_modified: "",
        policies: []

    });


    // Get query client
    const queryClient = useQueryClient();

    //Open Modal Form
    const handleClickOpen = () => {
        setOpen(true);
    };

    //Close Modal Form
    const handleClose = () => {
        setOpen(false);
    };

    //handle change events
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProvider({...provider, [event.target.name]:
            event.target.value});
    }


    // Add mutate
    const { mutate } = useMutation(addProvider, {
        onSuccess: () => {
            queryClient.invalidateQueries(["provider"]);
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



    // Save provider and close modal form
    const handleSave = () => {
        mutate(provider);
        setProvider({
            // date_created: "",
            // date_modified: "",
            contact_person: "",
            phone_number: "",
            provider_address: "",
            provider_name: "",
            policies: []
        });
        handleClose();
    }


    return(
        <div>
            <Button onClick={handleClickOpen}>New Provider</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Provider</DialogTitle>
                <ProviderDialogContent provider={provider} handleChange={handleChange}/>


                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default AddProvider;