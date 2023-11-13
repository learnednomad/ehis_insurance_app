import { VisitResponse} from "../../types";
import axios from 'axios';
import {useQuery} from "@tanstack/react-query";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

function VisitList() {

  const getVisits = async (): Promise<VisitResponse[]> => {
    const response = await axios.get("http://localhost:2600/visits");
    return response.data._embedded.visits;
  }
  const { data, error, isSuccess } = useQuery({
    queryKey: ["visits"],
    queryFn: getVisits
  });


  const columns: GridColDef[] = [
    {field: 'date', headerName: 'Brand', width: 200},
    {field: 'registrationNumber', headerName: 'Reg.nr.', width: 150},
    {field: 'modelYear', headerName: 'Model Year', width: 150},
    {field: 'price', headerName: 'Price', width: 150},
  ];


  if (!isSuccess) {
    return <span>Loading...</span>
  }
  else if (error) {
    return <span>Error when fetching cars...</span>
  }else
  {
    return (
        <DataGrid
            rows={data}
            columns={columns}
            getRowId={row => row._links.self.href}
        />
    );
  }



}
export default VisitList;