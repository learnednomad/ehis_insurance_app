import {DataGrid, GridCellParams, GridColDef, GridToolbar,} from "@mui/x-data-grid";
import {ProviderResponse, Provider, Policy} from "../../types";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteProvider,getProviders} from "../../api/provider_api";
import Snackbar from '@mui/material/Snackbar';
import {useState} from "react";
import AddProvider from './AddProvider';
import EditProvider from "./EditProvider";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



function ProviderList(){

    const [open, setOpen] = useState(false);//show message after deletion

    const queryClient = useQueryClient();
    const {data, error, isSuccess} = useQuery({
        queryKey : ["providers"],
        queryFn: getProviders
    })


    const { mutate } = useMutation(deleteProvider, {
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries(["providers"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });


    const columns: GridColDef[] = [
        {field:'provider_name', headerName:'Provider Name', width:200},
        {field:'provider_address', headerName:'Address', width:200},
        {field:'contact_person', headerName:'Contact Person', width:200},
        {field:'phone_number', headerName:'Phone Number', width:200},

        {   field:'edit',
            headerName:'',
            width: 90,
            filterable:false,
            sortable:false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditProvider providerdata={params.row}/>
                },
        {   field: 'delete',
            headerName:'',
            width:90,
            filterable:false,
            sortable:false,
            disableColumnMenu:true,
            renderCell:(params: GridCellParams) => (
            <IconButton
                onClick={() => {
                    if (window.confirm("Are you sure you want to delete ?"))
                    mutate(params.row._links.provider.href)
                }}> <DeleteIcon fontSize="small" />
            </IconButton>)
        },
    ];
    

    if (!isSuccess){
        return <span> Loading ........</span>
    }
    else if (error){
        return <span>Error while fetching providers .... </span>
    }
    else{
        return(
            <>
                <AddProvider />
            <DataGrid
                columns={columns}
                rows={data}
                disableRowSelectionOnClick={true}
                getRowId={row => row._links.self.href}
                slots={{ toolbar: GridToolbar }}
            />

        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            message="Provider deleted" />
            </>
        )
    }
}


export default ProviderList;


