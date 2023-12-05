/**
 * Response structures from API end points.
 *
 */
export type Client = {
    clientId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone_number: string;
    email: string;
    policyPolicyName: string;
    policyPremium: number;
    policyStartDate: string;
    policyEndDate: string;
    policyPolicyId: number;
}
export type Claim = {
    claimId: number;
    clientClientId: number;
    clientFirst_name: string;
    clientLast_name:  string;
    dateOfService: string;
    claimAmount: number;
    claimStatus: string;
    hospitalHospitalID: number;
    hospitalHospital_name: string;
    diagnosisCodes:string;
}

export type Provider = {
    provider_id: number;
    provider_name: string;
    provider_address: string;
    contact_person: string;
    phone_number: string;
    date_created: string;
    date_modified: string;
    policies: never[];
}


export type Hospital = {
    email: string;
    hospitalID: number;
    hospital_name: string;
    address: string;
    phone_number: string;
    visits: never[];
    claims: never[];
    offeredServices: never[];
}


export type Visit = {
    clientClientId: number;
    visitID: number;
    clientFirst_name: string;
    clientLast_name:  string;
    hospitalHospital_name: string;
    date: string;
    hospitalHospitalID: number;
    serviceProvided: string;
    serviceCost: number;
}



/**
 * Export Structure for types
 */

export type ClientResponse = {
    clientId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone_number: string;
    email: string;
    policyPolicyName: string;
    policyPremium: number;
    policyStartDate: string;
    policyEndDate: string;
    policyPolicyId: number;
}
export type ClaimsResponse = {
    claimId: number;
    clientClientId: number;
    clientFirst_name: string;
    clientLast_name:  string;
    dateOfService: string;
    claimAmount: number;
    claimStatus: string;
    hospitalHospitalID: number;
    hospitalHospital_name: string;
    diagnosisCodes:string;
}

export type ProviderResponse = {
    provider_id: number;
    provider_name: string;
    provider_address: string;
    contact_person: string;
    phone_number: string;
    date_created: string;
    date_modified: string;
    policies: never[];
}


export type HospitalResponse = {
    hospitalID: number;
    hospital_name: string;
    address: string;
    phone_number: string;
    email:string;
    visits: never[];
    claims: never[];
    offeredServices: never[];
}


export type VisitResponse = {
    clientClientId: number;
    visitID: number;
    clientFirst_name: string;
    clientLast_name:  string;
    hospitalHospital_name: string;
    date: string;
    hospitalHospitalID: number;
    serviceProvided: string;
    serviceCost: number;
}


/*******************
 *Entry Types
 *
 * ***/


export type ClientEntry = {
    client: Client;
    url: string;
}

export type ClaimEntry = {
    claim: Claim;
    url: string;
}

export type ProviderEntry = {
    provider: Provider;
    url: string;
}

export type HospitalEntry = {
    hospital: Hospital;
    url: string;
}

export type VisitEntry = {
    visit: Visit;
    url: string;
}