import DialogContent from '@mui/material/DialogContent';
import {Hospital} from "../../types";
type DialogFormProps = {
    hospital: Hospital;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function HospitalDialogContent({ hospital, handleChange}: DialogFormProps) {
    return (
            <DialogContent>
                <input placeholder="Hospital Name" name="hospital_name"
                       value={hospital.hospital_name} onChange={handleChange}/><br/>
                <input placeholder="Address" name="address"
                       value={hospital.address} onChange={handleChange}/><br/>
                <input placeholder="Phone Number" name="phone_number"
                       value={hospital.phone_number} onChange={handleChange}/><br/>



            </DialogContent>
    );
}
export default HospitalDialogContent;

