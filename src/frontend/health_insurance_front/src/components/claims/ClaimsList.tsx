import { useState } from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getClaims, deleteClaim} from "../../api/claimsapi.ts";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddClaim from "./AddClaim.tsx";
import EditClaim from "./EditClaim.tsx";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import {GridDeleteIcon} from "@mui/x-data-grid/joy/icons";



function ClaimsList() {
    const [open, setOpen] = useState(false);


    const queryClient = useQueryClient();

    const { data, error, isSuccess } = useQuery({
        queryKey: ["claims"],
        queryFn: getClaims
    });

    const { mutate } = useMutation(deleteClaim, {
        onSuccess: () => {
            // Claim deleted
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ['claims'] })
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
        {field: 'hospitalHospital_name', headerName: 'Service Location', width: 150},
        {field: 'dateOfService', headerName: 'Service Date', width: 150},
        {field: 'claimStatus', headerName: 'Status', width: 150},
        {
            field: 'edit',
            headerName: '',
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

    if (!isSuccess) {
        return <span>Loading...</span>
    }
    else if (error) {
        return <span>Error when fetching claims...</span>
    }
    else {
        return (

            <Box sx={{ height: 600, width: '100%' }}>
                <AddClaim/>
            <DataGrid autoPageSize={true}
            rows={data}
            columns={columns}
            disableRowSelectionOnClick={true}
            getRowId={row => row.claimId}
            slots={{ toolbar: GridToolbar }}
            />
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