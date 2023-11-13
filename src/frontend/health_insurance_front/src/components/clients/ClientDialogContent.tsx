// CarDialogContent.tsx
import {Client} from '../../types';
import {DialogContent} from "@mui/material";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

type DialogFormProps = {
    client: Client;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ClientDialogContent({ client, handleChange }: DialogFormProps) {

    return (
       <DialogContent>
           <Stack spacing={2} mt={1}>
               <TextField placeholder="First Name" name="first_name"
                      value={client.first_name} onChange={handleChange}/><br/>
               <TextField placeholder="Last Name" name="last_name"
                      value={client.last_name} onChange={handleChange}/><br/>
               <TextField  name="dateOfBirth" type="datetime-local"
                       value={client.dateOfBirth} onChange={handleChange}/><br/>
               <TextField placeholder="Phone number" name="phone_number"
                      value={client.phone_number} onChange={handleChange}/><br/>
               <TextField placeholder="E-Mail" name="email"
                          value={client.email} onChange={handleChange}/><br/>
               <TextField placeholder="Address" name="address"
                          value={client.address} onChange={handleChange}/><br/>
           </Stack>
       </DialogContent>
    );
}
export default ClientDialogContent;