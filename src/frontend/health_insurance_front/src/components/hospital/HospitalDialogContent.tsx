import { Hospital } from '../../types';
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/joy/Stack";

type DialogFormProps = {
    hospital: Hospital;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        void;
}
function HospitalDialogContent({ hospital, handleChange }: DialogFormProps) {
    return (
        <DialogContent>
            <Stack my={2}>
            <TextField label="Hospital Name" name="hospital_name"
                   value={hospital.hospital_name} onChange={handleChange}/><br/>
            <TextField label="Phone Number" name="phone_number"
                   value={hospital.phone_number} onChange={handleChange}/><br/>
            <TextField label="Address" name="address"
                   value={hospital.address} onChange={handleChange}/><br/>
                <TextField label="Email" name="email"
                           value={hospital.email} onChange={handleChange}/><br/>
            </Stack>
        </DialogContent>
    );
}
export default HospitalDialogContent;