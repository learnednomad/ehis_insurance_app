import { useState } from 'react';

import {useQuery} from '@tanstack/react-query';
import {getClientVisits} from "../../api/visitapi.ts";
import {DataGrid, GridColDef, GridToolbar} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';



function VisitList() {

    const [open, setOpen] = useState(false);

    const { data, error, isSuccess } = useQuery({
        queryKey: ["visits"],
        queryFn: getClientVisits
    });



    const columns: GridColDef[] = [
        {field: 'clientFirst_name', headerName: 'First Name', width: 150},
        {field: 'clientLast_name', headerName: 'Last Name', width: 150},
        {field: 'date', headerName: 'Date of Service', width: 250},
        {field: 'hospitalHospital_name', headerName: 'Location', width: 150},

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