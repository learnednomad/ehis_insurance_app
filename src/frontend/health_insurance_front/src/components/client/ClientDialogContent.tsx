import { Client } from '../../types';
import DialogContent from "@mui/material/DialogContent";
type DialogFormProps = {
    client: Client;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        void;
}
function ClientDialogContent({ client, handleChange }: DialogFormProps) {
    return (

        <DialogContent>
            <input placeholder="First Name" name="firstName"
                   value={client.firstName} onChange={handleChange}/><br/>

            <input placeholder="Last Name" name="lastName"
                   value={client.lastName} onChange={handleChange}/><br/>

            <input placeholder="Date Of Birth" name="dateOfBirth" type="datetime-local"
                   value={client.dateOfBirth} onChange={handleChange}/><br/>

            <input placeholder="Phone Number" name="phone_number"
                   value={client.phone_number} onChange={handleChange}/><br/>

            <input placeholder="Email" name="email"
                   value={client.email} onChange={handleChange}/><br/>

            <input placeholder="Policy" name="policyPolicyId"
                   value={client.policyPolicyId} onChange={handleChange}/><br/>


        </DialogContent>

    );
}
export default ClientDialogContent;