import { useState } from 'react';

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getClients, deleteClient} from "../../api/clientapi.ts";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddClient from "./AddClient.tsx";
import EditClient from "./EditClient.tsx";
import Box from "@mui/joy/Box";
import {GridDeleteIcon} from "@mui/x-data-grid/joy/icons";
import IconButton from "@mui/joy/IconButton";



function ClientList() {
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data, error, isSuccess } = useQuery({
        queryKey: ["clients"],
        queryFn: getClients,
        refetchInterval:10

    });


    const { mutate } = useMutation(deleteClient, {
        onSuccess: () => {
            // Car deleted
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ['clients'] })

        },
        onError: (err) => {
            console.error(err);
        },
    });


    const columns: GridColDef[] = [
        {field: 'clientId', headerName: 'Client ID', width: 200},
        {field: 'firstName', headerName: 'First Name', width: 200},
        {field: 'lastName', headerName: 'Last Name', width: 200},
        {field: 'policyPolicyName', headerName: 'Policy Name', width: 150},
        {field: 'email', headerName: 'E-Mail', width: 150},
        {field: 'policyStartDate', headerName: 'Start Date', width: 150},
        {field: 'policyEndDate', headerName: 'End Date', width: 150},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditClient clientdata={params.row} />
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
                    onClick={() => { if (window.confirm(`Are you sure you want to delete patient  ${params.row.firstName} ${params.row.lastName} with ID:${params.row.
                        clientId}?`)) {
                        mutate(params.row.clientId);}
                    }}
                >
                    <GridDeleteIcon color={"danger"}/>
                </IconButton>
            ),
        },

    ];


    if (!isSuccess) {
        return <span>Loading...</span>
    }
    else if (error) {
        return <span>Error when fetching clients...</span>
    }
    else {
        return (
            <Box sx={{ height: 600, width: '100%' }}>
                <AddClient/>
                <DataGrid columns={columns}
                          rows={data}
                          disableRowSelectionOnClick={true}
                          getRowId={row => row.clientId}
                          slots={{ toolbar: GridToolbar }}
                />

                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Client deleted" />

            </Box>
        );
    }

    // return (
    //     <></>
    // );
}
export default ClientList;