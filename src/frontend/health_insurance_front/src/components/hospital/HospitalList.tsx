import { useState } from 'react';

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getHospitals, deleteHospital} from "../../api/hospitalapi.ts";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddHospital from "./AddHospital.tsx";
import EditHospital from "./EditHospital.tsx";


function HospitalList() {
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data, error, isSuccess } = useQuery({
        queryKey: ["hospitals"],
        queryFn: getHospitals
    });


    const { mutate } = useMutation(deleteHospital, {
        onSuccess: () => {
            // Hospital deleted
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ['hospitals'] })

        },
        onError: (err) => {
            console.error(err);
        },
    });

    const columns: GridColDef[] = [
        {field: 'hospitalID', headerName: 'Hospital ID', width: 200},
        {field: 'hospital_name', headerName: 'Name', width: 200},
        {field: 'phone_number', headerName: 'Phone', width: 200},
        {field: 'address', headerName: 'Address', width: 200},
        {field: 'offeredServices.length', headerName: 'No. Services Offered', width: 100},

        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditHospital hospitaldata={params.row} />
        },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <button
                    onClick={() => { if (window.confirm(`Are you sure you want to delete ${params.row.
                        hospital_name} ?`)) {
                        mutate(params.row.hospitalID);}
                    }}
                >
                    Delete
                </button>
            ),
        },
    ];

    if (!isSuccess) {
        return <span>Loading...</span>
    }
    else if (error) {
        return <span>Error when fetching hospitals...</span>
    }
    else {
        return (
            <>
                <AddHospital/>
            <DataGrid
                rows={data}
                columns={columns}
                disableRowSelectionOnClick={true}
                getRowId={row => row.hospitalID}
                slots={{ toolbar: GridToolbar }}

            />

                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Hospital deleted" />

            </>
        );
    }

    // return (
    //     <></>
    // );
}
export default HospitalList;