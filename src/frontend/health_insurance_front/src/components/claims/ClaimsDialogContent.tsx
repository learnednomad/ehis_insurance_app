// CarDialogContent.tsx
import {Claim} from "../../types";
import DialogContent from "@mui/material/DialogContent";

type DialogFormProps = {
    claim: Claim;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function ClaimDialogContent({ claim, handleChange }: DialogFormProps) {
    return (
        <DialogContent>

            <input placeholder="Claim Amount" name="claimAmount"
                   value={claim.claimAmount} onChange={handleChange}/><br/>
            <input placeholder="Status" name="claimStatus"
                   value={claim.claimStatus} onChange={handleChange}/><br/>
            <input placeholder="Diagnosis Code" name="diagnosisCodes"
                   value={claim.diagnosisCodes} onChange={handleChange}/><br/>
            <input placeholder="Procedure Code" name="procedureCodes"
                   value={claim.procedureCodes} onChange={handleChange}/><br/>
            <input placeholder="mm/dd/yyyy" name="dateOfService" type="datetime-local"
                   value={claim.dateOfService} onChange={handleChange}/><br/>
        </DialogContent>
    );
}
export default ClaimDialogContent;