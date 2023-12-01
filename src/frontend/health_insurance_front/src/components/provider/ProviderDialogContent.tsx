import {Provider} from "../../types.ts";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/joy/Stack";
import TextField from "@mui/material/TextField";


type DialogFormProps = {
    provider: Provider;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        void;
}
function ProviderDialogContent({ provider, handleChange }: DialogFormProps) {
    return (
        <DialogContent>
            <Stack my={2}>
            <TextField label="Provider Name" name="provider_name"
                   value={provider.provider_name} onChange={handleChange}/><br/>
            <TextField label="Address" name="provider_address"
                   value={provider.provider_address} onChange={handleChange}/><br/>
            <TextField label="Contact Person" name="contact_person"
                   value={provider.contact_person} onChange={handleChange}/><br/>
            <TextField label="Phone Number" name="phone_number"
                   value={provider.phone_number} onChange={handleChange}/><br/>
            </Stack>
        </DialogContent>
    );
}
export default ProviderDialogContent;