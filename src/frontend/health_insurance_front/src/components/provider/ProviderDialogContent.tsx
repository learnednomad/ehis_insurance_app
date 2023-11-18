import {Provider} from "../../types.ts";
import DialogContent from "@mui/material/DialogContent";


type DialogFormProps = {
    provider: Provider;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        void;
}
function ProviderDialogContent({ provider, handleChange }: DialogFormProps) {
    return (
        <DialogContent>
            <input placeholder="Provider Name" name="provider_name"
                   value={provider.provider_name} onChange={handleChange}/><br/>
            <input placeholder="Address" name="provider_address"
                   value={provider.provider_address} onChange={handleChange}/><br/>
            <input placeholder="Contact Person" name="contact_person"
                   value={provider.contact_person} onChange={handleChange}/><br/>

            <input placeholder="Phone Number" name="phone_number"
                   value={provider.phone_number} onChange={handleChange}/><br/>

        </DialogContent>
    );
}
export default ProviderDialogContent;