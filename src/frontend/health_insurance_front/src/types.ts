export type ClientResponse = {
    "first_name": string;
    "last_name": string;
    "dateOfBirth": string;
    "photo_url": string;
    "phone_number": string;
    "email": string;
    "address": string;
    "created_on": string;
    "modified_on":string;
    "appUser": string;
    "_links": {
        "self": {
            "href": string;
        },
        "client": {
            "href": string;
        },
        "dependents": {
            "href": string;
        },
        "policy": {
            "href": string;
        },
        "claims": {
            "href": string;
        },
        "visits": {
            "href": string;
        }
    }
}

export type VisitResponse =
    {
        "date": string;
        "_links": {
            "self": {
                "href": string;
            },
            "visit": {
                "href": string;
            },
            "client": {
                "href": string;
            },
            "hospital": {
                "href": string;
            },
            "services": {
                "href": string;
            }
        }


    }






















// export type Client ={
//     first_name: string;
//     last_name: string;
//     dateOfBirth: string;
//     phone_number: string;
//     "email": string;
//     "address": string;
//     "policyName": string;
// }



export type ClientEntry = {
    client: Client;
    url: string;
}


/******* Provider Response *********/


export type ProviderResponse =  {
    "provider_name": string;
    "provider_address": string;
    "contact_person": string;
    "phone_number": string;
    "date_created": string;
    "date_modified": string;
    "_links": {
        "self": {
            "href": string;
        },
        "policyProvider": {
            "href": string;
        },
        "policies": {
            "href": string;
        }
    }
}

// export type Provider ={
//     "provider_name": string;
//     "provider_address": string;
//     "contact_person": string;
//     "phone_number": string;
//     "date_created": string;
//     "date_modified": string;
//     "policies": {
//         "href": string;
//     }
// }

//
// export type Provider = {
//     provider_name: string;
//     provider_address: string;
//     contact_person: string;
//     phone_number: string;
//     // date_created: string;
//     // date_modified: string;
//     policies: string[]; // Add this property
// }

export type ProviderEntry = {
    provider: Provider;
    url: string;
}


/******
 * Hospital Exports
 *
 * **************/

export type HospitalResponse = {
    hospital_name : string;
    address : string;
    phone_number :string;
    _links: {
        self : {
            href : string;
        },
        hospital : {
            href : string;
        },
        offeredServices : {
            href : string;
        },
        claims : {
            href : string;
        }
    };
}


// export type Hospital = {
//     hospital_name: string;
//     address: string;
//     phone_number: string;
// }


export type HospitalEntry = {
    hospital: Hospital;
    url: string;
}


/******
 * Claims Exports
 *
 * **************/


// export type ClaimsResponse = {
//     dateOfService : string;
//     diagnosisCodes : string;
//     procedureCodes :string;
//     claimAmount:number;
//     claimStatus:string;
//     _links: {
//         self : {
//             href : string;
//         },
//         claims : {
//             href: string
//         },
//         hospital : {
//             href : string;
//         },
//         policy : {
//             href : string;
//         },
//         client : {
//             href : string;
//         }
//     };
// }




export type Claim = {
    // policy: string;
    // hospital: string;
    // client: string;
    // dateOfService : string;
    // diagnosisCodes : string;
    // procedureCodes :string;
    // claimAmount:number;
    // claimStatus:string;

}


export type ClaimEntry = {
    claim: Claim;
    url: string;
}


/**************************************************************
 * TYPES  DEFINITION
 */

// Define the types for your data based on the JSON structure.
interface Hospital {
    hospitalID: number;
    hospital_name: string;
    address: string;
    phone_number: string;
    visits: any[];
    claims: any[];
    offeredServices: any[];
}

export interface Provider {
    provider_id: number;
    provider_name: string;
    provider_address: string;
    contact_person: string;
    phone_number: string;
    date_created: string;
    date_modified: string;
    policies: any[];
}

export interface Policy {
    policyId: number;
    provider: Provider;
    policyName: string;
    coverageDetails: string;
    premium: number;
    startDate: string;
    endDate: string;
    policyCategories: any[];
    clients: any[];
    hibernateLazyInitializer: any;
}

export interface Client {
    clientId: number;
    first_name: string;
    last_name: string;
    dateOfBirth: string;
    photo_url?: any;
    phone_number: string;
    email: string;
    address: string;
    created_on?: any;
    modified_on: string;
    policy: Policy;
    appUser?: any;
    claims: any[];
    dependents: any[];
    visits: any[];
}

export interface Visit {
    visitID: number;
    hospital: Hospital;
    client: Client;
    services: any[];
    date: string;
}

