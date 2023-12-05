import { Claim } from '../../types';
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/joy/Stack";

type DialogFormProps = {
    claim: Claim,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        void,
}
function StatusUpdate({ claim, handleChange }: DialogFormProps) {


    return (
        <DialogContent>
            <Stack my={2}>

            <TextField label="Client ID" name="clientClientId"
                   value={claim.clientClientId} onChange={handleChange}
                     disabled={true}/><br/>

                <TextField label="Service Received"   name="diagnosisCodes"
                           value={claim.diagnosisCodes} onChange={handleChange} disabled={true}/><br/>

            <TextField label="Claim Amount"   name="claimAmount"
                   value={claim.claimAmount} onChange={handleChange} disabled={true} /><br/>

            <TextField  name="dateOfService" type = "datetime-local"
                   value={claim.dateOfService} onChange={handleChange}
                      disabled={true} /><br/>

            <TextField label="Location Of Service" name="hospitalHospitalID"
                   value={claim.hospitalHospitalID} onChange={handleChange}  disabled={true}/><br/>


                <TextField label="Status" name="claimStatus"
                           value={claim.claimStatus} onChange={handleChange} /><br/>



            </Stack>
        </DialogContent>
    );
}
export default StatusUpdate;