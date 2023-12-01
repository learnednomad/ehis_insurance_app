import { useState } from 'react';

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getProviders, deleteProvider} from "../../api/providerapi.ts";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddProvider from "./AddProvider.tsx";
import EditProvider from "./EditProvider.tsx";
import IconButton from "@mui/joy/IconButton";
import {GridDeleteIcon} from "@mui/x-data-grid/joy/icons";
import Box from "@mui/joy/Box";


function ProviderList() {
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data, error, isSuccess } = useQuery({
        queryKey: ["providers"],
        queryFn: getProviders
    });


    const { mutate } = useMutation(deleteProvider, {
        onSuccess: () => {
            // Provider deleted
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ['providers'] })

        },
        onError: (err) => {
            console.error(err);
        },
    });

    const columns: GridColDef[] = [
        {field: 'provider_id', headerName: 'ID', width: 150},
        {field: 'provider_name', headerName: 'Provider Name', width: 150},
        {field: 'phone_number', headerName: 'Phone Number', width: 200},
        {field: 'contact_person', headerName: 'Contact', width: 200},
        {field: 'provider_address', headerName: 'Address', width: 300},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditProvider providerdata={params.row} />
        },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <IconButton
                    onClick={() => { if (window.confirm(`Are you sure you want to delete ${params.row.provider_id} ?`)) {
                        mutate(params.row.provider_id);}
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
        return <span>Error when fetching providers...</span>
    }
    else {
        return (
            <Box sx={{ height: 600, width: '100%' }}>
                <AddProvider/>
                <DataGrid
                    rows={data}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row.provider_id}
                    slots={{ toolbar: GridToolbar }}

                />

                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Provider deleted" />

            </Box>
        );
    }



    // return (
    //     <></>
    // );
}
export default ProviderList;