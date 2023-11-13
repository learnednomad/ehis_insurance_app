import {getClaims,deleteClaim} from "../../api/claims_api";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {DataGrid, GridCellParams, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import Snackbar from "@mui/material/Snackbar";
import {useState} from "react";
import AddClaims from "./AddClaims";
import EditClaims from "./EditClaims";


function ClaimsList(){

    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const {mutate} = useMutation(deleteClaim, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['claims']});
            },
        onError: (err) => {
            console.error(err);
        },
    });


    const columns:GridColDef[] = [
        {field: 'clientClientId', headerName: 'Client ID', width: 200},
        {field: 'clientFirst_name', headerName: 'First Name', width: 200},
        {field: 'clientLast_name', headerName: 'Last Name', width: 200},
        {field: 'hospital', headerName: 'Hospital Name', width: 200},
        {field: 'policy', headerName: 'Policy Name', width: 200},
        {field: 'claimAmount', headerName: 'Claim Amount', width: 200},
        {field: 'claimStatus', headerName: 'Claim Status', width: 200},
        {field: 'diagnosisCodes', headerName: 'Diagnosis Code', width: 200},
        {field: 'visitDate', headerName: 'Procedure Code', width: 150},
        {field: 'dateOfService', headerName: 'Date of Service', width: 150},

        {   field:'edit',
            headerName:'',
            width: 90,
            filterable:false,
            sortable:false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditClaims claimdata={params.row}/>
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
                    onClick={() => {
                        if (window.confirm("Are you sure to delete?"))
                            mutate(params.row._links.claims.href)
                    }}
                >

                Delete
                </button>
            ),
        },
    ];

    const { data, error, isSuccess } = useQuery({
        queryKey: ["claims"],
        queryFn: getClaims
    });




    if (!isSuccess) {
        return <span>Loading...</span>
    }
    else if (error) {
        return <span>Error when fetching cars...</span>
    }
    else {
        return (

            <>
                <AddClaims/>
                <DataGrid
                    columns={columns}
                    rows={data}
                    disableRowSelectionOnClick={true}
                    getRowId={(row) => row.claimId}
                />

                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Claim Deleted"
                />
            </>
        );
    }

}

export default ClaimsList;

