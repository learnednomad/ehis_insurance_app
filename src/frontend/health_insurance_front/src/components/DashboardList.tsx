import React from 'react';
import Grid from '@mui/material/Grid';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from 'react-router-dom';
import {Box} from "@mui/material";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="container" >
            <h1 className= "text-center">Welcome to the Dashboard</h1>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ minHeight: '50vh' }}>

                {/*<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">*/}
                {/*<h1>Welcome to the Dashboard</h1>*/}

                <Grid container spacing={12} justifyContent="center">
                    <Grid item xs={4}  sm={3} onClick={() => navigate('/dashboard')}>
                        <DashboardIcon color="secondary" fontSize="large" />
                        <div>Dashboard</div>
                    </Grid>
                    <Grid item xs={4} sm={3} onClick={() => navigate('/client')}>
                        <AccountCircleIcon  color="secondary" fontSize="large" />
                        <div>Clients</div>
                    </Grid>

                    <Grid item xs={4} sm={3} onClick={() => navigate('/provider')}>
                        <PeopleIcon color="secondary" fontSize="large"  />
                        <div>Providers</div>
                    </Grid>

                </Grid>


                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4} sm={3} onClick={() => navigate('/hospital')}>
                        <LocalHospitalIcon color="secondary" fontSize="large" />
                        <div>Hospitals</div>
                    </Grid>

                    <Grid item xs={4} sm={3} onClick={() => navigate('/claims')}>
                        <ReceiptIcon color="secondary" fontSize="large" />
                        <div>Claims</div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Dashboard;
