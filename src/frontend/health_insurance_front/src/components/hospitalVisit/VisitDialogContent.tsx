// CarDialogContent.tsx
import {Visit} from "../../types.ts";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/joy/Stack";

type DialogFormProps = {
    visit: Visit;

    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        void;

}


function VisitDialogContent({ visit, handleChange }: DialogFormProps) {


    return (
        <DialogContent >
            <Stack my={2}>
            <TextField size={"small"} label="Client ID" name="clientClientId"
                   value={visit.clientClientId} onChange={handleChange}/><br/>

            <TextField size={"small"} label="Hospital ID" name="hospitalHospitalID"
                   value={visit.hospitalHospitalID}  onChange={handleChange}/><br/>

            <TextField size={"small"} label="Date of Service" name="date" type="datetime-local"
                   value={visit.date} onChange={handleChange}/><br/>

            </Stack>
        </DialogContent>
    );
}
export default VisitDialogContent;