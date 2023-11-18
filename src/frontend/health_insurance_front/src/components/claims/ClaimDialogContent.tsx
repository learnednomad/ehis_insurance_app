import { Claim } from '../../types';
import DialogContent from "@mui/material/DialogContent";

type DialogFormProps = {
    claim: Claim;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        void;
}
function ClaimDialogContent({ claim, handleChange }: DialogFormProps) {
    return (
        <DialogContent>
            <input placeholder="Client ID" name="clientClientId"
                   value={claim.clientClientId} onChange={handleChange}/><br/>

            <input placeholder="Claim Amount"   name="claimAmount"
                   value={claim.claimAmount} onChange={handleChange}/><br/>

            <input placeholder="Date Of Service" name="dateOfService" type = "datetime-local"
                   value={claim.dateOfService} onChange={handleChange}/><br/>

            <input placeholder="Location Of Service" name="hospitalHospitalID"
                   value={claim.hospitalHospitalID} onChange={handleChange}/><br/>

        </DialogContent>
    );
}
export default ClaimDialogContent;