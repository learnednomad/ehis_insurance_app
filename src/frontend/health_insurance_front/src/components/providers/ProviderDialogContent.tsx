// CarDialogContent.tsx
import {Provider} from "../../types";
import {DialogContent, Select} from "@mui/material";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

type DialogFormProps = {
    provider: Provider;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProviderDialogContent({ provider, handleChange }: DialogFormProps) {

    return (
       <DialogContent>
           <Stack spacing={2} mt={1}>
               <TextField placeholder="Provider Name" name="provider_name"
                      value={provider.provider_name} onChange={handleChange}/><br/>
               <TextField placeholder="Provider Address" name="provider_address"
                      value={provider.provider_address} onChange={handleChange}/><br/>
               <TextField  placeholder="Contact Person" name="contact_person"
                       value={provider.contact_person} onChange={handleChange}/><br/>
               <TextField placeholder="Phone Number" name="phone_number"
                      value={provider.phone_number} onChange={handleChange}/><br/>

               <TextField placeholder="Available Policies" name="policies"
                          value={provider.policies.length} onChange={handleChange}/><br/>

           </Stack>
       </DialogContent>
    );
}
export default ProviderDialogContent;