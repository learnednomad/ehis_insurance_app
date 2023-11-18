// CarDialogContent.tsx
import {Visit} from "../../types.ts";
import DialogContent from "@mui/material/DialogContent";

type DialogFormProps = {
    visit: Visit;

    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        void;
}


function VisitDialogContent({ visit, handleChange }: DialogFormProps) {
    return (
        <DialogContent>
            <input placeholder="Client ID" name="clientClientId"
                   value={visit.clientClientId} onChange={handleChange}/><br/>

            <input placeholder="Hospital ID" name="hospitalHospitalID"
                   value={visit.hospitalHospitalID} onChange={handleChange}/><br/>

            <input placeholder="Date of Service" name="date" type="datetime-local"
                   value={visit.date} onChange={handleChange}/><br/>

        </DialogContent>
    );
}
export default VisitDialogContent;