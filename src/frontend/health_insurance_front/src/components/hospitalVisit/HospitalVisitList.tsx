import { useState } from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { deleteVisit, getHospitalVisits} from "../../api/visitapi.ts";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddHospitalVisit from "./AddHospitalVisit.tsx";
import EditHospitalVisit from "./EditHospitalVisit.tsx";
import IconButton from "@mui/joy/IconButton";
import {GridDeleteIcon} from "@mui/x-data-grid/joy/icons";
import Box from "@mui/joy/Box";


function HospitalVisitList() {

    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data, error, isSuccess } = useQuery({
        queryKey: ["visits"],
        queryFn: getHospitalVisits
    });


    const { mutate } = useMutation(deleteVisit, {
        onSuccess: () => {
            // Visit deleted
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ['visits'] })

        },
        onError: (err) => {
            console.error(err);
        },
    });

    const columns: GridColDef[] = [
        {field: 'clientFirst_name', headerName: 'First Name', width: 200},
        {field: 'clientLast_name', headerName: 'Last Name', width: 200},
        {field: 'date', headerName: 'Date of Service', width: 250},
        {field: 'hospitalHospital_name', headerName: 'Location', width: 200},
        {field: 'serviceProvided', headerName: 'Service Provided', width: 200},
        {field: 'serviceCost', headerName: 'Service Fee', width: 200},

        {
            field: 'edit',
            headerName: '',
            width: 100,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditHospitalVisit visitdata={params.row} />
        },
        {
            field: 'delete',
            headerName: '',
            width: 100,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <IconButton size={"sm"} aria-label={"delete"}
                    onClick={() => { if (window.confirm(`Are you sure you want to delete ${params.row.
                        visitID} ?`)) {
                        mutate(params.row.visitID);}
                    }}>
                    <GridDeleteIcon color={"danger"} />
                </IconButton>
            ),
        },
    ];

    if (!isSuccess) {
        return <span>Loading...</span>
    }
    else if (error) {
        return <span>Error when fetching visits...</span>
    }
    else {
        return (
            <Box sx={{ height: 600, width: '100%' }}>
                <AddHospitalVisit/>
                <DataGrid autoPageSize={true}
                    rows={data}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row.visitID}
                    slots={{ toolbar: GridToolbar }}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Visit deleted" />
            </Box>
        );
    }
}
export default HospitalVisitList;