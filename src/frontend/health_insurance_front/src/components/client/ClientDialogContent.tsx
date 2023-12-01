import { Client } from '../../types';
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/joy/Stack";
type DialogFormProps = {
    client: Client;

    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        void;
}
function ClientDialogContent({ client, handleChange }: DialogFormProps) {
    return (

        <DialogContent>

            <Stack my={2}>

            <TextField label="First Name" name="firstName"
                   value={client.firstName} onChange={handleChange}/><br/>

            <TextField label="Last Name" name="lastName"
                   value={client.lastName} onChange={handleChange}/><br/>

            <TextField label="Date Of Birth" name="dateOfBirth" type="datetime-local"
                   value={client.dateOfBirth} onChange={handleChange}/><br/>

            <TextField label="Phone Number" name="phone_number"
                   value={client.phone_number} onChange={handleChange}/><br/>

            <TextField label="Email" name="email"
                   value={client.email} onChange={handleChange}/><br/>

            <TextField label="Policy" name="policyPolicyId"
                   value={client.policyPolicyId} onChange={handleChange}/><br/>
            </Stack>

        </DialogContent>

    );
}
export default ClientDialogContent;