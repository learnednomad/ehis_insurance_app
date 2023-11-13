import {useState} from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {addHospital} from "../../api/hospital_api";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Hospital} from "../../types";
import HospitalDialogContent from "./HospitalDialogContent";

function AddHospital() {
    const [open, setOpen] = useState(false);
    const [hospital, setHospital] = useState<Hospital>({
        hospital_name: '',
        address: '',
        phone_number: ''
    });

    // Open the modal form
    const handleClickOpen = () => {
        setOpen(true);
    };

// Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setHospital({...hospital, [event.target.name]:
            event.target.value});
    }

    // Get query client
    const queryClient = useQueryClient();
// Add mutate
    const { mutate } = useMutation(addHospital, {
        onSuccess: () => {
            queryClient.invalidateQueries(["hospitals"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    // Save hospital and close modal form
    const handleSave = () => {
        mutate(hospital);
        setHospital({
            hospital_name: '',
            address: '',
            phone_number: ''
        });
        handleClose();
    }

    return(
        <>
            <button onClick={handleClickOpen}>New Hospital</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Hospital</DialogTitle>
                <HospitalDialogContent hospital={hospital} handleChange={handleChange}/>

                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default AddHospital;