import { Claim } from '../../types';
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/joy/Stack";

type DialogFormProps = {
    claim: Claim;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        void;
}
function ClaimDialogContent({ claim, handleChange }: DialogFormProps) {
    return (
        <DialogContent>
            <Stack my={2}>

            <TextField label="Client ID" name="clientClientId"
                   value={claim.clientClientId} onChange={handleChange}/><br/>

            <TextField label="Claim Amount"   name="claimAmount"
                   value={claim.claimAmount} onChange={handleChange}/><br/>

            <TextField label="Date Of Service" name="dateOfService" type = "datetime-local"
                   value={claim.dateOfService} onChange={handleChange}/><br/>

            <TextField label="Location Of Service" name="hospitalHospitalID"
                   value={claim.hospitalHospitalID} onChange={handleChange}/><br/>
            </Stack>
        </DialogContent>
    );
}
export default ClaimDialogContent;