import { useState } from 'react';

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getVisits, deleteVisit} from "../../api/visitapi.ts";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddVisit from "./AddVisit.tsx";
import EditVisit from "./EditVisit.tsx";


function VisitList() {

    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data, error, isSuccess } = useQuery({
        queryKey: ["visits"],
        queryFn: getVisits
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
        {field: 'date', headerName: 'Date of Service', width: 200},
        {field: 'hospitalHospital_name', headerName: 'Location', width: 150},

        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditVisit visitdata={params.row} />
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
                        visitID} ?`)) {
                        mutate(params.row.visitID);}
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
        return <span>Error when fetching visits...</span>
    }
    else {
        return (
            <>
                <AddVisit/>
                <DataGrid
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

            </>
        );
    }
    // return (
    //     <></>
    // );
}
export default VisitList;