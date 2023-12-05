import { useState } from 'react';
import {useMutation, useQueryClient, useQueries} from '@tanstack/react-query';
import {getClaims, deleteClaim, getHospitalClaims} from "../../api/claimsapi.ts";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddClaim from "./AddClaim.tsx";
import EditClaim from "./EditClaim.tsx";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import {GridDeleteIcon} from "@mui/x-data-grid/joy/icons";
import useAuth from "../auth/useAuth.tsx";
// import {ClaimsResponse} from "../../types.ts";



function ClaimsList() {
    const { userRole} = useAuth()
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();



    // const {data, error, isSuccess} = useQuery({
    //         queryKey: ["claims"],
    //         queryFn: getClaims,
    //     });





    const [claimsQuery, usersQuery] = useQueries({
        queries: [
            {
                queryKey: ['claims'],
                queryFn: getClaims,
                refetchInterval:10
            },

            {
                queryKey: ['cllaims'],
                queryFn: getHospitalClaims,
                refetchInterval:10
            },
        ],
    });









    const { mutate } = useMutation(deleteClaim, {
        onSuccess: () => {
            // Claim deleted
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ['claims'] })
            queryClient.invalidateQueries({ queryKey: ['cllaims'] })

        },
        onError: (err) => {
            console.error(err);
        },
    });


    const columns: GridColDef[] = [
        {field: 'claimId', headerName: 'ClaimID', width: 200},
        {field: 'clientFirst_name', headerName: 'First Name', width: 200},
        {field: 'clientLast_name', headerName: 'Last Name', width: 200},
        {field: 'claimAmount', headerName: 'Amount', width: 200},
        {field: 'diagnosisCodes', headerName: 'Services', width: 200},
        {field: 'hospitalHospital_name', headerName: 'Service Location', width: 150},
        {field: 'dateOfService', headerName: 'Service Date', width: 150},
        {field: 'claimStatus', headerName: 'Status', width: 150},


        {
            field: 'edit',
            headerName: 'Review',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditClaim claimdata={params.row} />
        },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,

            renderCell: (params: GridCellParams) => (
                <IconButton size={"sm"} aria-label={"delete"}
                            onClick={() =>  { if (window.confirm(`Are you sure you want to delete claim : ${params.row.claimId} for ${params.row.clientFirst_name} ${params.row.clientLast_name}?`)) {
                                mutate(params.row.claimId);}
                            }}
                >
                    <GridDeleteIcon color={"danger"}/>
                </IconButton>
            ),
        },

    ];

    if (!claimsQuery.isSuccess || !usersQuery.isSuccess) {
        return <span>Loading...</span>
    }
    else if (claimsQuery.error || usersQuery.error) {
        return <span>Error when fetching claims...</span>
    }
    else {
        return (

            <Box sx={{ height: 600, width: '100%' }}>
                {(userRole === 'ADMIN') && <AddClaim/>}


                {(userRole === 'ADMIN') &&      <DataGrid autoPageSize={true}
                     rows={claimsQuery.data}
                     columns={columns}
                     disableRowSelectionOnClick={true}
                     getRowId={row => row.claimId}
                              slots={{ toolbar: GridToolbar }} />}


                {(userRole === 'HOSPITAL') &&    <DataGrid autoPageSize={true}
                          rows={usersQuery.data}
                          columns={columns}
                          disableRowSelectionOnClick={true}
                          getRowId={row => row.claimId}
                          slots={{ toolbar: GridToolbar }} />}

                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Claim deleted" />

            </Box>
        );
    }

    // return (
    //     <></>
    // );
}
export default ClaimsList;