import {HospitalResponse} from "../../types";
import {getHospitals,deleteHospital} from "../../api/hospital_api";
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import {DataGrid, GridCellParams, GridColDef} from '@mui/x-data-grid';
import {deleteClaim} from "../../api/claims_api";
import Snackbar from "@mui/material/Snackbar";
import {useState} from "react";
import AddHospital from "./AddHospital";
import EditHospital from "./EditHospital";


function HospList(){

    const queryClient = useQueryClient();

    const {mutate} = useMutation(deleteHospital, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['hospitals']});
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const [open, setOpen] = useState(false);

    const columns: GridColDef[] = [
        {field: 'hospital_name', headerName: 'Hospital Name', width: 200},
        {field: 'address', headerName: 'Hospital Address', width: 500},
        {field: 'phone_number', headerName: 'Phone Number', width: 200},
        {   field:'edit',
            headerName:'',
            width: 90,
            filterable:false,
            sortable:false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditHospital hospitalData={params.row}/>
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
                            mutate(params.row._links.hospital.href)
                    }}
                >
                    Delete
                </button>
            ),
        },
    ];

    const { data, error, isSuccess } = useQuery({
        queryKey: ["hospitals"],
        queryFn: getHospitals
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
             <AddHospital/>
            <DataGrid columns={columns}
                      rows={data}
                      disableRowSelectionOnClick={true}
                      getRowId={row => row._links.self.href}
            />


             <Snackbar
                 open={open}
                 autoHideDuration={2000}
                 onClose={() => setOpen(false)}
                 message="Hospital Deleted"
             />

    </>
        );
    }

}

export default HospList;

